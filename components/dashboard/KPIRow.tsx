import { Bot, MessageSquare, Gauge, ListChecks, type LucideIcon } from 'lucide-react';
import { platformKPIs } from '@/lib/mock-data';

interface KPI {
  label: string;
  value: string;
  delta: string;
  deltaTone: 'success' | 'info' | 'neutral' | 'warning';
  icon: LucideIcon;
}

const kpis: KPI[] = [
  {
    label: 'Active apps',
    value: platformKPIs.activeApps.toString(),
    delta: platformKPIs.activeAppsDelta,
    deltaTone: 'success',
    icon: Bot,
  },
  {
    label: 'Conversations · 24h',
    value: platformKPIs.conversations24h.toLocaleString(),
    delta: platformKPIs.conversations24hDelta,
    deltaTone: 'success',
    icon: MessageSquare,
  },
  {
    label: 'Avg evaluation score',
    value: platformKPIs.avgEvaluationScore.toString(),
    delta: platformKPIs.avgEvaluationScoreDelta,
    deltaTone: 'info',
    icon: Gauge,
  },
  {
    label: 'Tasks completed · 24h',
    value: platformKPIs.tasksCompleted24h.toLocaleString(),
    delta: platformKPIs.tasksCompleted24hOfStarted,
    deltaTone: 'neutral',
    icon: ListChecks,
  },
];

const toneClass: Record<KPI['deltaTone'], string> = {
  success: 'text-success',
  info: 'text-info',
  warning: 'text-warning',
  neutral: 'text-foreground-meta',
};

export function KPIRow() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {kpis.map((k) => {
        const Icon = k.icon;
        return (
          <div
            key={k.label}
            className="rounded-lg border border-border-muted bg-background-subtle p-4 hover:border-border transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-[11px] uppercase tracking-wide text-foreground-meta font-medium">
                {k.label}
              </span>
              <Icon className="size-3.5 text-foreground-subtle" />
            </div>
            <div className="text-2xl font-semibold tabular-nums tracking-tight">{k.value}</div>
            <div className={`text-[11px] mt-1 ${toneClass[k.deltaTone]}`}>{k.delta}</div>
          </div>
        );
      })}
    </div>
  );
}
