'use client';

// import { SessionProvider } from 'next-auth/react';
import { GlobalProvider } from "@/contexts/GlobalProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // <SessionProvider>
      <GlobalProvider>
        {children}
      </GlobalProvider>
    // </SessionProvider>;
  )
} 