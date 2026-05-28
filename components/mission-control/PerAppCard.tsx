'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Power, Bot, MessageSquare, Phone } from 'lucide-react';
import { toast } from 'sonner';
import type { AppLiveMetrics } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export function PerAppCard({ metrics }: { metrics: AppLiveMetrics }) {
  const [paused, setPaused] = useState(metrics.killSwitchActive);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleConfirm = () => {
    setPaused((p) => !p);
    setDialogOpen(false);
    toast.success(
      paused
        ? `${metrics.appName} resumed. Conversations will resume within seconds.`
        : `${metrics.appName} paused. New conversations will fail over.`,
    );
  };

  const data = metrics.conversationsByHour.map((v, i) => ({
    hour: `${i}`,
    conversations: v,
    score: metrics.evalScoreByHour[i],
  }));

  const scoreCls =
    metrics.evaluationScore >= 90
      ? 'text-success'
      : metrics.evaluationScore >= 75
        ? 'text-warning'
        : 'text-error';

  return (
    <section
      className={cn(
        'rounded-lg border bg-background-subtle p-4 flex flex-col gap-3 transition-colors',
        paused ? 'border-warning/30 opacity-70' : 'border-border-muted',
      )}
    >
      <header className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="size-7 rounded-md bg-background-elevated border border-border-muted flex items-center justify-center shrink-0">
            <Bot className="size-3.5 text-foreground-muted" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-mono truncate">{metrics.appName}</div>
            <div className="text-[10px] uppercase tracking-wide text-foreground-meta">
              {paused ? 'Paused' : 'Deployed'}
            </div>
          </div>
        </div>
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              className={cn(
                'size-7 rounded-md transition-colors flex items-center justify-center',
                paused
                  ? 'bg-success-subtle text-success hover:bg-success/15'
                  : 'text-foreground-muted hover:text-error hover:bg-error-subtle',
              )}
              aria-label={paused ? 'Resume app' : 'Kill switch'}
              title={paused ? 'Resume app' : 'Kill switch'}
            >
              <Power className="size-3.5" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-40 bg-background/40 backdrop-blur-[2px] animate-fade-in" />
            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[440px] max-w-[100vw] rounded-2xl border border-border bg-background-elevated shadow-2xl p-6 animate-fade-in">
              <Dialog.Title className="text-base font-semibold tracking-tight mb-1.5">
                {paused ? 'Resume' : 'Pause'} <span className="font-mono">{metrics.appName}</span>?
              </Dialog.Title>
              <Dialog.Description className="text-xs text-foreground-muted mb-4">
                {paused
                  ? 'New conversations will resume within seconds.'
                  : 'New conversations will fail over within seconds. In-flight conversations will complete.'}
              </Dialog.Description>
              <div className="flex items-center justify-end gap-2">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="h-8 px-3 rounded-md text-xs font-medium text-foreground-muted hover:text-foreground hover:bg-background-muted transition-colors"
                  >
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className={cn(
                    'h-8 px-3.5 rounded-md text-xs font-medium transition-colors',
                    paused
                      ? 'bg-success text-success-foreground hover:bg-success/85'
                      : 'bg-error text-error-foreground hover:bg-error/85',
                  )}
                >
                  {paused ? 'Resume' : 'Pause'}
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </header>

      <div className="grid grid-cols-4 gap-2">
        <Mini label="Conv 24h" value={metrics.conversations24h.toLocaleString()} />
        <Mini label="Success" value={`${metrics.successRate}%`} />
        <Mini label="Avg" value={`${metrics.avgLatencyMs}ms`} />
        <Mini label="Escalations" value={metrics.escalations24h.toString()} />
      </div>

      <div className="rounded-md bg-background-muted/40 p-2">
        <div className="flex items-center justify-between text-[10px] text-foreground-meta uppercase tracking-wide font-medium mb-1">
          <span>Conversations · last 24h</span>
          <span className={cn('font-mono tabular-nums', scoreCls)}>
            eval {metrics.evaluationScore}
          </span>
        </div>
        <div className="h-16">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
              <defs>
                <linearGradient id={`spark-${metrics.appId}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(220 5% 93%)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="hsl(220 5% 93%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="hour" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: 'hsl(220 3% 10%)',
                  border: '1px solid hsl(220 4% 18%)',
                  borderRadius: 6,
                  fontSize: 10,
                  color: 'hsl(220 1% 98%)',
                }}
                labelFormatter={(h) => `Hour ${h}`}
              />
              <Area
                type="monotone"
                dataKey="conversations"
                stroke="hsl(220 5% 93%)"
                strokeWidth={1.5}
                fill={`url(#spark-${metrics.appId})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-foreground-muted">
        <span className="inline-flex items-center gap-1">
          <MessageSquare className="size-3 text-foreground-subtle" />
          Digital
        </span>
        <span className="inline-flex items-center gap-1">
          <Phone className="size-3 text-foreground-subtle" />
          Voice
        </span>
      </div>
    </section>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wide text-foreground-meta">{label}</div>
      <div className="text-xs font-semibold tabular-nums mt-0.5 font-mono">{value}</div>
    </div>
  );
}
