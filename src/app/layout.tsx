import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Outfit, Oxanium, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import LayoutShell from "@/components/LayoutShell";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ajay // Full-Stack Engineer",
    template: "%s | Ajay Portfolio",
  },
  description:
    "Interactive engineering portfolio by Ajay featuring high-fidelity project showcases, systems design thinking, and AI-centric product builds.",
  openGraph: {
    title: "Ajay // Full-Stack Engineer",
    description:
      "Interactive engineering portfolio featuring high-fidelity project showcases, systems design thinking, and AI-centric product builds.",
    url: "/",
    siteName: "Ajay Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ajay — Full-Stack Software Engineer & Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay // Full-Stack Engineer",
    description:
      "Interactive engineering portfolio featuring high-fidelity project showcases, systems design thinking, and AI-centric product builds.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ajay",
  jobTitle: "Full-Stack Software Engineer",
  url: siteUrl,
  sameAs: [
    "https://github.com/ajay99511",
    "https://www.linkedin.com/in/e-aj-47b71238b/",
    "https://leetcode.com/u/ajay216/",
  ],
  knowsAbout: [
    "Azure",
    "React",
    "Next.js",
    "Machine Learning",
    "Flutter",
    "Node.js",
    ".NET",
    "TypeScript",
    "AI/ML",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className={`${outfit.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${oxanium.variable} min-h-full flex flex-col`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <LayoutShell>
            {children}
          </LayoutShell>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
