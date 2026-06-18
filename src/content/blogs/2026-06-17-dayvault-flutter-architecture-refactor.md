---
slug: dayvault-flutter-architecture-refactor
title: "Engineering DayVault: A Flutter Architecture Refactor Done the Right Way"
description: "How I systematically hardened a production Flutter app — from O(1) calendar lookups to exponential backoff, Riverpod keepAlive, and compute()-based backup pipelines."
author: Ajay
publishedAt: 2026-06-17
updatedAt: 2026-06-17
tags:
  - Flutter
  - Dart
  - Architecture
  - Riverpod
  - ObjectBox
  - Performance
category: Engineering
readingTimeMinutes: 14
featured: true
draft: false
---

I recently spent a full day working through DayVault — a personal journaling app built on Flutter, ObjectBox, and Riverpod — with a single mandate: harden the entire system without breaking anything that already works.

No vague "refactor it." No greenfield. A live codebase, passing tests, real users. The task was to evaluate ~40 improvement items across security, performance, correctness, and UI decomposition, prioritise them by blast radius, and ship all of them in dependency order.

This post is about the thought process behind that work — the decisions, the traps, the architectural constraints that shaped every choice.

---

## The Constraint That Shaped Everything

Before writing a single line, I established one hard rule that would govern all image-related decisions:

> **Images are references, not copies. The app never touches the original file.**

DayVault is an offline-first journal. Users attach photos from their gallery. The obvious "safe" move is to copy those files into app-managed storage so you own them. I deliberately chose not to.

Why? Because duplicating storage for a personal, offline app creates more problems than it solves:

- **Storage bloat** — photos already exist on the device
- **Sync complexity** — two sources of truth for the same asset
- **False ownership** — if the user deletes the original, should the app's copy survive? No clear answer.

So the entire system operates on `filePath` references. When a journal entry is "deleted," the app drops the reference. The file on disk is never touched. This isn't a limitation — it's an explicit architectural contract.

This single constraint cascaded into at least six implementation decisions throughout the session.

---

## Wave A: Foundations (Low-Risk, High-Leverage)

I always start a large refactor with the changes that are correct, safe, and provide infrastructure for everything that follows.

### GPU Rendering: `RepaintBoundary` Around Blur

The `GlassContainer` widget uses `BackdropFilter` with a Gaussian blur — a GPU-heavy operation. The problem: Flutter repaints the blur every time *any* ancestor widget rebuilds, even if the glass surface hasn't changed.

The fix is mechanical but impactful:

```dart
return RepaintBoundary(
  child: ClipRRect(
    borderRadius: BorderRadius.circular(borderRadius),
    child: BackdropFilter(
      filter: ImageFilter.blur(sigmaX: clampedBlur, sigmaY: clampedBlur),
      child: container,
    ),
  ),
);
```

`RepaintBoundary` tells Flutter's compositor to promote this subtree to its own layer. The blur becomes a cached texture. Rebuilds in parent widgets no longer invalidate it. I also added `clampBlur()` — sigma values outside `[8.0, 20.0]` either look bad or cause driver issues on older GPUs.

This is the kind of change that doesn't show up in unit tests but absolutely shows up in a frame profiler.

### O(1) Calendar Day Lookups

The calendar screen was doing this on every tap:

```dart
return _entries.where((e) =>
  e.date.year == date.year &&
  e.date.month == date.month &&
  e.date.day == date.day
).toList();
```

O(n) per day lookup. On a calendar view where the user is scrolling months with hundreds of entries, this adds up.

The fix: build a `Map<DateTime, List<JournalEntry>>` once when data loads, and look up by normalised date key.

```dart
static Map<DateTime, List<JournalEntry>> buildDateMap(
    List<JournalEntry> entries) {
  final map = <DateTime, List<JournalEntry>>{};
  for (final e in entries) {
    final key = DateTime(e.date.year, e.date.month, e.date.day);
    (map[key] ??= <JournalEntry>[]).add(e);
  }
  return map;
}
```

I placed `buildDateMap` as a static method on the *widget class*, not the state class. This makes it directly testable without widget pumping:

```dart
final map = CalendarScreen.buildDateMap(entries);
expect(map[DateTime(2026, 6, 1)], hasLength(2));
```

That's a deliberate pattern I use throughout this codebase: pure functions live on widget classes, not state classes, so they're easily unit-testable without the overhead of widget infrastructure.

### Debouncer Utility

The search field in the journal screen was firing a filter pass on every keystroke. With ObjectBox queries on the main thread, that's perceptible lag.

```dart
class Debouncer {
  final Duration delay;
  Timer? _timer;

  Debouncer({this.delay = const Duration(milliseconds: 300)});

  void run(VoidCallback action) {
    _timer?.cancel();
    _timer = Timer(delay, action);
  }

  void dispose() => _timer?.cancel();
}
```

Simple, tested, no dependencies. The `_searchDebouncer` instance in `JournalScreen` now delays filter evaluation 300ms after the last keystroke.

---

## Wave B: Security Hardening

Security code is the most dangerous to modify. I approached it with the same mindset as database migration scripts: every change is additive or behavioural, never structural.

### Exponential Backoff for Lockout

The previous implementation had a flat lockout duration. That's insufficient — a determined attacker just waits and retries.

The new scheme: lockout duration doubles with each lockout cycle, capped at one hour.

```dart
@visibleForTesting
static int computeLockoutDurationSeconds(int cycleCount) {
  const base = 30;
  const max = SecurityConstants.maxLockoutDurationSeconds; // 3600
  if (cycleCount <= 0) return base;
  if (cycleCount >= 20) return max; // overflow guard
  final seconds = base * (1 << (cycleCount - 1));
  return seconds.clamp(base, max);
}
```

The overflow guard (`cycleCount >= 20`) is not defensive paranoia — it's a correctness guarantee. `1 << 20` on a 32-bit platform is 1,073,741,824. Multiplied by 30, that overflows to a negative number. The lockout would end immediately. The overflow guard prevents a security bug disguised as a math edge case.

A critical design decision: lockout expiry does **not** reset the backoff cycle counter. Only successful authentication or explicit PIN reset clears it. This means an attacker who waits out a 30-second lockout will face a 60-second lockout next time. The `_resetAttempts({bool clearBackoff = false})` signature makes the intent explicit at every call site.

### Parallel Secure Storage Reads

`FlutterSecureStorage` reads are async I/O. `verifyPin` was reading the PIN hash and salt sequentially:

```dart
final hash = await _storage.read(key: _pinHashKey);
final salt = await _storage.read(key: _saltKey);
```

These are independent reads. No reason to serialize them:

```dart
final results = await Future.wait([
  _storage.read(key: _pinHashKey),
  _storage.read(key: _saltKey),
]);
```

This is a small latency win on every unlock attempt. More importantly, it documents the independence of these reads — a future engineer reading this knows these values have no ordering dependency.

I marked the `readKeysInParallel` helper `@visibleForTesting` and wrote property tests confirming it returns keys in the same order as the input list regardless of which resolves first.

### IdleTimer on the Lock Screen

A partially-entered PIN left on screen is a security hygiene problem. If the user sets their phone down mid-entry, the digits remain visible.

```dart
static const _idleTimeout = Duration(seconds: 5);
late final IdleTimer _idleTimer;

void _onIdle() {
  if (!mounted) return;
  if (_shakeController.isAnimating) {
    _shakeController.stop();
    _shakeController.value = 0;
  }
  if (pin.isNotEmpty) {
    setState(() { pin = ''; isError = false; errorMessage = null; });
  }
}
```

`_idleTimer.poke()` is called on every keypad tap and backspace. Five seconds of silence clears the state. The `IdleTimer` is a thin wrapper around `dart:async`'s `Timer` — no framework dependency, trivially testable with `fake_async`.

### App Lifecycle Re-lock

`WidgetsBindingObserver` in `_RootOrchestratorState` catches the app going to background:

```dart
case AppLifecycleState.paused:
case AppLifecycleState.hidden:
  if (_securityEnabled) {
    final now = DateTime.now();
    if (_lastBackgroundTime == null ||
        now.difference(_lastBackgroundTime!) > _gracePeriod) {
      SecurityService().lockVault();
      ref.read(authStateProvider.notifier).unauthenticate();
    }
    _lastBackgroundTime = now;
  }
```

The grace period prevents false re-locks from transient interruptions (notification shade, biometric prompt). I deliberately set `_gracePeriod` to 30 seconds — short enough to protect against opportunistic access, long enough not to frustrate users who switch apps briefly.

One subtlety: `authStateProvider` needed `@Riverpod(keepAlive: true)`. Without it, `autoDispose` would reset the auth state during the loading frame before the build method subscribes — causing an infinite lock loop on cold start.

---

## Wave C: Performance and Architecture

### Decode-Time Image Downsizing

This one cost me real thought before I committed to a solution.

The gallery path was loading full-resolution images into memory for thumbnail display. On a device with 50+ journal entries each with 2-3 photos, that's catastrophic for memory.

The correct solution operates at three layers:

1. **Gallery thumbnails** — use `photo_manager`'s `thumbnailDataWithSize(ThumbnailSize.square(dim))` to fetch a pre-scaled byte buffer. Never decode the full image.
2. **Memory cache** — pass `cacheWidth` to `Image.memory` so Flutter's image cache stores the scaled version, not the original.
3. **Cache dimension** — derived from the logical widget size × device pixel ratio, clamped to `[1, 4096]`.

```dart
static int resolveCacheDimension(
    double? logicalSize, double devicePixelRatio,
    {double fallbackLogical = 400}) {
  final logical = logicalSize ?? fallbackLogical;
  return (logical * devicePixelRatio).ceil().clamp(1, 4096);
}
```

Why `ceil` rather than `round`? Rounding down on a fractional DPR (e.g. 2.75) can produce a cache dimension that's 1px smaller than the display slot, causing a rescale. `ceil` guarantees the cached image is never smaller than required.

### EntryEditor Decomposition

The entry editor was a 600-line `StatefulWidget` with image picking, mood selection, tag editing, auto-save, spotlight toggle, and form fields all tangled in one state class.

I decomposed it using a strict **props-down, events-up** pattern:

- `MoodSelector({required Mood selected, required ValueChanged<Mood> onChanged})`
- `TagPicker({required List<String> tags, required ValueChanged<List<String>> onChanged})`
- `SpotlightToggle({required bool value, required ValueChanged<bool> onChanged})`
- `ImageSection({required List<ImageReference> images, required ValueChanged<List<ImageReference>> onChanged, required void Function(String) onError})`
- `_AutoSaveIndicator({required bool isSaving})`

Each widget owns zero state that belongs to its parent. `ImageSection` manages its own picker dialogs and reorder gestures, but calls `widget.onChanged([...newList])` — it never mutates the parent's state directly.

This pattern means each sub-widget is independently testable:

```dart
testWidgets('TagPicker dedupes case-insensitively', (tester) async {
  final tags = <List<String>>[];
  await tester.pumpWidget(MaterialApp(
    home: TagPicker(tags: const [], onChanged: tags.add),
  ));
  await tester.enterText(find.byType(TextField), 'Flutter');
  await tester.testTextInput.receiveAction(TextInputAction.done);
  await tester.enterText(find.byType(TextField), 'flutter');
  await tester.testTextInput.receiveAction(TextInputAction.done);
  expect(tags.last, ['Flutter']); // second add is a no-op
});
```

### Backup Pipeline: Off-Thread JSON with Staged Progress

The backup service was encoding/decoding large JSON payloads on the main thread. For a vault with 5,000 entries, `jsonEncode` can block the UI thread for 200–400ms.

The fix uses Flutter's `compute()` to push pure encode/decode work to a background isolate:

```dart
typedef BackupProgress = void Function(BackupStage stage);

Future<BackupResult> importFromJson(
    String jsonString, {BackupProgress? onProgress}) async {
  onProgress?.call(BackupStage.reading);
  late Map<String, dynamic> data;
  try {
    data = await compute(decodeBackupJson, jsonString);
  } on FormatException catch (e) {
    onProgress?.call(BackupStage.idle);
    return BackupResult.failure('Invalid JSON: $e');
  }
  // ... validate ...
  onProgress?.call(BackupStage.restoring);
  // ... write to ObjectBox ...
  onProgress?.call(BackupStage.idle);
}
```

One important constraint: encryption/decryption stays on the main isolate. Flutter's `compute()` spawns a fresh Dart isolate with no access to the parent's memory. `SecurityService` holds the in-memory key as a singleton — inaccessible from a spawned isolate. Trying to move encryption off-thread would silently fail or crash. I left a comment in the code explaining this. It's not a TODO — it's a documented constraint.

The `BackupProgress` typedef and `BackupStage` enum let the UI show a real progress indicator instead of a spinner:

```
Reading backup...  →  Restoring entries...  →  Done
```

The staged progress is fully unit-testable without any UI:

```dart
test('importFromJson emits reading -> restoring -> idle', () async {
  final stages = <BackupStage>[];
  await backupService.importFromJson(jsonEncode(validBackup()),
      onProgress: stages.add);
  expect(stages, [
    BackupStage.reading,
    BackupStage.restoring,
    BackupStage.idle,
  ]);
});
```

### Batch Upsert via ObjectBox `oneOf`

Importing a backup requires upserting thousands of entries efficiently. The naive approach — `saveJournalEntry` in a loop — hits ObjectBox once per entry. With 5,000 entries, that's 5,000 individual box operations.

ObjectBox's `QueryStringProperty.oneOf(List<String>)` allows a single query to fetch all existing entries by their `entryId` strings:

```dart
Future<void> putManyJournalEntries(List<JournalEntry> entries) async {
  final entryIds = entries.map((e) => e.entryId).toList();
  final existing = _journalBox.query(
    JournalEntry_.entryId.oneOf(entryIds),
  ).build().find();

  final idMap = {for (final e in existing) e.entryId: e.id};
  final toWrite = entries.map((e) {
    final obId = idMap[e.entryId] ?? 0;
    return e.copyWith(id: obId);
  }).toList();

  _journalBox.putMany(toWrite);
}
```

One query to find existing IDs, one `putMany` to write everything. Upsert semantics (ObjectBox uses `id == 0` for insert, non-zero for update) without an N+1 pattern.

---

## On Testing Philosophy

Across all three waves, I created 10 new test files. The philosophy was consistent:

**Test the boundary, not the implementation.** `computeLockoutDurationSeconds` is `@visibleForTesting` because it's a pure function with a non-obvious invariant (overflow safety). The test doesn't care how it's implemented — only that `computeLockoutDurationSeconds(20)` returns exactly 3600, and that cycle 5 is double cycle 4.

**Static methods on widget classes exist for testability.** `CalendarScreen.buildDateMap`, `JournalScreen.filterEntries`, `JournalScreen.availableTags` — none of these require a pump. They're called in standard `test()` blocks with zero widget overhead.

**`fake_async` for time-dependent logic.** Testing `IdleTimer` with real `Duration` waits would make tests slow and flaky. `fakeAsync` lets you advance time programmatically:

```dart
test('onIdle fires after timeout', () {
  fakeAsync((async) {
    bool fired = false;
    final timer = IdleTimer(
      timeout: const Duration(seconds: 5),
      onIdle: () => fired = true,
    );
    timer.poke();
    async.elapse(const Duration(seconds: 4));
    expect(fired, isFalse);
    async.elapse(const Duration(seconds: 2));
    expect(fired, isTrue);
    timer.dispose();
  });
});
```

---

## What I Deliberately Did Not Do

Knowing what to skip is as important as knowing what to build.

**No at-rest encryption.** The app is fully offline — no network exposure. Encrypting entries at rest adds key management complexity (where does the key live? how does it survive process death?) without a commensurate threat model improvement. The architecture is designed to accommodate it later without a structural rewrite.

**No app-owned image storage.** Already covered, but worth reiterating: the reference-only model is simpler, correct, and future-flexible. Building an asset copy pipeline now would be premature and create maintenance debt.

**No pagination UI wiring.** ObjectBox supports paginated queries. The storage layer is ready. The UI is not wired. Building UI for a path that users haven't requested yet is speculative work — and speculative work always costs more than expected when the real requirements arrive.

---

## The Architectural Takeaway

The biggest risk in a large refactor isn't any individual change — it's the dependency ordering. Three things I always establish before starting:

1. **What are the hard constraints?** (Reference-only images, offline-first, no encryption priority)
2. **What is the blast radius of each change?** (GPU widget < parallel reads < auth lifecycle)
3. **What are the testability seams?** (Static pure functions, `@visibleForTesting`, typedef callbacks)

Changes that violate constraint 1 don't get built. Changes with large blast radius go last. Changes without testability seams get redesigned until they have them.

That ordering — constraint → blast radius → testability — is how you ship 40 items in a single session without breaking anything that worked before.
