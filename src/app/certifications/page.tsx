"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  FileBadge,
  ShieldCheck,
} from "lucide-react";
import { getCertificationAttachments, type AttachmentAsset } from "@/lib/attachments";

function toEpoch(value: string) {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export default function Certifications() {
  const certifications = getCertificationAttachments();
  const sortedCertifications = [...certifications].sort(
    (a, b) => toEpoch(b.updatedAt) - toEpoch(a.updatedAt)
  );

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col items-center">
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-14 sm:pb-18">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-brand-neon/40 bg-brand-neon/5 text-brand-neon font-mono text-[10px] uppercase tracking-widest">
            <ShieldCheck size={12} className="text-brand-neon" />
            Credential Vault
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-neon via-gradient-mid to-brand-purple tracking-tighter uppercase leading-none">
            Certifications & Credentials
          </h1>
          <p className="mt-4 text-muted max-w-3xl text-sm sm:text-base font-light leading-relaxed">
            Curated proof of learning and professional development. Open any credential to preview it
            in full and download from inside the viewer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {sortedCertifications.map((certification: AttachmentAsset, index: number) => (
            <motion.article
              key={certification.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-surface-raised/50 p-4 sm:p-5 border border-surface-border group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.06)] h-full flex flex-col"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-brand-neon/35 bg-brand-neon/5 text-[11px] uppercase tracking-widest font-mono text-brand-neon">
                  <BadgeCheck size={12} />
                  Verified
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-brand-purple">
                  {certification.extension.toUpperCase()}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-2 uppercase">
                {certification.title}
              </h2>

              <p className="text-muted font-light text-sm leading-relaxed mb-4">
                {certification.description}
              </p>

              <div className="space-y-2 mb-5 flex-1">
                <div className="flex items-center gap-2 text-blue-200/50 text-[11px] font-mono uppercase tracking-wider">
                  <FileBadge size={13} className="text-brand-purple" />
                  Issuer: {certification.issuer ?? "Credential Archive"}
                </div>
                <div className="flex items-center gap-2 text-blue-200/50 text-[11px] font-mono uppercase tracking-wider">
                  <CalendarDays size={13} className="text-brand-purple" />
                  Updated: {certification.updatedAt}
                </div>
                {certification.spotlight ? (
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-brand-purple/5 border border-brand-purple/30 text-brand-purple text-[11px] font-mono uppercase tracking-wider mt-2">
                    {certification.spotlight}
                  </div>
                ) : null}
              </div>

              <div className="mt-auto pt-4 border-t border-surface-border transition-colors">
                  <Link
                    href={`/preview/${certification.id}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-mono px-3.5 py-2.5 border border-surface-border text-muted group-hover:text-brand-neon group-hover:border-brand-neon/50 bg-surface-bg transition-colors"
                  >
                    Preview Credential
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}

