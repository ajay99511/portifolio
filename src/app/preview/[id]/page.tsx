import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import AttachmentPreviewViewer from "@/components/AttachmentPreviewViewer";
import { getAttachmentById, getAttachmentIds } from "@/lib/attachments";

interface AttachmentPreviewPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return getAttachmentIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: AttachmentPreviewPageProps): Promise<Metadata> {
  const { id } = await params;
  const attachment = getAttachmentById(id);

  if (!attachment) {
    return {
      title: "Preview Not Found",
    };
  }

  return {
    title: `${attachment.title} Preview`,
    description: `Interactive preview experience for ${attachment.title}.`,
  };
}

export default async function AttachmentPreviewPage({
  params,
}: AttachmentPreviewPageProps) {
  const { id } = await params;
  const attachment = getAttachmentById(id);

  if (!attachment) {
    notFound();
  }

  return (
    <main id="main-content" className="min-h-screen bg-black">
      <Navbar />
      <AttachmentPreviewViewer attachment={attachment} />

      <footer className="py-8 sm:py-12 section-px border-t border-white/8 bg-black/85 text-center safe-bottom">
        <p className="font-mono text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-[0.18em]">
          Copyright 2026 AJAY // FILE_PREVIEW_ENGINE
        </p>
      </footer>
    </main>
  );
}
