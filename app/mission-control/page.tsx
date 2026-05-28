import { liveMetrics, driftAlerts } from '@/lib/mock-data';
import { StatusStrip } from '@/components/mission-control/StatusStrip';
import { PerAppCard } from '@/components/mission-control/PerAppCard';
import { ContinuousEvalPanel } from '@/components/mission-control/ContinuousEvalPanel';
import { LiveStream } from '@/components/mission-control/LiveStream';
import { Footer } from '@/components/shell/Footer';
import { AlertTriangle, AlertOctagon, Info, RotateCw, Power } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MissionControlPage() {
  return (
    <div className="space-y-5">
      <header className="flex items-end justify-between gap-3 pb-4 border-b border-border-muted">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Mission Control</h1>
          <p className="text-xs text-foreground-muted mt-1.5">
            Live operations across deployed apps · continuous evaluation · drift &amp; regression
            alerts
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center gap-0.5 p-0.5 rounded-md bg-background-muted/60">
            {['Live', '1h', '24h', '7d'].map((r, i) => (
              <button
                key={r}
                type="button"
                className={cn(
                  'px-2 py-1 rounded text-[10px] font-medium transition-colors',
                  i === 2
                    ? 'bg-background-elevated text-foreground'
                    : 'text-foreground-muted hover:text-foreground',
                )}
              >
                {r}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="size-8 rounded-md border border-border-muted text-foreground-muted hover:text-foreground hover:bg-background-elevated transition-colors flex items-center justify-center"
            aria-label="Refresh"
          >
            <RotateCw className="size-3.5" />
          </button>
          <button
            type="button"
            className="h-8 px-3 rounded-md text-xs font-medium border border-error/30 text-error hover:bg-error-subtle transition-colors flex items-center gap-1.5"
          >
            <Power className="size-3.5" />
            Kill switches
          </button>
        </div>
      </header>

      <StatusStrip />

      <div>
        <h2 className="text-sm font-semibold mb-3">Deployed apps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {liveMetrics.map((m) => (
            <PerAppCard key={m.appId} metrics={m} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
        <ContinuousEvalPanel />
        <DriftAlertsPanel />
      </div>

      <LiveStream />

      <Footer />
    </div>
  );
}

function DriftAlertsPanel() {
  return (
    <section className="rounded-lg border border-border-muted bg-background-subtle overflow-hidden">
      <header className="px-4 py-3 border-b border-border-muted">
        <h2 className="text-sm font-semibold">Drift &amp; alerts</h2>
        <p className="text-xs text-foreground-muted mt-0.5">
          Above your tenant&apos;s threshold
        </p>
      </header>
      <div className="divide-y divide-border-muted">
        {driftAlerts.length === 0 ? (
          <p className="px-4 py-6 text-xs text-foreground-muted text-center">
            <span className="size-1.5 inline-block rounded-full bg-success mr-1 align-middle" />
            No active drift alerts.
          </p>
        ) : (
          driftAlerts.map((a) => {
            const Icon =
              a.severity === 'critical'
                ? AlertOctagon
                : a.severity === 'warning'
                  ? AlertTriangle
                  : Info;
            const iconCls =
              a.severity === 'critical'
                ? 'text-error'
                : a.severity === 'warning'
                  ? 'text-warning'
                  : 'text-info';
            return (
              <div key={a.id} className="px-4 py-3 grid grid-cols-[auto_1fr] gap-2.5">
                <Icon className={cn('size-3.5 shrink-0 mt-0.5', iconCls)} />
                <div className="min-w-0">
                  <div className="text-xs text-foreground">{a.title}</div>
                  <div className="text-[11px] text-foreground-subtle font-mono mt-0.5">
                    {a.appName} · {a.delta}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      className="h-6 px-2 rounded text-[10px] font-medium border border-border-muted text-foreground-muted hover:text-foreground hover:bg-background-elevated transition-colors"
                    >
                      Acknowledge
                    </button>
                    <span className="text-[11px] text-foreground-subtle">{a.ago}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="px-4 py-2 border-t border-border-muted text-[11px] text-foreground-subtle">
        Adjust thresholds in tenant settings →
      </div>
    </section>
  );
}
