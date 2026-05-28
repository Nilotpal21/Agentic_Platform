'use client';

import { useMemo, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  Download,
  Search,
  MoreHorizontal,
  X,
  FileText,
  Bot,
  CheckCircle2,
  Rocket,
  GitPullRequestArrow,
  Sparkles,
  ShieldAlert,
  Database,
  Cpu,
  KeyRound,
  type LucideIcon,
} from 'lucide-react';
import { auditEntries, type AuditCategory, type AuditEntry } from '@/lib/mock-data';
import { Footer } from '@/components/shell/Footer';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const CATEGORIES: AuditCategory[] = [
  'SOP',
  'App',
  'Approval',
  'Deployment',
  'Evaluation',
  'Helper',
  'Guardrail',
  'Knowledge',
  'Model',
  'Access',
];

const categoryIcon: Record<AuditCategory, LucideIcon> = {
  SOP: FileText,
  App: Bot,
  Approval: CheckCircle2,
  Deployment: Rocket,
  Evaluation: GitPullRequestArrow,
  Helper: Sparkles,
  Guardrail: ShieldAlert,
  Knowledge: Database,
  Model: Cpu,
  Access: KeyRound,
};

const categoryCls: Record<AuditCategory, string> = {
  SOP: 'text-foreground-muted',
  App: 'text-foreground-muted',
  Approval: 'text-success',
  Deployment: 'text-success',
  Evaluation: 'text-info',
  Helper: 'text-purple',
  Guardrail: 'text-warning',
  Knowledge: 'text-info',
  Model: 'text-foreground-muted',
  Access: 'text-foreground-muted',
};

function formatTimestamp(ts: string): string {
  const d = new Date(ts);
  const date = d.toISOString().slice(0, 10);
  const time = d.toISOString().slice(11, 19);
  return `${date} ${time}`;
}

export default function AuditPage() {
  const [activeCategories, setActiveCategories] = useState<Set<AuditCategory>>(new Set());
  const [actor, setActor] = useState('');
  const [selected, setSelected] = useState<AuditEntry | null>(null);
  const [limit, setLimit] = useState(20);

  const filtered = useMemo(() => {
    return auditEntries.filter((e) => {
      if (activeCategories.size > 0 && !activeCategories.has(e.category)) return false;
      if (actor && !e.actorName.toLowerCase().includes(actor.toLowerCase())) return false;
      return true;
    });
  }, [activeCategories, actor]);

  const visible = filtered.slice(0, limit);

  const toggleCategory = (c: AuditCategory) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  return (
    <div className="space-y-5">
      <header className="pb-4 border-b border-border-muted">
        <h1 className="text-2xl font-semibold tracking-tight">Audit log</h1>
        <p className="text-xs text-foreground-muted mt-1.5">
          Immutable record of every action across SOPs, apps, approvals, deployments, evaluations,
          Helper, guardrails, knowledge, models, and access.
        </p>
      </header>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((c) => {
            const Icon = categoryIcon[c];
            const active = activeCategories.has(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggleCategory(c)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium border transition-colors',
                  active
                    ? 'bg-background-elevated border-border text-foreground'
                    : 'bg-background-muted/40 border-border-muted text-foreground-muted hover:text-foreground',
                )}
              >
                <Icon className={cn('size-3', active && categoryCls[c])} />
                {c}
              </button>
            );
          })}
          {activeCategories.size > 0 && (
            <button
              type="button"
              onClick={() => setActiveCategories(new Set())}
              className="text-[11px] text-foreground-subtle hover:text-foreground-muted transition-colors ml-1"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-foreground-subtle pointer-events-none" />
            <input
              value={actor}
              onChange={(e) => setActor(e.target.value)}
              placeholder="Filter by actor (e.g., Rina, system, Demo)"
              className="w-full h-9 bg-background-muted/60 border border-border-muted rounded-md pl-9 pr-3 text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-1 focus:ring-border-focus/40"
            />
          </div>
          <button
            type="button"
            onClick={() => toast.success('Audit log exported to clipboard')}
            className="h-9 px-3 rounded-md text-xs font-medium border border-border-muted text-foreground-muted hover:text-foreground hover:bg-background-elevated transition-colors flex items-center gap-1.5"
          >
            <Download className="size-3.5" />
            Export
          </button>
        </div>
      </section>

      <section className="rounded-lg border border-border-muted bg-background-subtle overflow-hidden">
        <div className="grid grid-cols-[max-content_max-content_max-content_1fr_max-content] items-center gap-3 px-4 py-2.5 border-b border-border-muted text-[10px] uppercase tracking-wide text-foreground-meta font-medium">
          <div>Timestamp</div>
          <div>Actor</div>
          <div>Category</div>
          <div>Summary</div>
          <div></div>
        </div>
        {visible.length === 0 && (
          <p className="px-4 py-12 text-xs text-foreground-muted text-center">
            No entries match your filters.
          </p>
        )}
        {visible.map((e) => {
          const Icon = categoryIcon[e.category];
          return (
            <button
              key={e.id}
              type="button"
              onClick={() => setSelected(e)}
              className="w-full grid grid-cols-[max-content_max-content_max-content_1fr_max-content] items-center gap-3 px-4 py-2.5 border-b last:border-b-0 border-border-muted hover:bg-background-muted/40 transition-colors text-xs text-left"
            >
              <span className="font-mono text-foreground-subtle whitespace-nowrap">
                {formatTimestamp(e.timestamp)}
              </span>
              <span className="text-foreground-muted whitespace-nowrap">
                {e.actorName === 'system' ? (
                  <span className="text-foreground-subtle italic">system</span>
                ) : (
                  e.actorName
                )}
              </span>
              <span
                className={cn(
                  'inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wide font-medium bg-background-elevated',
                  categoryCls[e.category],
                )}
              >
                <Icon className="size-3" />
                {e.category}
              </span>
              <div className="min-w-0">
                <div className="text-foreground truncate">{e.action}</div>
                <div className="text-foreground-subtle truncate text-[11px] font-mono">
                  {e.target}
                </div>
              </div>
              <MoreHorizontal className="size-3.5 text-foreground-subtle" />
            </button>
          );
        })}

        {limit < filtered.length && (
          <div className="px-4 py-3 border-t border-border-muted text-center">
            <button
              type="button"
              onClick={() => setLimit((l) => l + 20)}
              className="text-xs text-foreground-muted hover:text-foreground transition-colors"
            >
              Load more · {filtered.length - limit} remaining
            </button>
          </div>
        )}
      </section>

      <Footer />

      <Dialog.Root open={selected !== null} onOpenChange={(o) => !o && setSelected(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-background/40 backdrop-blur-[2px] animate-fade-in" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[560px] max-w-[100vw] rounded-2xl border border-border bg-background-elevated shadow-2xl p-6 animate-fade-in">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Dialog.Title className="text-base font-semibold tracking-tight">
                  Audit entry
                </Dialog.Title>
                <p className="text-[11px] text-foreground-subtle font-mono mt-0.5">
                  {selected?.id}
                </p>
              </div>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="size-7 rounded-md text-foreground-muted hover:text-foreground hover:bg-background-muted transition-colors flex items-center justify-center"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
              </Dialog.Close>
            </div>
            {selected && <AuditDetail entry={selected} />}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

function AuditDetail({ entry }: { entry: AuditEntry }) {
  return (
    <dl className="space-y-2.5 text-xs">
      <Row label="Timestamp">
        <span className="font-mono">{formatTimestamp(entry.timestamp)}</span>
      </Row>
      <Row label="Actor">
        {entry.actorName === 'system' ? (
          <span className="italic text-foreground-subtle">system</span>
        ) : (
          entry.actorName
        )}
      </Row>
      <Row label="Category">
        <span
          className={cn(
            'inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wide font-medium bg-background-elevated',
            categoryCls[entry.category],
          )}
        >
          {entry.category}
        </span>
      </Row>
      <Row label="Action">{entry.action}</Row>
      <Row label="Target">
        <span className="font-mono text-foreground-muted">{entry.target}</span>
      </Row>
      <Row label="Summary">{entry.summary}</Row>
      {entry.projectId && (
        <Row label="Project">
          <span className="font-mono text-foreground-muted">{entry.projectId}</span>
        </Row>
      )}
      {entry.appId && (
        <Row label="App">
          <span className="font-mono text-foreground-muted">{entry.appId}</span>
        </Row>
      )}
      {entry.payload && (
        <Row label="Payload">
          <pre className="font-mono text-[11px] bg-background-muted/60 border border-border-muted rounded-md p-2 overflow-x-auto">
            {JSON.stringify(entry.payload, null, 2)}
          </pre>
        </Row>
      )}
    </dl>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[max-content_1fr] gap-3">
      <dt className="text-[10px] uppercase tracking-wide text-foreground-meta font-medium pt-0.5">
        {label}
      </dt>
      <dd className="text-foreground">{children}</dd>
    </div>
  );
}
