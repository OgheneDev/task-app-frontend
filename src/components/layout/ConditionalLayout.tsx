// components/layout/ConditionalLayout.tsx
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePathname } from "next/navigation";
import AppLayout from "./AppLayout";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const checkAuth = useAuthStore((state) => state.checkAuth);

  // Initialize auth check on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Auth pages don't need the app layout
  const authPaths = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/",
  ];
  const isAuthPage = authPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (isAuthPage) {
    return <>{children}</>;
  }

  return <AppLayout>{children}</AppLayout>;
}
