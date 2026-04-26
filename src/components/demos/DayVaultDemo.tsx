"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  FolderHeart,
  Lock,
  Plus,
  Search,
  ShieldCheck,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouteHistory } from "@/components/demos/useRouteHistory";

type EntryType = "story" | "event";
type Mood = "🙂" | "⚡" | "😌" | "🎉" | "😴";

interface JournalEntry {
  id: string;
  type: EntryType;
  date: string;
  headline: string;
  content: string;
  mood: Mood;
  feeling: string;
  timeBucket: "morning" | "afternoon" | "evening" | "night";
  location?: string;
}

interface RankedItem {
  id: string;
  name: string;
  rating: number;
}

interface RankingCategory {
  id: string;
  title: string;
  favorite: boolean;
  items: RankedItem[];
}

type DayVaultRoute =
  | { screen: "lock" }
  | { screen: "journal" }
  | { screen: "calendar" }
  | { screen: "day"; date: string }
  | { screen: "editor"; date: string; type: EntryType; entryId?: string }
  | { screen: "identity" }
  | { screen: "profile" };

const demoPin = "2160";

const entrySeed: JournalEntry[] = [
  {
    id: "entry-1",
    type: "story",
    date: "2026-04-24",
    headline: "Architecture Win",
    content: "Wrapped up the secure draft recovery flow and felt very aligned with the structure.",
    mood: "⚡",
    feeling: "Accomplished",
    timeBucket: "evening",
    location: "Home Office",
  },
  {
    id: "entry-2",
    type: "event",
    date: "2026-04-23",
    headline: "Coffee + Catchup",
    content: "Met an old teammate and mapped out future collaboration ideas.",
    mood: "🎉",
    feeling: "Social",
    timeBucket: "afternoon",
    location: "Tempe, AZ",
  },
  {
    id: "entry-3",
    type: "story",
    date: "2026-04-21",
    headline: "Quiet Reset",
    content: "Took a longer walk, reflected, and ended the day calmer than it started.",
    mood: "😌",
    feeling: "Peaceful",
    timeBucket: "night",
  },
];

const categorySeed: RankingCategory[] = [
  {
    id: "movies",
    title: "Movies",
    favorite: true,
    items: [
      { id: "m-1", name: "Interstellar", rating: 5 },
      { id: "m-2", name: "The Dark Knight", rating: 4.5 },
      { id: "m-3", name: "Arrival", rating: 4 },
    ],
  },
  {
    id: "books",
    title: "Books",
    favorite: false,
    items: [
      { id: "b-1", name: "Atomic Habits", rating: 4.5 },
      { id: "b-2", name: "Deep Work", rating: 4 },
    ],
  },
  {
    id: "places",
    title: "Places",
    favorite: false,
    items: [{ id: "p-1", name: "Sedona", rating: 5 }],
  },
];

function toMonthTitle(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function toShortDate(dateIso: string) {
  const date = new Date(dateIso);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function buildMonthGrid(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const first = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<number | null> = Array(first).fill(null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }
  return cells;
}

function renderStars(rating: number) {
  return "★★★★★".slice(0, Math.round(rating));
}

export default function DayVaultDemo() {
  const history = useRouteHistory<DayVaultRoute>({ screen: "lock" });
  const [entries, setEntries] = useState<JournalEntry[]>(entrySeed);
  const [categories, setCategories] = useState<RankingCategory[]>(categorySeed);
  const [activeCategoryId, setActiveCategoryId] = useState(categorySeed[0].id);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [identitySearch, setIdentitySearch] = useState("");
  const [journalSearch, setJournalSearch] = useState("");
  const [monthCursor, setMonthCursor] = useState(new Date("2026-04-01T00:00:00"));
  const [pinInput, setPinInput] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);
  const [lockError, setLockError] = useState("");
  const [securityEnabled, setSecurityEnabled] = useState(true);
  const [editorDraft, setEditorDraft] = useState({
    headline: "",
    content: "",
    mood: "🙂" as Mood,
    feeling: "Grateful",
    timeBucket: "evening" as JournalEntry["timeBucket"],
    location: "",
  });
  const [newRankName, setNewRankName] = useState("");

  const route = history.current;

  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const timer = window.setInterval(() => {
      setLockoutSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [lockoutSeconds]);

  const unlock = () => {
    setLockError("");
    setPinInput("");
    setAttemptsLeft(5);
    history.push({ screen: "journal" });
  };

  const handlePinDigit = (digit: string) => {
    if (lockoutSeconds > 0) return;
    if (pinInput.length >= 4) return;
    const next = `${pinInput}${digit}`;
    setPinInput(next);
    if (next.length === 4) {
      if (next === demoPin || !securityEnabled) {
        unlock();
        return;
      }

      const remaining = attemptsLeft - 1;
      if (remaining <= 0) {
        setLockoutSeconds(30);
        setAttemptsLeft(5);
        setLockError("Too many failed attempts. Locked for 30 seconds.");
      } else {
        setAttemptsLeft(remaining);
        setLockError(`Incorrect PIN. ${remaining} attempts left.`);
      }
      setTimeout(() => setPinInput(""), 400);
    }
  };

  const openEditor = (dateIso: string, type: EntryType, entryId?: string) => {
    const existing = entryId ? entries.find((entry) => entry.id === entryId) : undefined;
    setEditorDraft(
      existing
        ? {
            headline: existing.headline,
            content: existing.content,
            mood: existing.mood,
            feeling: existing.feeling,
            timeBucket: existing.timeBucket,
            location: existing.location ?? "",
          }
        : {
            headline: "",
            content: "",
            mood: "🙂",
            feeling: type === "story" ? "Grateful" : "Excited",
            timeBucket: "evening",
            location: "",
          },
    );
    history.push({ screen: "editor", date: dateIso, type, entryId });
  };

  const saveEditor = () => {
    if (route.screen !== "editor") return;
    const headline = editorDraft.headline.trim();
    const content = editorDraft.content.trim();
    if (!headline || !content) return;

    if (route.entryId) {
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === route.entryId
            ? {
                ...entry,
                headline,
                content,
                mood: editorDraft.mood,
                feeling: editorDraft.feeling,
                timeBucket: editorDraft.timeBucket,
                location: editorDraft.location.trim() || undefined,
              }
            : entry,
        ),
      );
    } else {
      const created: JournalEntry = {
        id: `entry-${Date.now()}`,
        type: route.type,
        date: route.date,
        headline,
        content,
        mood: editorDraft.mood,
        feeling: editorDraft.feeling,
        timeBucket: editorDraft.timeBucket,
        location: editorDraft.location.trim() || undefined,
      };
      setEntries((prev) => [created, ...prev]);
    }

    history.back();
  };

  const changeMainScreen = (screen: Extract<DayVaultRoute["screen"], "journal" | "calendar" | "identity" | "profile">) => {
    history.push({ screen });
  };

  const filteredJournal = useMemo(() => {
    if (!journalSearch.trim()) return entries;
    const needle = journalSearch.toLowerCase();
    return entries.filter(
      (entry) =>
        entry.headline.toLowerCase().includes(needle) || entry.content.toLowerCase().includes(needle),
    );
  }, [entries, journalSearch]);

  const dayEntries = route.screen === "day" ? entries.filter((entry) => entry.date === route.date) : [];

  const visibleCategories = useMemo(
    () => (favoritesOnly ? categories.filter((category) => category.favorite) : categories),
    [categories, favoritesOnly],
  );

  const activeCategory =
    categories.find((category) => category.id === activeCategoryId) ?? categories[0] ?? null;

  const filteredRankItems = useMemo(() => {
    if (!activeCategory) return [];
    if (!identitySearch.trim()) return activeCategory.items;
    const needle = identitySearch.toLowerCase();
    return activeCategory.items.filter((item) => item.name.toLowerCase().includes(needle));
  }, [activeCategory, identitySearch]);

  const mainRoute = route.screen === "day" || route.screen === "editor" ? "journal" : route.screen;

  const renderLock = () => (
    <div className="h-full bg-[#020617] text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full border border-indigo-400/40 bg-indigo-500/10 flex items-center justify-center">
            <Lock className="text-indigo-400" size={28} />
          </div>
          <h3 className="mt-4 text-xl tracking-[0.25em] uppercase">Memory Palace</h3>
          <p className="text-xs text-zinc-400 mt-2 uppercase tracking-wider">Identity encrypted</p>
        </div>

        <div className="flex justify-center gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <span
              key={`dot-${index}`}
              className={cn(
                "w-3 h-3 rounded-full border border-zinc-700",
                index < pinInput.length ? "bg-indigo-400 border-indigo-300" : "bg-zinc-900",
              )}
            />
          ))}
        </div>

        {lockError ? <p className="text-xs text-rose-400 text-center">{lockError}</p> : null}
        {lockoutSeconds > 0 ? (
          <p className="text-xs text-amber-300 text-center uppercase tracking-wide">Retry in {lockoutSeconds}s</p>
        ) : (
          <p className="text-xs text-zinc-500 text-center uppercase tracking-wide">{attemptsLeft} attempts remaining</p>
        )}

        <div className="grid grid-cols-3 gap-3">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
            <button
              key={digit}
              onClick={() => handlePinDigit(digit)}
              className="h-14 rounded-full border border-zinc-800 bg-zinc-900/70 text-lg"
            >
              {digit}
            </button>
          ))}
          <button onClick={unlock} className="h-14 rounded-full border border-emerald-400/30 bg-emerald-500/10 text-emerald-300 text-xs uppercase">
            Bio
          </button>
          <button onClick={() => handlePinDigit("0")} className="h-14 rounded-full border border-zinc-800 bg-zinc-900/70 text-lg">
            0
          </button>
          <button onClick={() => setPinInput((prev) => prev.slice(0, -1))} className="h-14 rounded-full border border-zinc-800 bg-zinc-900/70 text-xs uppercase">
            Del
          </button>
        </div>
      </div>
    </div>
  );

  const renderJournal = () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-2 top-2.5 text-zinc-500" />
          <input
            value={journalSearch}
            onChange={(event) => setJournalSearch(event.target.value)}
            placeholder="Search memories..."
            className="w-full pl-8 pr-3 py-2 bg-zinc-900/70 border border-zinc-800 rounded-md text-sm"
          />
        </div>
        <button
          onClick={() => openEditor(new Date().toISOString().slice(0, 10), "story")}
          className="px-3 py-2 bg-indigo-500 text-white text-xs font-bold uppercase"
        >
          <Plus size={14} className="inline mr-1" /> New
        </button>
      </div>

      {filteredJournal.map((entry) => (
        <article key={entry.id} className="border border-zinc-800 rounded-md p-4 bg-zinc-900/50">
          <div className="flex items-center justify-between">
            <span className="text-2xl">{entry.mood}</span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">
              {entry.type} | {toShortDate(entry.date)}
            </span>
          </div>
          <h4 className="mt-2 font-semibold">{entry.headline}</h4>
          <p className="mt-1 text-sm text-zinc-400 line-clamp-2">{entry.content}</p>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => openEditor(entry.date, entry.type, entry.id)}
              className="text-xs uppercase font-mono border border-zinc-700 px-2 py-1"
            >
              Open
            </button>
            {entry.location ? <span className="text-xs text-zinc-500">{entry.location}</span> : null}
          </div>
        </article>
      ))}
    </div>
  );

  const renderCalendar = () => {
    const cells = buildMonthGrid(monthCursor);
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <button onClick={() => setMonthCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))} className="p-2 border border-zinc-700">
            <ArrowLeft size={14} />
          </button>
          <p className="font-semibold">{toMonthTitle(monthCursor)}</p>
          <button onClick={() => setMonthCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))} className="p-2 border border-zinc-700">
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-xs text-zinc-500 font-mono uppercase">
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {cells.map((day, index) => {
            if (!day) return <div key={`empty-${index}`} />;
            const fullDate = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), day);
            const iso = fullDate.toISOString().slice(0, 10);
            const count = entries.filter((entry) => entry.date === iso).length;
            return (
              <button
                key={iso}
                onClick={() => history.push({ screen: "day", date: iso })}
                className="h-12 border border-zinc-800 bg-zinc-900/60 rounded-md text-sm relative"
              >
                {day}
                {count > 0 ? <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400" /> : null}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDayDetail = () => (
    <div className="space-y-3">
      <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">Day Timeline | {route.screen === "day" ? route.date : ""}</p>
      {dayEntries.length === 0 ? (
        <div className="border border-dashed border-zinc-700 rounded-md p-6 text-zinc-500 text-sm">
          No memories logged for this day.
        </div>
      ) : (
        dayEntries.map((entry) => (
          <article key={entry.id} className="border border-zinc-800 rounded-md p-4 bg-zinc-900/50">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{entry.headline}</h4>
              <span className="text-lg">{entry.mood}</span>
            </div>
            <p className="mt-2 text-sm text-zinc-400">{entry.content}</p>
          </article>
        ))
      )}

      <div className="flex gap-2">
        <button
          onClick={() => route.screen === "day" && openEditor(route.date, "story")}
          className="px-3 py-2 bg-indigo-500 text-white text-xs font-bold uppercase"
        >
          Add Story
        </button>
        <button
          onClick={() => route.screen === "day" && openEditor(route.date, "event")}
          className="px-3 py-2 bg-emerald-500 text-black text-xs font-bold uppercase"
        >
          Add Event
        </button>
      </div>
    </div>
  );

  const renderEditor = () => (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button
          onClick={() => route.screen === "editor" && history.push({ ...route, type: "story" })}
          className={cn(
            "px-3 py-2 text-xs uppercase font-mono border",
            route.screen === "editor" && route.type === "story" ? "border-indigo-400 bg-indigo-500/20" : "border-zinc-700",
          )}
        >
          Story
        </button>
        <button
          onClick={() => route.screen === "editor" && history.push({ ...route, type: "event" })}
          className={cn(
            "px-3 py-2 text-xs uppercase font-mono border",
            route.screen === "editor" && route.type === "event" ? "border-emerald-400 bg-emerald-500/20" : "border-zinc-700",
          )}
        >
          Event
        </button>
      </div>

      <input
        value={editorDraft.headline}
        onChange={(event) => setEditorDraft((prev) => ({ ...prev, headline: event.target.value }))}
        placeholder="Headline"
        className="w-full px-3 py-2 bg-zinc-900/70 border border-zinc-800 rounded-md"
      />
      <textarea
        value={editorDraft.content}
        onChange={(event) => setEditorDraft((prev) => ({ ...prev, content: event.target.value }))}
        placeholder="Memory content"
        rows={5}
        className="w-full px-3 py-2 bg-zinc-900/70 border border-zinc-800 rounded-md"
      />

      <div className="grid md:grid-cols-2 gap-2">
        <input
          value={editorDraft.feeling}
          onChange={(event) => setEditorDraft((prev) => ({ ...prev, feeling: event.target.value }))}
          placeholder="Feeling"
          className="px-3 py-2 bg-zinc-900/70 border border-zinc-800 rounded-md"
        />
        <input
          value={editorDraft.location}
          onChange={(event) => setEditorDraft((prev) => ({ ...prev, location: event.target.value }))}
          placeholder="Location (optional)"
          className="px-3 py-2 bg-zinc-900/70 border border-zinc-800 rounded-md"
        />
      </div>

      <div className="flex gap-2">
        {(["🙂", "⚡", "😌", "🎉", "😴"] as Mood[]).map((mood) => (
          <button
            key={mood}
            onClick={() => setEditorDraft((prev) => ({ ...prev, mood }))}
            className={cn(
              "w-10 h-10 border rounded-md",
              editorDraft.mood === mood ? "border-indigo-400 bg-indigo-500/20" : "border-zinc-700",
            )}
          >
            {mood}
          </button>
        ))}
      </div>

      <button onClick={saveEditor} className="px-3 py-2 bg-indigo-500 text-white text-xs font-bold uppercase">
        Save Entry
      </button>
    </div>
  );

  const renderIdentity = () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input
          value={identitySearch}
          onChange={(event) => setIdentitySearch(event.target.value)}
          placeholder="Search ranked items..."
          className="flex-1 px-3 py-2 bg-zinc-900/70 border border-zinc-800 rounded-md text-sm"
        />
        <button
          onClick={() => setFavoritesOnly((prev) => !prev)}
          className={cn(
            "px-3 py-2 text-xs uppercase font-mono border",
            favoritesOnly ? "border-amber-400 bg-amber-500/20 text-amber-200" : "border-zinc-700",
          )}
        >
          Favorites
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {visibleCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategoryId(category.id)}
            className={cn(
              "px-3 py-2 text-xs uppercase font-mono border",
              activeCategoryId === category.id ? "border-indigo-400 bg-indigo-500/20" : "border-zinc-700",
            )}
          >
            {category.favorite ? <Star size={12} className="inline mr-1 text-amber-300" /> : null}
            {category.title}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={newRankName}
          onChange={(event) => setNewRankName(event.target.value)}
          placeholder={activeCategory ? `Add to ${activeCategory.title}` : "Category unavailable"}
          className="flex-1 px-3 py-2 bg-zinc-900/70 border border-zinc-800 rounded-md text-sm"
        />
        <button
          onClick={() => {
            if (!activeCategory || !newRankName.trim()) return;
            setCategories((prev) =>
              prev.map((category) =>
                category.id !== activeCategory.id
                  ? category
                  : {
                      ...category,
                      items: [
                        ...category.items,
                        {
                          id: `rank-${Date.now()}`,
                          name: newRankName.trim(),
                          rating: 4,
                        },
                      ],
                    },
              ),
            );
            setNewRankName("");
          }}
          className="px-3 py-2 bg-indigo-500 text-white text-xs font-bold uppercase"
        >
          <Plus size={14} className="inline mr-1" /> Add
        </button>
      </div>

      <div className="space-y-2">
        {activeCategory
          ? filteredRankItems.map((item, index) => (
              <article key={item.id} className="border border-zinc-800 bg-zinc-900/50 rounded-md p-3 flex items-center gap-3">
                <span className="w-8 h-8 rounded-md bg-zinc-800 flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-amber-300">{renderStars(item.rating)}</p>
                </div>
                <button
                  onClick={() => {
                    if (!activeCategory || index === 0) return;
                    setCategories((prev) =>
                      prev.map((category) => {
                        if (category.id !== activeCategory.id) return category;
                        const copy = [...category.items];
                        [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
                        return { ...category, items: copy };
                      }),
                    );
                  }}
                  className="px-2 py-1 text-xs border border-zinc-700"
                >
                  Up
                </button>
              </article>
            ))
          : null}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-3">
        <div className="border border-zinc-800 rounded-md p-3 bg-zinc-900/50">
          <p className="font-mono text-[10px] uppercase text-zinc-500">Engrams</p>
          <p className="text-2xl font-bold">{entries.length}</p>
        </div>
        <div className="border border-zinc-800 rounded-md p-3 bg-zinc-900/50">
          <p className="font-mono text-[10px] uppercase text-zinc-500">Battery</p>
          <p className="text-2xl font-bold">87%</p>
        </div>
        <div className="border border-zinc-800 rounded-md p-3 bg-zinc-900/50">
          <p className="font-mono text-[10px] uppercase text-zinc-500">RAM</p>
          <p className="text-2xl font-bold">8.1 / 16 GB</p>
        </div>
      </div>

      <div className="border border-zinc-800 rounded-md p-4 bg-zinc-900/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Neural Encryption</p>
            <p className="text-sm text-zinc-400">Require authentication at launch</p>
          </div>
          <button
            onClick={() => setSecurityEnabled((prev) => !prev)}
            className={cn(
              "px-3 py-2 text-xs uppercase font-mono border",
              securityEnabled ? "border-emerald-400 bg-emerald-500/20 text-emerald-300" : "border-zinc-700 text-zinc-400",
            )}
          >
            {securityEnabled ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>

      <div className="border border-zinc-800 rounded-md p-4 bg-zinc-900/50 space-y-2 text-sm text-zinc-400">
        <p className="text-white font-semibold">Security Notes</p>
        <p>PBKDF2 key derivation, lockout after repeated failures, and biometric reset support are simulated here.</p>
        <p>Backup/export management is represented as static diagnostics in demo mode.</p>
      </div>
    </div>
  );

  const mainNavItems: { id: Extract<DayVaultRoute["screen"], "journal" | "calendar" | "identity" | "profile">; label: string; icon: typeof CalendarDays }[] = [
    { id: "journal", label: "Journal", icon: CalendarDays },
    { id: "calendar", label: "Recall", icon: CalendarDays },
    { id: "identity", label: "Identity", icon: FolderHeart },
    { id: "profile", label: "System", icon: ShieldCheck },
  ];

  if (route.screen === "lock") {
    return <div className="h-full rounded-lg overflow-hidden border border-zinc-800">{renderLock()}</div>;
  }

  return (
    <div className="h-full border border-zinc-800 bg-[#020617] text-white rounded-lg overflow-hidden min-h-[620px] flex flex-col">
      <header className="border-b border-zinc-800 px-4 py-3 flex items-center gap-2 bg-black/30">
        <button onClick={history.back} disabled={!history.canBack} className="p-2 border border-zinc-700 disabled:opacity-40">
          <ArrowLeft size={14} />
        </button>
        <button onClick={history.forward} disabled={!history.canForward} className="p-2 border border-zinc-700 disabled:opacity-40">
          <ArrowRight size={14} />
        </button>
        <p className="ml-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
          {route.screen === "day" ? `day/${route.date}` : route.screen === "editor" ? `editor/${route.type}` : route.screen}
        </p>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        {route.screen === "journal" ? renderJournal() : null}
        {route.screen === "calendar" ? renderCalendar() : null}
        {route.screen === "day" ? renderDayDetail() : null}
        {route.screen === "editor" ? renderEditor() : null}
        {route.screen === "identity" ? renderIdentity() : null}
        {route.screen === "profile" ? renderProfile() : null}
      </main>

      <footer className="border-t border-zinc-800 px-2 py-2 bg-black/40">
        <div className="grid grid-cols-4 gap-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = mainRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => changeMainScreen(item.id)}
                className={cn(
                  "py-2 text-xs font-mono uppercase tracking-wider border rounded",
                  isActive ? "border-indigo-400 bg-indigo-500/20 text-white" : "border-zinc-800 text-zinc-500",
                )}
              >
                <Icon size={12} className="inline mr-1" />
                {item.label}
              </button>
            );
          })}
        </div>
      </footer>
    </div>
  );
}
