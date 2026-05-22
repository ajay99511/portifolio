import type { Metadata } from "next";
import CertificationShowcase from "@/components/CertificationShowcase";
import { getCertificationAttachments } from "@/lib/attachments";

export const metadata: Metadata = {
  title: "Certifications & Credentials",
  description:
    "Browse Ajay's certifications and credentials with polished previews and verified certificate records.",
};

export default function CertificationsPage() {
  const certifications = getCertificationAttachments();

  return (
    <main id="main-content" className="min-h-screen bg-black">
      <CertificationShowcase certifications={certifications} />

      <footer className="py-8 sm:py-12 section-px border-t border-white/8 bg-black/85 text-center safe-bottom">
        <p className="font-mono text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-[0.18em]">
          Copyright 2026 AJAY // CREDENTIAL_VAULT
        </p>
      </footer>
    </main>
  );
}

