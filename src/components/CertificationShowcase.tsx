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
import type { AttachmentAsset } from "@/lib/attachments";

interface CertificationShowcaseProps {
  certifications: AttachmentAsset[];
}

function toEpoch(value: string) {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export default function CertificationShowcase({
  certifications,
}: CertificationShowcaseProps) {
  const sortedCertifications = [...certifications].sort(
    (a, b) => toEpoch(b.updatedAt) - toEpoch(a.updatedAt)
  );

  return (
    <section className="section-px pt-24 sm:pt-28 pb-14 sm:pb-18">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 sm:mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-700/85 bg-zinc-900/60 text-zinc-300 font-mono text-[10px] uppercase tracking-widest">
          <ShieldCheck size={12} className="text-brand-cyan" />
          Credential Vault
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
          Certifications & Credentials
        </h1>
        <p className="mt-3 text-zinc-400 max-w-3xl text-sm sm:text-base leading-relaxed">
          Curated proof of learning and professional development. Open any credential to preview it
          in full and download from inside the viewer.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {sortedCertifications.map((certification, index) => (
          <motion.article
            key={certification.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="neo-panel rounded-xl p-4 sm:p-5 border border-zinc-800/90 group hover:-translate-y-1 transition-transform"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-brand-orange/35 text-[10px] uppercase tracking-widest font-mono text-brand-orange">
                <BadgeCheck size={12} />
                Verified
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                {certification.extension.toUpperCase()}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-semibold leading-tight mb-2">
              {certification.title}
            </h2>

            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              {certification.description}
            </p>

            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase tracking-wider">
                <FileBadge size={13} className="text-brand-cyan" />
                Issuer: {certification.issuer ?? "Credential Archive"}
              </div>
              <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono uppercase tracking-wider">
                <CalendarDays size={13} />
                Updated: {certification.updatedAt}
              </div>
              {certification.spotlight ? (
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-brand-cyan/10 border border-brand-cyan/25 text-brand-cyan text-[10px] font-mono uppercase tracking-wider">
                  {certification.spotlight}
                </div>
              ) : null}
            </div>

            <Link
              href={`/preview/${certification.id}`}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-mono px-3.5 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 group-hover:text-white group-hover:border-brand-cyan/50 transition-colors"
            >
              Preview Credential
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

