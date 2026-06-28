import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Ajay — a Full-Stack Software Engineer from Andhra Pradesh, India, now based in the US. Building scalable systems, AI-driven products, and open-source tools.",
  openGraph: {
    title: "About | Ajay Portfolio",
    description:
      "Learn about Ajay — a Full-Stack Software Engineer and aspiring entrepreneur building scalable systems, AI-driven products, and open-source tools.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
