'use client';

import { Sparkles } from 'lucide-react';
import { useActivePersona } from '@/lib/persona';
import { tenant } from '@/lib/mock-data';

export function WelcomeHeader() {
  const persona = useActivePersona();
  return (
    <header className="flex items-end justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          Welcome back, {persona.firstName}
        </h1>
        <p className="text-xs text-foreground-muted mt-1">
          {tenant.name} · 3 deployments in the last 7 days · 1 app awaiting your action
        </p>
      </div>
      <button
        type="button"
        className="h-8 px-3 rounded-md bg-purple/15 text-purple hover:bg-purple/20 transition-colors text-xs font-medium flex items-center gap-1.5"
      >
        <Sparkles className="size-3.5" />
        Ask Helper
      </button>
    </header>
  );
}
