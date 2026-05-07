export type AttachmentKind = "pdf" | "image" | "doc" | "excel" | "other";
export type AttachmentGroup = "resume" | "certification";

export interface AttachmentAsset {
  id: string;
  title: string;
  description: string;
  fileName: string;
  url: string;
  extension: string;
  kind: AttachmentKind;
  group: AttachmentGroup;
  updatedAt: string;
  sizeLabel: string;
  issuer?: string;
  spotlight?: string;
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
    group: "resume",
    updatedAt: "May 1, 2026",
    sizeLabel: "239 KB",
    issuer: "Ajay Portfolio",
    spotlight: "Professional Profile",
  },
  {
    id: "az204-credential",
    title: "AZ-204 Developer Associate Credential",
    description:
      "Official Azure Developer Associate credential record showcasing cloud architecture, deployment, and service integration proficiency.",
    fileName: "AZ204-DeveloperAssociate- ajayelika-216 _ Credential.pdf",
    url: "/certifications/AZ204-DeveloperAssociate-%20ajayelika-216%20_%20Credential.pdf",
    extension: "pdf",
    kind: "pdf",
    group: "certification",
    updatedAt: "Apr 23, 2025",
    sizeLabel: "459 KB",
    issuer: "Microsoft",
    spotlight: "Cloud Certification",
  },
  {
    id: "udemy-angular-certification",
    title: "Angular Course Certification",
    description:
      "Completion credential focused on modern Angular application development, component architecture, and frontend engineering workflows.",
    fileName: "Udemy Angular Course Certification.pdf",
    url: "/certifications/Udemy%20Angular%20Course%20Certification.pdf",
    extension: "pdf",
    kind: "pdf",
    group: "certification",
    updatedAt: "Sep 11, 2024",
    sizeLabel: "203 KB",
    issuer: "Udemy",
    spotlight: "Frontend Specialization",
  },
  {
    id: "udemy-az204-certificate",
    title: "AZ-204 Preparation Certificate",
    description:
      "Training certificate centered on Azure developer exam preparation, covering services, identity, APIs, and deployment patterns.",
    fileName: "UdemyAZ204.pdf",
    url: "/certifications/UdemyAZ204.pdf",
    extension: "pdf",
    kind: "pdf",
    group: "certification",
    updatedAt: "May 5, 2025",
    sizeLabel: "214 KB",
    issuer: "Udemy",
    spotlight: "Azure Skills",
  },
  {
    id: "certificate-1",
    title: "Programming for Everybody (University of Michigan)",
    description:
      "Archived foundational credential included in your certification timeline and accessible with full-resolution preview.",
    fileName: "Certificate1.pdf",
    url: "/certifications/Certificate1.pdf",
    extension: "pdf",
    kind: "pdf",
    group: "certification",
    updatedAt: "Jun 17, 2022",
    sizeLabel: "352 KB",
    issuer: "Credential Archive",
    spotlight: "Foundational Milestone",
  },
  {
    id: "certificate-2",
    title: "Technical Support Fundamentals (Google)",
    description:
      "Archived credential document presented in the same cinematic viewer flow for clean comparison across achievements.",
    fileName: "Certificate2.pdf",
    url: "/certifications/Certificate2.pdf",
    extension: "pdf",
    kind: "pdf",
    group: "certification",
    updatedAt: "Jun 17, 2022",
    sizeLabel: "291 KB",
    issuer: "Credential Archive",
    spotlight: "Foundational Milestone",
  },
  {
    id: "credential-318",
    title: "IJIRCCE CERTIFICATE OF PUBLICATION",
    description:
      "Academic credential PDF from your earlier achievement cycle, preserved with modern preview and download controls.",
    fileName: "318_Elika Ajay.pdf",
    url: "/certifications/318_Elika%20Ajay.pdf",
    extension: "pdf",
    kind: "pdf",
    group: "certification",
    updatedAt: "Nov 18, 2022",
    sizeLabel: "418 KB",
    issuer: "Academic Credential",
    spotlight: "Academic Achievement",
  },
];

export const attachments = attachmentCatalog;

export function getAttachmentById(id: string) {
  return attachments.find((asset) => asset.id === id);
}

export function getAttachmentIds() {
  return attachments.map((asset) => asset.id);
}

export function getCertificationAttachments() {
  return attachments.filter((asset) => asset.group === "certification");
}
