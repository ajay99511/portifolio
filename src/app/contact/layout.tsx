import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ajay — Full-Stack Software Engineer. Open to collaborations, opportunities, and interesting conversations.",
  openGraph: {
    title: "Contact | Ajay Portfolio",
    description:
      "Get in touch with Ajay — Full-Stack Software Engineer. Open to collaborations, opportunities, and interesting conversations.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
