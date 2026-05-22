"use client";

import { type ReactNode } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";

const CustomCursor = dynamic(
  () => import("@/components/ui/CustomCursor"),
  { ssr: false }
);

interface LayoutShellProps {
  children: ReactNode;
}

export default function LayoutShell({ children }: LayoutShellProps) {
  return (
    <>
      <CustomCursor />
      <Navbar />
      {children}
    </>
  );
}
