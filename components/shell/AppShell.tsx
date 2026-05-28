'use client';

import type { ReactNode } from 'react';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';
import { FloatingHelperButton } from '@/components/helper/FloatingHelperButton';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Topbar />
      <div className="flex-1 flex min-h-0">
        <Sidebar />
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-[1400px] mx-auto px-6 py-6 animate-fade-in">{children}</div>
        </main>
      </div>
      <FloatingHelperButton />
    </div>
  );
}
