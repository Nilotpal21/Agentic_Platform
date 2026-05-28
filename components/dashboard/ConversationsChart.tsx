'use client';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { conversationsByHour } from '@/lib/mock-data';

export function ConversationsChart() {
  return (
    <section className="rounded-lg border border-border-muted bg-background-subtle p-4">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold">Conversations · last 12 hours</h2>
          <p className="text-xs text-foreground-muted mt-0.5">
            All deployed apps · success / escalated / failed
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <Legend color="hsl(var(--success))" label="Success" />
          <Legend color="hsl(var(--warning))" label="Escalated" />
          <Legend color="hsl(var(--error))" label="Failed" />
        </div>
      </div>

      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={conversationsByHour}
            margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
          >
            <defs>
              <linearGradient id="cg-success" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(142.1 76.2% 40%)" stopOpacity={0.45} />
                <stop offset="100%" stopColor="hsl(142.1 76.2% 40%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="cg-escalated" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(40 93.4% 47.5%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(40 93.4% 47.5%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="cg-failed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0 72.2% 50.6%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(0 72.2% 50.6%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="hsl(220 4% 18%)" strokeDasharray="2 4" vertical={false} />
            <XAxis
              dataKey="hour"
              stroke="hsl(220 2% 55%)"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(220 2% 55%)"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              width={36}
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
              cursor={{ stroke: 'hsl(220 4% 18%)', strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="success"
              stackId="1"
              stroke="hsl(142.1 76.2% 45%)"
              strokeWidth={1.5}
              fill="url(#cg-success)"
            />
            <Area
              type="monotone"
              dataKey="escalated"
              stackId="1"
              stroke="hsl(40 93.4% 50%)"
              strokeWidth={1.5}
              fill="url(#cg-escalated)"
            />
            <Area
              type="monotone"
              dataKey="failed"
              stackId="1"
              stroke="hsl(0 72.2% 55%)"
              strokeWidth={1.5}
              fill="url(#cg-failed)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-foreground-muted">
      <span className="size-2 rounded-sm" style={{ background: color }} />
      {label}
    </span>
  );
}
