'use client';

import { useState, type ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  X,
  Sparkles,
  Check,
  ArrowDown,
  Download,
  Trash2,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner';
import { kindShortLabel, type MarketplaceItem } from '@/lib/mock-data';
import { useHelper } from '@/lib/helper-state';
import { kindIcon, kindStyle } from './ItemCard';
import { cn } from '@/lib/utils';

export function ItemDetailSheet({
  item,
  open,
  onOpenChange,
}: {
  item: MarketplaceItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [installState, setInstallState] = useState<
    'idle' | 'installing' | 'installed'
  >('idle');
  const openHelper = useHelper((s) => s.open);

  if (!item) return null;
  const Icon = kindIcon[item.kind];
  const style = kindStyle[item.kind];
  const installed = item.installed || installState === 'installed';

  const handleInstall = () => {
    setInstallState('installing');
    setTimeout(() => {
      setInstallState('installed');
      toast.success(`Installed "${item.name}"`, {
        description: 'Attach it to apps from the Review Studio.',
      });
    }, 1500);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-background/40 backdrop-blur-[2px] animate-fade-in" />
        <Dialog.Content className="fixed top-0 right-0 z-50 h-screen w-[620px] max-w-[100vw] bg-background-elevated border-l border-border shadow-2xl flex flex-col animate-fade-in">
          <header className="flex items-start justify-between gap-2 px-5 py-4 border-b border-border-muted shrink-0">
            <div className="flex items-start gap-3 min-w-0">
              <div
                className={cn(
                  'size-12 rounded-md border flex items-center justify-center shrink-0',
                  style.iconBg,
                )}
              >
                <Icon className={cn('size-6', style.iconText)} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap mb-1">
                  <span
                    className={cn(
                      'inline-flex items-center text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wide font-medium',
                      style.bg,
                      style.text,
                    )}
                  >
                    {kindShortLabel[item.kind]}
                  </span>
                  <span className="text-[10px] text-foreground-subtle">·</span>
                  <span className="text-[10px] text-foreground-subtle">{item.category}</span>
                </div>
                <Dialog.Title className="text-base font-semibold tracking-tight">
                  {item.name}
                </Dialog.Title>
                <p className="text-[11px] text-foreground-muted font-mono mt-0.5">
                  v{item.version} · curated by Platform Team · {item.installedByCount} CUs · ★{' '}
                  {item.rating.toFixed(1)}
                </p>
              </div>
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
          </header>

          <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-4 space-y-5">
            <p className="text-sm text-foreground leading-relaxed">{item.longDescription}</p>

            <Panel title="What's included">
              <ul className="space-y-1.5">
                {item.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-xs text-foreground"
                  >
                    <Check className="size-3.5 text-success shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title="Changelog">
              <ul className="space-y-2">
                {item.changelog.map((c) => (
                  <li key={c.version} className="text-xs">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-foreground">v{c.version}</span>
                      <span className="text-foreground-subtle">·</span>
                      <span className="text-foreground-subtle inline-flex items-center gap-1">
                        <Calendar className="size-3" />
                        {c.date}
                      </span>
                    </div>
                    <div className="text-foreground-muted leading-relaxed">{c.notes}</div>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title="Requirements">
              <ul className="space-y-1 text-xs text-foreground-muted">
                <li>· Platform v3.0 or later</li>
                <li>· No conflicting items currently installed</li>
                <li>· Tenant-wide install requires CU Admin approval</li>
              </ul>
            </Panel>

            <div className="rounded-md border border-purple/20 bg-purple/5 p-3 flex items-start gap-2">
              <Sparkles className="size-3.5 text-purple shrink-0 mt-0.5" />
              <div className="text-xs">
                <div className="text-foreground">
                  Want me to walk you through how this fits into your existing apps?
                </div>
                <button
                  type="button"
                  onClick={() => {
                    openHelper({
                      kind: 'general',
                      label: `Marketplace · ${item.name}`,
                    });
                    setTimeout(() => {
                      useHelper.getState().ask(`Tell me about the ${item.name} marketplace item.`);
                    }, 50);
                  }}
                  className="mt-2 h-7 px-2.5 rounded-md text-[11px] font-medium bg-purple text-purple-foreground hover:bg-purple/85 transition-colors"
                >
                  Open in Helper
                </button>
              </div>
            </div>
          </div>

          <footer className="border-t border-border-muted px-5 py-3 shrink-0 flex items-center justify-between gap-2">
            {installed ? (
              <>
                <button
                  type="button"
                  onClick={() => toast.success(`"${item.name}" uninstalled`)}
                  className="h-9 px-3 rounded-md text-xs font-medium text-foreground-muted hover:text-error hover:bg-error-subtle transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="size-3.5" />
                  Uninstall
                </button>
                {item.updateAvailable ? (
                  <button
                    type="button"
                    onClick={() => toast.success(`"${item.name}" updated to v${item.version}`)}
                    className="h-9 px-3.5 rounded-md text-xs font-medium bg-info text-info-foreground hover:bg-info/85 transition-colors flex items-center gap-1.5"
                  >
                    <ArrowDown className="size-3.5" />
                    Update to v{item.version}
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-success">
                    <Check className="size-3.5" />
                    Installed
                  </span>
                )}
              </>
            ) : (
              <>
                <select
                  className="h-9 bg-background-muted/60 border border-border-muted rounded-md px-2 text-xs focus:outline-none focus:ring-1 focus:ring-border-focus/40"
                  defaultValue="active-project"
                >
                  <option value="active-project">Install into active project</option>
                  <option value="tenant">Install tenant-wide (CU Admin)</option>
                  <option value="select-project">Install into another project…</option>
                </select>
                <button
                  type="button"
                  onClick={handleInstall}
                  disabled={installState === 'installing'}
                  className="h-9 px-3.5 rounded-md text-xs font-medium bg-accent text-accent-foreground hover:bg-accent-muted transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="size-3.5" />
                  {installState === 'installing' ? 'Installing…' : 'Install'}
                </button>
              </>
            )}
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <div className="text-[10px] uppercase tracking-wide text-foreground-meta font-medium mb-2">
        {title}
      </div>
      {children}
    </section>
  );
}
