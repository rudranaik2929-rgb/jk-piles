"use client";

import { Toaster } from "@/components/ui/toast";

export function AppToaster({ children }: { children: React.ReactNode }) {
  return <Toaster>{children}</Toaster>;
}
