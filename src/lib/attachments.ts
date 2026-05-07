export type AttachmentKind = "pdf" | "image" | "doc" | "excel" | "other";

export interface AttachmentAsset {
  id: string;
  title: string;
  description: string;
  fileName: string;
  url: string;
  extension: string;
  kind: AttachmentKind;
  updatedAt: string;
  sizeLabel: string;
}

const attachmentCatalog: AttachmentAsset[] = [
  {
    id: "resume",
    title: "Ajay Resume",
    description:
      "Professional profile, experience timeline, technical expertise, and project impact summary.",
    fileName: "Ajay_Resume.pdf",
    url: "/Ajay_Resume.pdf",
    extension: "pdf",
    kind: "pdf",
    updatedAt: "May 1, 2026",
    sizeLabel: "239 KB",
  },
];

export const attachments = attachmentCatalog;

export function getAttachmentById(id: string) {
  return attachments.find((asset) => asset.id === id);
}

export function getAttachmentIds() {
  return attachments.map((asset) => asset.id);
}

