import { Bot, Database, Shield, Send, type LucideIcon } from 'lucide-react';
import type { SOP } from '@/lib/mock-data';
import { getSubAgentById } from '@/lib/mock-data';

const CHANNEL_LABEL: Record<NonNullable<SOP['selectedChannels'][number]>, string> = {
  digital: 'Digital',
  voice: 'Voice',
  sms: 'SMS',
  email: 'Email',
};

export function AttachedComponentsGrid({ sop }: { sop: SOP }) {
  const subAgentNames = sop.attachedSubAgents
    .map((id) => getSubAgentById(id)?.name ?? id)
    .filter(Boolean);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <Card
        icon={Bot}
        title="Sub-agents"
        count={subAgentNames.length}
        items={subAgentNames}
        rationale="Selected based on the intents and tasks the platform identified in your SOP."
      />
      <Card
        icon={Database}
        title="Knowledge attached"
        count={sop.attachedKnowledge.length}
        items={sop.attachedKnowledge}
        rationale="Combines platform templates with sources from your Knowledge Library."
      />
      <Card
        icon={Shield}
        title="Guardrails applied"
        count={sop.attachedGuardrails.length}
        items={sop.attachedGuardrails}
        rationale="Baseline credit-union guardrails plus SOP-derived custom rules."
      />
      <Card
        icon={Send}
        title="Channels selected"
        count={sop.selectedChannels.length}
        items={sop.selectedChannels.map((c) => CHANNEL_LABEL[c])}
        rationale="Inferred from the SOP. You can change these in Review Studio."
      />
    </div>
  );
}

function Card({
  icon: Icon,
  title,
  count,
  items,
  rationale,
}: {
  icon: LucideIcon;
  title: string;
  count: number;
  items: string[];
  rationale: string;
}) {
  const shown = items.slice(0, 4);
  const overflow = items.length - shown.length;

  return (
    <div className="rounded-lg border border-border-muted bg-background-subtle p-4 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="size-8 rounded-md bg-background-elevated border border-border-muted flex items-center justify-center">
          <Icon className="size-4 text-foreground-muted" />
        </div>
        <span className="text-xl font-semibold tabular-nums">{count}</span>
      </div>
      <div className="text-xs uppercase tracking-wide text-foreground-meta font-medium mb-3">
        {title}
      </div>
      <ul className="space-y-1 flex-1 mb-3">
        {shown.map((item) => (
          <li
            key={item}
            className="text-xs text-foreground-muted truncate"
            title={item}
          >
            · {item}
          </li>
        ))}
        {overflow > 0 && (
          <li className="text-xs text-foreground-subtle">+ {overflow} more</li>
        )}
      </ul>
      <p className="text-[11px] text-foreground-subtle leading-relaxed border-t border-border-muted pt-3">
        {rationale}
      </p>
    </div>
  );
}
