import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — FastBeat Media Player",
  description:
    "Privacy Policy for FastBeat Media Player by Ajay Elika. Learn how your data is handled — all processing is done locally on your device.",
};

/* ─── Design Tokens (FastBeat Palette) ─── */
const C = {
  bg: "#0C0C10",
  surface: "#141418",
  surfaceContainer: "#1C1C22",
  surfaceHigh: "#242430",
  surfaceHighest: "#2C2C38",
  outline: "#44445A",
  textPrimary: "#F0F0F5",
  textSecondary: "#B0B0C0",
  textTertiary: "#707088",
  accent: "#FF5500",
  accentDim: "rgba(255,85,0,0.12)",
  purple: "#8B51E6",
  pink: "#E44CD8",
  cyan: "#42E8E0",
  green: "#22C55E",
} as const;

export default function FastBeatPrivacyPolicy() {
  const effectiveDate = "June 1, 2026";
  const lastUpdated = "June 1, 2026";

  return (
    <main
      className="min-h-screen font-sans selection:bg-orange-500/30 selection:text-white"
      style={{ background: C.bg, color: C.textPrimary }}
    >
      {/* ───── Hero / Header ───── */}
      <header className="relative overflow-hidden">
        {/* Gradient Glow Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 50% 0%, ${C.accent}18 0%, transparent 70%),
              radial-gradient(ellipse 40% 30% at 80% 10%, ${C.purple}10 0%, transparent 60%)
            `,
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-mono" style={{ color: C.textTertiary }}>
              <li>
                <Link href="/" className="hover:underline transition-colors" style={{ color: C.textSecondary }}>
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <span style={{ color: C.outline }}>/</span>
              </li>
              <li>
                <Link
                  href="/projects/fastbeat-media-player"
                  className="hover:underline transition-colors"
                  style={{ color: C.textSecondary }}
                >
                  FastBeat
                </Link>
              </li>
              <li aria-hidden="true">
                <span style={{ color: C.outline }}>/</span>
              </li>
              <li aria-current="page" style={{ color: C.accent }}>
                Privacy Policy
              </li>
            </ol>
          </nav>

          {/* App Icon + Title */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${C.accent}, ${C.purple})`,
                boxShadow: `0 8px 32px ${C.accent}30`,
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Privacy Policy
              </h1>
              <p className="text-base mt-1" style={{ color: C.textSecondary }}>
                <span className="font-bold" style={{ color: C.textPrimary }}>Fast</span>
                <span className="font-bold" style={{ color: C.accent }}>Beat</span>
                <span className="mx-2" style={{ color: C.outline }}>·</span>
                Media Player
              </p>
            </div>
          </div>

          {/* Meta Badges */}
          <div className="flex flex-wrap gap-3 text-xs font-mono">
            <span
              className="px-3 py-1.5 rounded-full border"
              style={{ borderColor: `${C.accent}40`, background: C.accentDim, color: C.accent }}
            >
              Effective: {effectiveDate}
            </span>
            <span
              className="px-3 py-1.5 rounded-full border"
              style={{ borderColor: `${C.purple}40`, background: `${C.purple}12`, color: C.purple }}
            >
              Last Updated: {lastUpdated}
            </span>
            <span
              className="px-3 py-1.5 rounded-full border"
              style={{ borderColor: `${C.green}40`, background: `${C.green}12`, color: C.green }}
            >
              ✓ Google Play Compliant
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${C.accent}40, ${C.purple}30, transparent)` }}
        />
      </header>

      {/* ───── Content ───── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Quick Summary Card */}
        <div
          className="rounded-2xl p-6 sm:p-8 mb-12 border"
          style={{
            background: C.surfaceContainer,
            borderColor: `${C.green}25`,
            boxShadow: `0 0 40px ${C.green}08`,
          }}
        >
          <div className="flex items-start gap-3 mb-4">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: `${C.green}1a` }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-1" style={{ color: C.green }}>
                Privacy at a Glance
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: C.textSecondary }}>
                FastBeat is a <strong style={{ color: C.textPrimary }}>fully offline</strong> media player.
                It does <strong style={{ color: C.textPrimary }}>not collect, transmit, or store</strong> any
                personal data on external servers. All media processing happens{" "}
                <strong style={{ color: C.textPrimary }}>entirely on your device</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-10">
          {/* Section 1 */}
          <PolicySection number="01" title="Introduction" accentColor={C.accent}>
            <p>
              This Privacy Policy describes how <strong>FastBeat Media Player</strong> (&quot;the App&quot;),
              developed by <strong>Ajay Elika</strong> (&quot;Developer&quot;, &quot;I&quot;, &quot;me&quot;, or &quot;my&quot;),
              handles information when you use the application. By downloading, installing, or using FastBeat,
              you agree to the practices described in this policy.
            </p>
            <p>
              FastBeat is provided as a free, open-source application intended for personal media playback.
              The app is designed with <strong>privacy by default</strong> — no user account is required,
              no analytics are collected, and no data is shared with third parties.
            </p>
          </PolicySection>

          {/* Section 2 */}
          <PolicySection number="02" title="Information We Do NOT Collect" accentColor={C.green}>
            <p>
              FastBeat is committed to your privacy. The App does <strong>NOT</strong> collect, store, or
              transmit any of the following:
            </p>
            <ul className="space-y-2 mt-4">
              {[
                "Personal identification information (name, email, phone number, address)",
                "Device identifiers or advertising IDs",
                "Location data (GPS, IP-based, or network-based)",
                "Usage analytics, crash reports, or telemetry data",
                "Browsing history, search queries, or app interaction logs",
                "Financial or payment information",
                "Contacts, call logs, or text messages",
                "Photos, videos, or audio recordings to any server",
                "Any data to third-party analytics, advertising, or tracking services",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: C.textSecondary }}>
                  <span
                    className="shrink-0 mt-1 w-5 h-5 rounded flex items-center justify-center text-xs font-bold"
                    style={{ background: `${C.green}1a`, color: C.green }}
                  >
                    ✕
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </PolicySection>

          {/* Section 3 */}
          <PolicySection number="03" title="Device Permissions & Local Data Access" accentColor={C.cyan}>
            <p>
              FastBeat requires access to certain device capabilities in order to function as a media player.
              These permissions are used <strong>exclusively on-device</strong> and no data accessed through
              them is ever transmitted to any external server, cloud service, or third party.
            </p>

            <div className="mt-6 space-y-4">
              <PermissionCard
                permission="Storage / Media Files"
                description="Read access to local media files (audio, video, and images) stored on your device. This is required to scan, index, and play your media library."
                usage="Media is scanned and indexed locally using Room (SQLite) database. File metadata such as title, artist, album, duration, and file path are stored exclusively in the app's local database on your device."
                accentColor={C.accent}
              />
              <PermissionCard
                permission="READ_MEDIA_AUDIO (Android 13+)"
                description="Granular permission to read audio files on devices running Android 13 (API 33) and above."
                usage="Used exclusively to discover and play audio tracks from your device storage. No audio content is copied, transmitted, or uploaded."
                accentColor={C.purple}
              />
              <PermissionCard
                permission="READ_MEDIA_VIDEO (Android 13+)"
                description="Granular permission to read video files on devices running Android 13 (API 33) and above."
                usage="Used exclusively to discover and play video files from your device storage. No video content is copied, transmitted, or uploaded."
                accentColor={C.pink}
              />
              <PermissionCard
                permission="READ_MEDIA_IMAGES (Android 13+)"
                description="Granular permission to read image files on devices running Android 13 (API 33) and above."
                usage="Used exclusively to display album art and image thumbnails within the app. No image content is copied, transmitted, or uploaded."
                accentColor={C.cyan}
              />
              <PermissionCard
                permission="Foreground Service (Media Playback)"
                description="Allows playback to continue when the app is in the background via a foreground notification."
                usage="Ensures uninterrupted media playback and displays playback controls in the notification shade. No data is collected or transmitted through this service."
                accentColor={C.green}
              />
              <PermissionCard
                permission="WAKE_LOCK"
                description="Prevents the device from sleeping during active media playback."
                usage="Used only during active playback sessions to prevent audio/video interruption. Released immediately when playback is paused or stopped."
                accentColor={C.textTertiary}
              />
            </div>

            <div
              className="mt-6 rounded-xl p-4 border text-sm"
              style={{
                borderColor: `${C.cyan}25`,
                background: `${C.cyan}08`,
                color: C.textSecondary,
              }}
            >
              <strong style={{ color: C.cyan }}>Key Principle:</strong> All media data — including images,
              video, and audio — is accessed and processed entirely on your device. FastBeat does{" "}
              <strong style={{ color: C.textPrimary }}>not upload, stream, or transmit</strong> any media
              content to any server, cloud service, or external endpoint.
            </div>
          </PolicySection>

          {/* Section 4 */}
          <PolicySection number="04" title="Data Storage & Retention" accentColor={C.purple}>
            <p>
              FastBeat stores a minimal amount of data locally on your device to provide its core functionality:
            </p>
            <ul className="space-y-2 mt-4">
              {[
                {
                  label: "Media Library Index",
                  detail: "File paths, titles, artists, album names, durations, and other metadata extracted from your media files are stored in a local Room (SQLite) database.",
                },
                {
                  label: "Playback Preferences",
                  detail: "Your settings such as shuffle/repeat mode, last played track, playback position, and volume preferences are stored in SharedPreferences on your device.",
                },
                {
                  label: "Playlist Data",
                  detail: "Any playlists you create are stored locally in the Room database and are never synced or uploaded.",
                },
                {
                  label: "Listening Statistics",
                  detail: "Play counts and listening history displayed in the Stats tab are computed and stored locally. This data never leaves your device.",
                },
              ].map((item) => (
                <li key={item.label} className="text-sm" style={{ color: C.textSecondary }}>
                  <strong style={{ color: C.textPrimary }}>{item.label}:</strong> {item.detail}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              All locally stored data is deleted when you uninstall the application or clear the app data through
              your device settings. FastBeat does not create backups of your data on any external service.
            </p>
          </PolicySection>

          {/* Section 5 */}
          <PolicySection number="05" title="Third-Party Services" accentColor={C.accent}>
            <p>
              FastBeat does <strong>NOT</strong> integrate any of the following third-party services:
            </p>
            <ul className="space-y-2 mt-4">
              {[
                "Google Analytics, Firebase Analytics, or any analytics SDK",
                "Google AdMob, Facebook Ads, or any advertising framework",
                "Crashlytics, Sentry, or any crash reporting service",
                "Social media SDKs or login providers",
                "Cloud storage services (Google Drive, Dropbox, etc.)",
                "Any Content Delivery Networks (CDNs) for media streaming",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: C.textSecondary }}>
                  <span
                    className="shrink-0 mt-1 w-5 h-5 rounded flex items-center justify-center text-xs font-bold"
                    style={{ background: C.accentDim, color: C.accent }}
                  >
                    ✕
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              The App operates entirely offline and does not make any network requests. It does not contain
              any embedded web views, tracking pixels, or remote configuration endpoints.
            </p>
          </PolicySection>

          {/* Section 6 */}
          <PolicySection number="06" title="Children's Privacy" accentColor={C.pink}>
            <p>
              FastBeat is a general-purpose media player that does not target children under the age of 13.
              The App does not knowingly collect personally identifiable information from children under 13
              years of age.
            </p>
            <p>
              Since FastBeat collects <strong>no personal data whatsoever</strong> from any user regardless
              of age, there is no risk of COPPA (Children&apos;s Online Privacy Protection Act) violations. The
              App does not require account creation, does not use behavioral tracking, and does not serve
              advertisements.
            </p>
          </PolicySection>

          {/* Section 7 */}
          <PolicySection number="07" title="Data Sharing & Disclosure" accentColor={C.accent}>
            <p>
              FastBeat does <strong>not share any data</strong> with any third party because it does not
              collect any data in the first place. Specifically:
            </p>
            <ul className="space-y-2 mt-4">
              {[
                "No data is sold, rented, or traded to third parties.",
                "No data is shared with advertising or marketing partners.",
                "No data is provided to analytics or data mining companies.",
                "No data is disclosed to government authorities (as none exists to disclose).",
                "No data is transferred across international borders.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: C.textSecondary }}>
                  <span
                    className="shrink-0 mt-1 w-5 h-5 rounded flex items-center justify-center text-xs font-bold"
                    style={{ background: C.accentDim, color: C.accent }}
                  >
                    ✕
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </PolicySection>

          {/* Section 8 */}
          <PolicySection number="08" title="Security" accentColor={C.green}>
            <p>
              Although FastBeat does not collect or transmit personal data, we take the following security
              measures to protect the application and your device:
            </p>
            <ul className="space-y-2 mt-4">
              {[
                "The application code follows Android security best practices and does not request unnecessary permissions.",
                "All data stored locally is protected by the Android operating system's built-in sandboxing and encryption (when device encryption is enabled).",
                "No data is transmitted over the internet, eliminating the risk of data interception or man-in-the-middle attacks.",
                "The source code is open-source and available for inspection on GitHub to ensure transparency.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: C.textSecondary }}>
                  <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: C.green }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </PolicySection>

          {/* Section 9 */}
          <PolicySection number="09" title="Your Rights" accentColor={C.purple}>
            <p>
              Since FastBeat does not collect personal data, traditional data subject rights (such as access,
              correction, deletion, and portability under GDPR, CCPA, or similar regulations) are not
              applicable. However, you retain full control over your data:
            </p>
            <ul className="space-y-2 mt-4">
              {[
                {
                  label: "Data Deletion",
                  detail: "You can delete all app data at any time by uninstalling the app or clearing its data through Android Settings → Apps → FastBeat → Storage → Clear Data.",
                },
                {
                  label: "Permission Revocation",
                  detail: "You can revoke storage/media permissions at any time through Android Settings → Apps → FastBeat → Permissions. The app may not function fully without media access.",
                },
                {
                  label: "Transparency",
                  detail: "The FastBeat source code is publicly available on GitHub for full transparency. You can audit exactly what the app does with your data.",
                },
              ].map((item) => (
                <li key={item.label} className="text-sm" style={{ color: C.textSecondary }}>
                  <strong style={{ color: C.textPrimary }}>{item.label}:</strong> {item.detail}
                </li>
              ))}
            </ul>
          </PolicySection>

          {/* Section 10 */}
          <PolicySection number="10" title="Changes to This Privacy Policy" accentColor={C.cyan}>
            <p>
              This Privacy Policy may be updated from time to time. Any changes will be reflected on this
              page with an updated &quot;Last Updated&quot; date at the top of the policy. Since FastBeat does not
              collect email addresses or any contact information, I recommend periodically reviewing this
              page for any updates.
            </p>
            <p>
              Continued use of the App after any modifications to this Privacy Policy constitutes your
              acceptance of the updated terms. If significant changes are made, I will update the version
              number in the app&apos;s release notes on the Google Play Store.
            </p>
          </PolicySection>

          {/* Section 11 */}
          <PolicySection number="11" title="Open Source Disclosure" accentColor={C.accent}>
            <p>
              FastBeat is an open-source project. The complete source code is available for review,
              contribution, and audit at:
            </p>
            <a
              href="https://github.com/ajay99511/FastBeat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
              style={{
                background: C.surfaceHigh,
                color: C.textPrimary,
                border: `1px solid ${C.outline}`,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              github.com/ajay99511/FastBeat
            </a>
          </PolicySection>

          {/* Section 12 */}
          <PolicySection number="12" title="Contact Information" accentColor={C.accent}>
            <p>
              If you have any questions, concerns, or suggestions regarding this Privacy Policy or
              the FastBeat application, please do not hesitate to contact the developer:
            </p>
            <div
              className="mt-6 rounded-2xl p-6 sm:p-8 border space-y-5"
              style={{ background: C.surfaceContainer, borderColor: `${C.accent}20` }}
            >
              <ContactRow label="Developer" value="Ajay Elika" />
              <div className="h-px w-full" style={{ background: `${C.textPrimary}0d` }} />
              <ContactRow
                label="Email"
                value="ajayelika9010@gmail.com"
                href="mailto:ajayelika9010@gmail.com"
              />
              <div className="h-px w-full" style={{ background: `${C.textPrimary}0d` }} />
              <ContactRow label="Phone" value="+91 9137623528" href="tel:+919137623528" />
              <div className="h-px w-full" style={{ background: `${C.textPrimary}0d` }} />
              <ContactRow
                label="GitHub"
                value="github.com/ajay99511"
                href="https://github.com/ajay99511"
                external
              />
            </div>
          </PolicySection>

          {/* Section 13 - Google Play Data Safety Compliance */}
          <PolicySection number="13" title="Google Play Data Safety Declaration" accentColor={C.green}>
            <p>
              In compliance with Google Play Store&apos;s Data Safety section requirements, the following
              declarations accurately represent FastBeat&apos;s data handling practices:
            </p>
            <div className="mt-6 space-y-3">
              {[
                {
                  question: "Does the app collect data?",
                  answer: "No. FastBeat does not collect any user data.",
                  color: C.green,
                },
                {
                  question: "Does the app share data with third parties?",
                  answer: "No. FastBeat does not share any data with third parties.",
                  color: C.green,
                },
                {
                  question: "Is data encrypted in transit?",
                  answer: "Not applicable. FastBeat does not transmit any data over the internet.",
                  color: C.cyan,
                },
                {
                  question: "Can users request data deletion?",
                  answer: "All data is stored locally and can be deleted by uninstalling the app or clearing app data.",
                  color: C.green,
                },
                {
                  question: "Does the app follow Google's Families Policy?",
                  answer: "FastBeat is not targeted at children but collects no data, ensuring compliance with child safety guidelines.",
                  color: C.green,
                },
              ].map((item) => (
                <div
                  key={item.question}
                  className="rounded-xl p-4 border text-sm"
                  style={{ background: C.surfaceHigh, borderColor: `${item.color}15` }}
                >
                  <p className="font-bold mb-1" style={{ color: C.textPrimary }}>
                    {item.question}
                  </p>
                  <p style={{ color: C.textSecondary }}>{item.answer}</p>
                </div>
              ))}
            </div>
          </PolicySection>
        </div>

        {/* ───── Footer ───── */}
        <footer className="mt-16 pt-8 border-t" style={{ borderColor: `${C.outline}40` }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold" style={{ color: C.textPrimary }}>Fast</span>
              <span className="text-sm font-bold" style={{ color: C.accent }}>Beat</span>
              <span className="text-xs" style={{ color: C.textTertiary }}>
                — A product by Ajay Elika
              </span>
            </div>
            <p className="text-xs font-mono" style={{ color: C.textTertiary }}>
              © {new Date().getFullYear()} FastBeat. All rights reserved.
            </p>
          </div>
          <p className="text-center text-[11px] mt-6 pb-8" style={{ color: C.textTertiary }}>
            This privacy policy is hosted at{" "}
            <span style={{ color: C.textSecondary }}>
              ajayelika.dev/privacy/fastbeat
            </span>{" "}
            and complies with Google Play Store Developer Program Policies.
          </p>
        </footer>
      </div>
    </main>
  );
}

/* ═══════════ Reusable Sub-Components ═══════════ */

function PolicySection({
  number,
  title,
  accentColor,
  children,
}: {
  number: string;
  title: string;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-24" id={`section-${number}`}>
      <div className="flex items-center gap-3 mb-5">
        <span
          className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg"
          style={{ background: `${accentColor}15`, color: accentColor }}
        >
          {number}
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: "#F0F0F5" }}>
          {title}
        </h2>
        <div className="flex-1 h-px" style={{ background: `${accentColor}20` }} />
      </div>
      <div
        className="space-y-4 text-sm leading-relaxed pl-0 sm:pl-10"
        style={{ color: "#B0B0C0" }}
      >
        {children}
      </div>
    </section>
  );
}

function PermissionCard({
  permission,
  description,
  usage,
  accentColor,
}: {
  permission: string;
  description: string;
  usage: string;
  accentColor: string;
}) {
  return (
    <div
      className="rounded-xl p-5 border transition-colors"
      style={{
        background: "#1C1C22",
        borderColor: `${accentColor}15`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: accentColor }}
        />
        <h3 className="text-sm font-bold" style={{ color: "#F0F0F5" }}>
          {permission}
        </h3>
      </div>
      <p className="text-xs mb-2" style={{ color: "#B0B0C0" }}>
        {description}
      </p>
      <p className="text-xs" style={{ color: "#707088" }}>
        <strong style={{ color: "#B0B0C0" }}>How it&apos;s used:</strong> {usage}
      </p>
    </div>
  );
}

function ContactRow({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
      <span
        className="text-xs font-mono uppercase tracking-wider w-24 shrink-0"
        style={{ color: "#707088" }}
      >
        {label}
      </span>
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="text-sm font-medium hover:underline transition-colors"
          style={{ color: "#FF5500" }}
        >
          {value}
        </a>
      ) : (
        <span className="text-sm font-medium" style={{ color: "#F0F0F5" }}>
          {value}
        </span>
      )}
    </div>
  );
}
