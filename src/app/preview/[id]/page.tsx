import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AttachmentPreviewViewer from "@/components/AttachmentPreviewViewer";
import { getAttachmentById, getAttachmentIds } from "@/lib/attachments";
import { FEATURES } from "@/lib/features";

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

  if (!attachment || (id === "resume" && !FEATURES.enableResume)) {
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

  if (!attachment || (id === "resume" && !FEATURES.enableResume)) {
    notFound();
  }

  return (
    <main id="main-content" className="min-h-screen bg-black">
      <AttachmentPreviewViewer attachment={attachment} />
    </main>
  );
}
