'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Legend,
} from 'recharts';
import { Sparkles, AlertTriangle, AlertOctagon, Info } from 'lucide-react';
import { useHelper } from '@/lib/helper-state';
import {
  liveMetrics,
  continuousEvalFindings,
  type ContinuousEvalFinding,
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const APP_COLORS: Record<string, string> = {
  'card-dispute-triage': 'hsl(220 5% 93%)',
  'account-opening-assistant': 'hsl(187 86% 60%)',
};

export function ContinuousEvalPanel() {
  // Build merged 24-hour data
  const data = Array.from({ length: 24 }, (_, h) => {
    const row: Record<string, number | string> = { hour: `${h}:00` };
    for (const m of liveMetrics) {
      row[m.appName] = m.evalScoreByHour[h];
    }
    return row;
  });

  return (
    <section className="rounded-lg border border-border-muted bg-background-subtle overflow-hidden">
      <header className="px-4 py-3 border-b border-border-muted flex items-end justify-between">
        <div>
          <h2 className="text-sm font-semibold">Continuous evaluation</h2>
          <p className="text-xs text-foreground-muted mt-0.5">
            Latest scheduled run · 14 min ago
          </p>
        </div>
      </header>

      <div className="p-4">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid stroke="hsl(220 4% 18%)" strokeDasharray="2 4" vertical={false} />
              <XAxis
                dataKey="hour"
                stroke="hsl(220 2% 55%)"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                interval={3}
              />
              <YAxis
                stroke="hsl(220 2% 55%)"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={32}
                domain={[80, 100]}
              />
              <Tooltip
                contentStyle={{
                  background: 'hsl(220 3% 10%)',
                  border: '1px solid hsl(220 4% 18%)',
                  borderRadius: 6,
                  fontSize: 11,
                  color: 'hsl(220 1% 98%)',
                }}
                labelStyle={{ color: 'hsl(220 2% 64%)' }}
              />
              <ReferenceLine
                y={80}
                stroke="hsl(40 93.4% 47.5% / 0.4)"
                strokeDasharray="3 3"
              />
              <Legend
                verticalAlign="top"
                align="right"
                iconSize={8}
                wrapperStyle={{ fontSize: 11, paddingBottom: 8 }}
              />
              {liveMetrics.map((m) => (
                <Line
                  key={m.appId}
                  type="monotone"
                  dataKey={m.appName}
                  stroke={APP_COLORS[m.appName] ?? 'hsl(220 5% 60%)'}
                  strokeWidth={1.5}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="border-t border-border-muted">
        <div className="px-4 py-2.5 text-[10px] uppercase tracking-wide text-foreground-meta font-medium">
          Findings
        </div>
        {continuousEvalFindings.length === 0 ? (
          <p className="px-4 pb-4 text-xs text-foreground-muted text-center">
            <span className="size-1.5 inline-block rounded-full bg-success mr-1 align-middle" />
            No regressions detected in the last run.
          </p>
        ) : (
          <ul className="divide-y divide-border-muted">
            {continuousEvalFindings.map((f) => (
              <FindingRow key={f.id} finding={f} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function FindingRow({ finding }: { finding: ContinuousEvalFinding }) {
  const openHelper = useHelper((s) => s.open);
  const Icon =
    finding.severity === 'critical'
      ? AlertOctagon
      : finding.severity === 'warning'
        ? AlertTriangle
        : Info;
  const iconCls =
    finding.severity === 'critical'
      ? 'text-error'
      : finding.severity === 'warning'
        ? 'text-warning'
        : 'text-info';

  const handleHelper = () => {
    openHelper({
      kind: 'mission-control',
      label: `Mission Control · ${finding.appName}`,
      appName: finding.appName,
    });
    setTimeout(() => {
      useHelper.getState().ask(`Why has ${finding.title.toLowerCase()}?`);
    }, 50);
  };

  return (
    <li className="px-4 py-3 grid grid-cols-[auto_1fr_auto] items-start gap-3">
      <Icon className={cn('size-3.5 shrink-0 mt-0.5', iconCls)} />
      <div className="min-w-0">
        <div className="text-xs text-foreground">{finding.title}</div>
        <div className="text-[11px] text-foreground-muted mt-1 leading-snug">{finding.detail}</div>
        <div className="text-[11px] text-foreground-subtle mt-1 font-mono">
          {finding.appName} · {finding.examplesCount} examples · {finding.ago}
        </div>
      </div>
      <button
        type="button"
        onClick={handleHelper}
        className="h-7 px-2.5 rounded-md text-[11px] font-medium bg-purple/15 text-purple hover:bg-purple/20 transition-colors flex items-center gap-1 whitespace-nowrap"
      >
        <Sparkles className="size-3" />
        Open in Helper
      </button>
    </li>
  );
}
