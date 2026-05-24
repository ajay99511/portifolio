"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  LayoutGrid,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { AttachmentAsset, AttachmentKind } from "@/lib/attachments";

interface AttachmentPreviewViewerProps {
  attachment: AttachmentAsset;
}

function kindLabel(kind: AttachmentKind) {
  if (kind === "pdf") return "PDF";
  if (kind === "image") return "Image";
  if (kind === "doc") return "Document";
  if (kind === "excel") return "Spreadsheet";
  return "File";
}

function renderTypeIcon(kind: AttachmentKind) {
  if (kind === "image") return <ImageIcon size={12} />;
  if (kind === "excel") return <LayoutGrid size={12} />;
  return <FileText size={12} />;
}

function getViewerModeHint(kind: AttachmentKind) {
  if (kind === "pdf") return "Native PDF canvas preview";
  if (kind === "image") return "Hi-res image preview";
  if (kind === "doc") return "Office document preview";
  if (kind === "excel") return "Spreadsheet grid preview";
  return "File preview";
}

function UnsupportedTypePreview({ attachment }: { attachment: AttachmentAsset }) {
  return (
    <div className="h-[64vh] min-h-[360px] border border-surface-border bg-surface-raised/30 p-6 sm:p-8 flex flex-col justify-center items-center text-center">
      <FileText size={34} className="text-blue-200/50 mb-4" />
      <h3 className="text-lg sm:text-xl font-bold font-mono tracking-widest text-brand-neon uppercase mb-2">Preview Not Available Here</h3>
      <p className="text-blue-200/60 font-light text-sm max-w-xl mb-6">
        This file type is registered in the viewer pipeline, but the browser cannot render it inline
        in this runtime.
      </p>
      <div className="flex flex-wrap gap-3 justify-center mt-6">
        <a
          href={attachment.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 border border-surface-border font-mono text-xs uppercase tracking-widest text-blue-200/50 hover:text-brand-neon hover:border-brand-neon/50 transition-colors bg-surface-bg cursor-none"
        >
          Open In New Tab
        </a>
        <a
          href={attachment.url}
          download={attachment.fileName}
          className="px-4 py-2.5 bg-brand-neon/10 border border-brand-neon text-brand-neon font-bold font-mono text-xs uppercase tracking-widest inline-flex items-center gap-2 hover:bg-brand-neon/20 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all cursor-none"
        >
          <Download size={16} />
          Download
        </a>
      </div>
    </div>
  );
}

function OfficePreview({
  attachment,
  officeEmbedUrl,
}: {
  attachment: AttachmentAsset;
  officeEmbedUrl: string | null;
}) {
  if (!officeEmbedUrl) {
    return <UnsupportedTypePreview attachment={attachment} />;
  }

  return (
    <div className="h-[70vh] min-h-[420px] border border-surface-border bg-surface-raised/30 overflow-hidden">
      <iframe
        title={`${attachment.title} Office Preview`}
        src={officeEmbedUrl}
        className="w-full h-full bg-white filter-none"
      />
    </div>
  );
}

function previewByType(
  attachment: AttachmentAsset,
  officeEmbedUrl: string | null
) {
  if (attachment.kind === "pdf") {
    return (
      // h-[60vh]/min-h-[360px] on mobile, h-[74vh]/min-h-[460px] on md+ — Req 12.1
      <div className="h-[60vh] md:h-[74vh] min-h-[360px] md:min-h-[460px] border border-surface-border bg-surface-raised/30 overflow-hidden">
        <iframe
          title={`${attachment.title} PDF Preview`}
          src={`${attachment.url}#view=FitH`}
          className="w-full h-full bg-white filter-none"
        />
      </div>
    );
  }

  if (attachment.kind === "image") {
    return (
      // h-[50vh]/min-h-[300px] on mobile, h-[74vh]/min-h-[460px] on md+ — Req 12.2
      <div className="h-[50vh] md:h-[74vh] min-h-[300px] md:min-h-[460px] border border-surface-border bg-surface-bg p-4 sm:p-6 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full flex justify-center items-center">
          <Image
            src={attachment.url}
            alt={attachment.title}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="max-h-full max-w-full object-contain border border-surface-border"
          />
        </div>
      </div>
    );
  }

  if (attachment.kind === "doc" || attachment.kind === "excel") {
    return <OfficePreview attachment={attachment} officeEmbedUrl={officeEmbedUrl} />;
  }

  return <UnsupportedTypePreview attachment={attachment} />;
}

export default function AttachmentPreviewViewer({
  attachment,
}: AttachmentPreviewViewerProps) {
  const backHref = attachment.group === "certification" ? "/certifications" : "/";
  const backLabel =
    attachment.group === "certification"
      ? "Back_To_Certifications"
      : "Back_To_Portfolio";

  const officeEmbedUrl = useMemo(() => {
    if (attachment.kind !== "doc" && attachment.kind !== "excel") {
      return null;
    }

    if (typeof window === "undefined") {
      return null;
    }

    const absoluteUrl = new URL(attachment.url, window.location.origin).toString();
    const isLocalHost = absoluteUrl.includes("localhost") || absoluteUrl.includes("127.0.0.1");

    if (isLocalHost) {
      // Office Web Viewer requires a publicly reachable URL.
      return null;
    }

    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absoluteUrl)}`;
  }, [attachment.kind, attachment.url]);

  const typeCapsule = useMemo(() => kindLabel(attachment.kind), [attachment.kind]);

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col items-center">
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-6 sm:mb-8"
        >
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 min-h-[44px] text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={14} />
            {backLabel}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.04 }}
          className="bg-surface-raised/50 border border-surface-border p-4 sm:p-6 lg:p-7 shadow-[0_0_30px_rgba(0,240,255,0.06)]"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-5 sm:mb-6">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="inline-flex items-center gap-2 px-2.5 py-1 border border-brand-neon/30 bg-brand-neon/5 text-[10px] uppercase tracking-widest font-mono text-brand-neon">
                  <Sparkles size={12} className="text-brand-neon" />
                  Premium Preview Mode
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-brand-purple/35 bg-brand-purple/5 text-[10px] uppercase tracking-widest font-mono text-brand-purple">
                  {renderTypeIcon(attachment.kind)}
                  {typeCapsule}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-neon via-gradient-mid to-brand-purple tracking-tighter uppercase mb-2">
                {attachment.title}
              </h1>
              <p className="text-blue-200/60 text-sm sm:text-base font-light max-w-3xl">{attachment.description}</p>
            </div>

            {/* flex-wrap intentional: keeps Download/Open visible on narrow viewports — Req 12.4, 6.6 */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <a
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 border border-surface-border font-mono text-xs uppercase tracking-widest text-blue-200/60 hover:text-brand-neon hover:border-brand-neon/50 bg-surface-bg transition-colors inline-flex items-center gap-2 cursor-none"
              >
                <ExternalLink size={14} />
                Open
              </a>
              <a
                href={attachment.url}
                download={attachment.fileName}
                className="px-3.5 py-2.5 bg-brand-neon/10 border border-brand-neon text-brand-neon font-bold font-mono text-xs uppercase tracking-widest inline-flex items-center gap-2 hover:bg-brand-neon/20 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all cursor-none"
              >
                <Download size={14} />
                Download
              </a>
            </div>
          </div>

          {/* flex-wrap intentional: metadata chips wrap on narrow viewports instead of overflowing — Req 12.5 */}
          <div className="mb-4 flex flex-wrap gap-2 sm:gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-blue-200/50 border border-surface-border bg-surface-bg px-2.5 py-1">
              File: {attachment.fileName}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-blue-200/50 border border-surface-border bg-surface-bg px-2.5 py-1">
              Size: {attachment.sizeLabel}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-blue-200/50 border border-surface-border bg-surface-bg px-2.5 py-1">
              Updated: {attachment.updatedAt}
            </span>
          </div>

          <div className="mb-4 px-3.5 py-2.5 border border-brand-purple/25 bg-brand-purple/10">
            <div className="flex items-center gap-2 text-brand-purple text-[11px] uppercase tracking-widest font-mono mb-1">
              <ShieldCheck size={13} />
              Render Engine
            </div>
            <p className="text-blue-200/70 font-light text-xs sm:text-sm">{getViewerModeHint(attachment.kind)}</p>
          </div>

          {previewByType(attachment, officeEmbedUrl)}
        </motion.div>
      </section>
    </div>
  );
}
