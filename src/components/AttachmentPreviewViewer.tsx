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
    <div className="h-[64vh] min-h-[360px] rounded-xl border border-zinc-800/90 bg-[#070b12] p-6 sm:p-8 flex flex-col justify-center items-center text-center">
      <FileText size={34} className="text-zinc-400 mb-4" />
      <h3 className="text-lg sm:text-xl font-semibold mb-2">Preview Not Available Here</h3>
      <p className="text-zinc-400 text-sm max-w-xl mb-6">
        This file type is registered in the viewer pipeline, but the browser cannot render it inline
        in this runtime.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <a
          href={attachment.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-lg border border-zinc-700 text-sm font-mono uppercase tracking-wider text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
        >
          Open In New Tab
        </a>
        <a
          href={attachment.url}
          download={attachment.fileName}
          className="px-4 py-2.5 rounded-lg bg-brand-orange text-black font-semibold text-sm inline-flex items-center gap-2 hover:brightness-110 transition-all"
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
    <div className="h-[70vh] min-h-[420px] rounded-xl border border-zinc-800/90 bg-[#070b12] overflow-hidden">
      <iframe
        title={`${attachment.title} Office Preview`}
        src={officeEmbedUrl}
        className="w-full h-full bg-white"
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
      <div className="h-[74vh] min-h-[460px] rounded-xl border border-zinc-800/90 bg-[#070b12] overflow-hidden">
        <iframe
          title={`${attachment.title} PDF Preview`}
          src={`${attachment.url}#view=FitH`}
          className="w-full h-full bg-white"
        />
      </div>
    );
  }

  if (attachment.kind === "image") {
    return (
      <div className="h-[74vh] min-h-[460px] rounded-xl border border-zinc-800/90 bg-[#070b12] p-4 sm:p-6 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={attachment.url}
            alt={attachment.title}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-contain rounded-lg border border-zinc-700"
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
    <section className="section-px pt-24 sm:pt-28 pb-12 sm:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-6 sm:mb-8"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={14} />
          Back_To_Portfolio
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.04 }}
        className="neo-panel rounded-2xl border border-zinc-800/90 p-4 sm:p-6 lg:p-7"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-5 sm:mb-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-zinc-700 text-[10px] uppercase tracking-widest font-mono text-zinc-400">
                <Sparkles size={12} className="text-brand-cyan" />
                Premium Preview Mode
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-brand-orange/35 text-[10px] uppercase tracking-widest font-mono text-brand-orange">
                {renderTypeIcon(attachment.kind)}
                {typeCapsule}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight mb-2">
              {attachment.title}
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base max-w-3xl">{attachment.description}</p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <a
              href={attachment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-lg border border-zinc-700 font-mono text-xs uppercase tracking-wider text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors inline-flex items-center gap-2"
            >
              <ExternalLink size={14} />
              Open
            </a>
            <a
              href={attachment.url}
              download={attachment.fileName}
              className="px-3.5 py-2.5 rounded-lg bg-gradient-to-r from-brand-orange to-orange-400 text-black font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-2 hover:brightness-110 transition-all"
            >
              <Download size={14} />
              Download
            </a>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2 sm:gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 border border-zinc-800 rounded-full px-2.5 py-1">
            File: {attachment.fileName}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 border border-zinc-800 rounded-full px-2.5 py-1">
            Size: {attachment.sizeLabel}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 border border-zinc-800 rounded-full px-2.5 py-1">
            Updated: {attachment.updatedAt}
          </span>
        </div>

        <div className="mb-4 px-3.5 py-2.5 rounded-lg border border-brand-cyan/25 bg-brand-cyan/8">
          <div className="flex items-center gap-2 text-brand-cyan text-[11px] uppercase tracking-widest font-mono mb-1">
            <ShieldCheck size={13} />
            Render Engine
          </div>
          <p className="text-zinc-300 text-xs sm:text-sm">{getViewerModeHint(attachment.kind)}</p>
        </div>

        {previewByType(attachment, officeEmbedUrl)}
      </motion.div>
    </section>
  );
}
