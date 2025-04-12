// components/layout/ConditionalLayout.tsx
'use client';

import { usePathname } from 'next/navigation';
import AppLayout from './AppLayout';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // List of auth-related paths
  const authPaths = ['/login', '/register', '/forgot-password', '/reset-password', '/'];
  
  // Check if current path is an auth path
  const isAuthPage = authPaths.some(path => pathname === path || pathname.startsWith(`${path}/`));
  
  if (isAuthPage) {
    return <>{children}</>;
  }
  
  return <AppLayout>{children}</AppLayout>;
}