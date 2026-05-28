import { Activity, MessageSquare, CheckCircle2, AlertTriangle, ShieldAlert, Gauge } from 'lucide-react';
import { tenantStatusStrip } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export function StatusStrip() {
  const s = tenantStatusStrip;
  return (
    <section className="rounded-lg border border-border-muted bg-background-subtle p-4 grid grid-cols-2 md:grid-cols-6 gap-3">
      <StatusCell icon={Activity} label="Apps deployed" value={s.appsDeployed.toString()} ok />
      <StatusCell icon={MessageSquare} label="Conv · 24h" value={s.conversations24h.toLocaleString()} ok />
      <StatusCell
        icon={CheckCircle2}
        label="Success rate"
        value={`${s.successRateLive}%`}
        ok
      />
      <StatusCell
        icon={AlertTriangle}
        label="Drift alerts"
        value={s.driftAlerts.toString()}
        ok={s.driftAlerts === 0}
        warn={s.driftAlerts > 0}
      />
      <StatusCell
        icon={ShieldAlert}
        label="Guardrails · 24h"
        value={s.guardrailTriggers24h.toString()}
        ok
      />
      <StatusCell
        icon={Gauge}
        label="Avg latency"
        value={`${s.avgLatencyMs}ms`}
        sub={`p95 ${s.p95LatencyMs}ms`}
        ok
      />
    </section>
  );
}

function StatusCell({
  icon: Icon,
  label,
  value,
  sub,
  ok,
  warn,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
  sub?: string;
  ok?: boolean;
  warn?: boolean;
}) {
  const dotCls = warn ? 'bg-warning' : ok ? 'bg-success' : 'bg-foreground-subtle';
  return (
    <div className="flex items-start gap-2 min-w-0">
      <span className={cn('size-1.5 rounded-full mt-1.5 shrink-0', dotCls)} />
      <Icon className="size-3.5 text-foreground-subtle mt-0.5 shrink-0" />
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wide text-foreground-meta font-medium">
          {label}
        </div>
        <div className="text-sm font-semibold tabular-nums tracking-tight">{value}</div>
        {sub && <div className="text-[11px] text-foreground-subtle font-mono">{sub}</div>}
      </div>
    </div>
  );
}
