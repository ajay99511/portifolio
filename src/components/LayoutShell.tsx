"use client";

import { type ReactNode } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import { FEATURES } from "@/lib/features";

const CustomCursor = dynamic(
  () => import("@/components/CustomCursor"),
  { ssr: false }
);

interface LayoutShellProps {
  children: ReactNode;
}

export default function LayoutShell({ children }: LayoutShellProps) {
  return (
    <>
      {FEATURES.enableCustomCursor && <CustomCursor />}
      <Navbar />
      {children}
    </>
  );
}
