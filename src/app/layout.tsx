import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Outfit, Oxanium, Space_Grotesk } from "next/font/google";
import LayoutShell from "@/components/LayoutShell";
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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Ajay // Full-Stack Engineer",
    template: "%s | Ajay Portfolio",
  },
  description:
    "Interactive engineering portfolio by Ajay featuring high-fidelity project showcases, systems design thinking, and AI-centric product builds.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
    >
      <body className={`${outfit.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${oxanium.variable} min-h-full flex flex-col`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <LayoutShell>
          {children}
        </LayoutShell>
      </body>
    </html>
  );
}
