'use client';

import { useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Check,
  type LucideIcon,
} from 'lucide-react';
import type { SOPFlag, FlagSeverity } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const severityStyle: Record<
  FlagSeverity,
  { icon: LucideIcon; iconClass: string; bg: string; label: string }
> = {
  blocker: {
    icon: AlertOctagon,
    iconClass: 'text-error',
    bg: 'bg-error-subtle',
    label: 'Blocker',
  },
  warning: {
    icon: AlertTriangle,
    iconClass: 'text-warning',
    bg: 'bg-warning-subtle',
    label: 'Warning',
  },
  suggestion: {
    icon: Lightbulb,
    iconClass: 'text-info',
    bg: 'bg-info-subtle',
    label: 'Suggestion',
  },
};

export function QualityCheckFlags({ flags }: { flags: SOPFlag[] }) {
  const [acked, setAcked] = useState<Set<string>>(
    new Set(flags.filter((f) => f.acknowledged).map((f) => f.id)),
  );

  const active = flags.filter((f) => !acked.has(f.id));
  const acknowledged = flags.filter((f) => acked.has(f.id));

  const counts = {
    blocker: flags.filter((f) => f.severity === 'blocker' && !acked.has(f.id)).length,
    warning: flags.filter((f) => f.severity === 'warning' && !acked.has(f.id)).length,
    suggestion: flags.filter((f) => f.severity === 'suggestion' && !acked.has(f.id)).length,
    acknowledged: acknowledged.length,
  };

  const acknowledge = (id: string) => setAcked((prev) => new Set(prev).add(id));

  return (
    <section className="rounded-lg border border-border-muted bg-background-subtle overflow-hidden">
      <div className="flex items-start justify-between px-5 py-4 border-b border-border-muted">
        <div>
          <h2 className="text-sm font-semibold">What we flagged in your SOP</h2>
          <p className="text-xs text-foreground-muted mt-1 max-w-2xl leading-relaxed">
            We only flag safety and compliance issues. We never propose changes to process
            content.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <FlagCount
            icon={AlertOctagon}
            count={counts.blocker}
            iconClass="text-error"
            label="Blockers"
          />
          <FlagCount
            icon={AlertTriangle}
            count={counts.warning}
            iconClass="text-warning"
            label="Warnings"
          />
          <FlagCount
            icon={Lightbulb}
            count={counts.suggestion}
            iconClass="text-info"
            label="Suggestions"
          />
        </div>
      </div>

      <div className="divide-y divide-border-muted">
        {active.length === 0 && (
          <p className="px-5 py-8 text-xs text-foreground-muted text-center">
            All flags acknowledged.
          </p>
        )}
        {active.map((f) => {
          const s = severityStyle[f.severity];
          const Icon = s.icon;
          return (
            <div key={f.id} className="px-5 py-4">
              <div className="flex items-start gap-3">
                <div className={cn('size-7 rounded-md flex items-center justify-center shrink-0', s.bg)}>
                  <Icon className={cn('size-4', s.iconClass)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={cn('text-[10px] uppercase tracking-wide font-medium', s.iconClass)}>
                      {s.label}
                    </span>
                  </div>
                  <div className="text-sm font-medium mb-2">{f.title}</div>
                  <blockquote className="text-xs text-foreground-muted font-mono bg-background-muted/60 border-l-2 border-border rounded-r px-3 py-2 mb-2">
                    “{f.quotedPassage}”
                  </blockquote>
                  {f.suggestedFix && (
                    <p className="text-[11px] text-foreground-subtle leading-relaxed mb-3">
                      <span className="text-foreground-meta">Suggested fix: </span>
                      {f.suggestedFix}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => acknowledge(f.id)}
                      className="h-7 px-2.5 rounded-md text-[11px] font-medium border border-border-muted text-foreground-muted hover:bg-background-elevated hover:text-foreground transition-colors"
                    >
                      Acknowledge
                    </button>
                    <button
                      type="button"
                      className="h-7 px-2.5 rounded-md text-[11px] font-medium bg-purple/15 text-purple hover:bg-purple/20 transition-colors flex items-center gap-1"
                    >
                      <Sparkles className="size-3" />
                      Discuss with Helper
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {acknowledged.length > 0 && (
        <details className="border-t border-border-muted">
          <summary className="px-5 py-3 text-xs text-foreground-muted cursor-pointer hover:text-foreground transition-colors flex items-center gap-1.5">
            <Check className="size-3.5" />
            Acknowledged ({acknowledged.length})
          </summary>
          <div className="px-5 pb-4 space-y-2">
            {acknowledged.map((f) => (
              <div
                key={f.id}
                className="text-xs text-foreground-subtle pl-6"
                title={f.quotedPassage}
              >
                · {f.title}
              </div>
            ))}
          </div>
        </details>
      )}
    </section>
  );
}

function FlagCount({
  icon: Icon,
  count,
  iconClass,
  label,
}: {
  icon: LucideIcon;
  count: number;
  iconClass: string;
  label: string;
}) {
  return (
    <div
      className="flex items-center gap-1 px-2 py-1 rounded-md bg-background-muted/60 text-[11px] font-mono tabular-nums"
      title={label}
    >
      <Icon className={cn('size-3', iconClass)} />
      <span className="text-foreground">{count}</span>
    </div>
  );
}
