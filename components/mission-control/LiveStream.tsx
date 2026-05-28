'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ListChecks, type LucideIcon } from 'lucide-react';
import {
  initialStreamEvents,
  generateStreamEvent,
  type StreamEvent,
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const outcomeStyle: Record<StreamEvent['outcome'], { icon: LucideIcon; cls: string }> = {
  Completed: { icon: CheckCircle2, cls: 'text-success' },
  'Task created': { icon: ListChecks, cls: 'text-info' },
  Escalated: { icon: AlertTriangle, cls: 'text-warning' },
  Failed: { icon: XCircle, cls: 'text-error' },
};

export function LiveStream() {
  const [events, setEvents] = useState<StreamEvent[]>(initialStreamEvents);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(
      () => {
        setEvents((prev) => [generateStreamEvent(), ...prev].slice(0, 25));
      },
      3500 + Math.random() * 2500,
    );
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section className="rounded-lg border border-border-muted bg-background-subtle overflow-hidden">
      <header className="px-4 py-3 border-b border-border-muted flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold flex items-center gap-2">
            Live conversations
            {!paused && (
              <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-success font-medium">
                <span className="size-1.5 rounded-full bg-success animate-pulse" />
                Live
              </span>
            )}
          </h2>
          <p className="text-xs text-foreground-muted mt-0.5">
            Streaming · most recent {events.length} events
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="h-7 px-2.5 rounded-md text-[11px] font-medium border border-border-muted text-foreground-muted hover:text-foreground hover:bg-background-elevated transition-colors"
        >
          {paused ? 'Resume' : 'Pause'}
        </button>
      </header>
      <div className="max-h-[380px] overflow-y-auto scrollbar-thin divide-y divide-border-muted">
        {events.map((e, i) => {
          const s = outcomeStyle[e.outcome];
          const Icon = s.icon;
          return (
            <div
              key={e.id}
              className={cn(
                'px-4 py-2.5 grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-3 text-xs',
                i === 0 && 'animate-fade-in bg-background-muted/30',
              )}
            >
              <Icon className={cn('size-3.5 shrink-0', s.cls)} />
              <span className="font-mono text-foreground-muted truncate">{e.appName}</span>
              <span className={cn('text-[11px] font-medium whitespace-nowrap', s.cls)}>
                {e.outcome}
              </span>
              <span className="font-mono tabular-nums text-foreground-subtle text-[11px] whitespace-nowrap">
                {fmtDuration(e.durationMs)}
              </span>
              <span className="font-mono text-foreground-subtle text-[11px] whitespace-nowrap">
                {e.ago}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function fmtDuration(ms: number): string {
  if (ms === 0) return '—';
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}
