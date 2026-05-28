'use client';

import {
  FileStack,
  Bot,
  Wrench,
  Database,
  Shield,
  GitPullRequestArrow,
  Check,
  ArrowDown,
  type LucideIcon,
} from 'lucide-react';
import {
  kindShortLabel,
  type MarketplaceItem,
  type MarketplaceKind,
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const kindIcon: Record<MarketplaceKind, LucideIcon> = {
  template: FileStack,
  sub_agent: Bot,
  skill: Wrench,
  knowledge_pack: Database,
  guardrail_pack: Shield,
  evaluation_pack: GitPullRequestArrow,
};

const kindStyle: Record<
  MarketplaceKind,
  { bg: string; text: string; iconBg: string; iconText: string }
> = {
  template: {
    bg: 'bg-purple/15',
    text: 'text-purple',
    iconBg: 'bg-purple/15 border-purple/30',
    iconText: 'text-purple',
  },
  sub_agent: {
    bg: 'bg-info-subtle',
    text: 'text-info',
    iconBg: 'bg-info-subtle border-info/30',
    iconText: 'text-info',
  },
  skill: {
    bg: 'bg-background-elevated',
    text: 'text-foreground-muted',
    iconBg: 'bg-background-elevated border-border',
    iconText: 'text-foreground-muted',
  },
  knowledge_pack: {
    bg: 'bg-success-subtle',
    text: 'text-success',
    iconBg: 'bg-success-subtle border-success/30',
    iconText: 'text-success',
  },
  guardrail_pack: {
    bg: 'bg-warning-subtle',
    text: 'text-warning',
    iconBg: 'bg-warning-subtle border-warning/30',
    iconText: 'text-warning',
  },
  evaluation_pack: {
    bg: 'bg-orange/15',
    text: 'text-orange',
    iconBg: 'bg-orange/15 border-orange/30',
    iconText: 'text-orange',
  },
};

export function ItemCard({
  item,
  featured,
  onClick,
}: {
  item: MarketplaceItem;
  featured?: boolean;
  onClick: () => void;
}) {
  const Icon = kindIcon[item.kind];
  const style = kindStyle[item.kind];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'text-left rounded-lg border border-border-muted bg-background-subtle hover:border-border hover:bg-background-muted/40 transition-colors p-4 flex flex-col gap-3',
        featured && 'p-5',
      )}
    >
      <header className="flex items-start gap-3">
        <div
          className={cn(
            'size-10 rounded-md border flex items-center justify-center shrink-0',
            style.iconBg,
            featured && 'size-12',
          )}
        >
          <Icon className={cn('size-5', style.iconText, featured && 'size-6')} />
        </div>
        <div className="min-w-0 flex-1">
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
            <span className="text-[10px] text-foreground-subtle font-mono">·</span>
            <span className="text-[10px] text-foreground-subtle">{item.category}</span>
          </div>
          <div
            className={cn(
              'font-semibold tracking-tight truncate',
              featured ? 'text-base' : 'text-sm',
            )}
          >
            {item.name}
          </div>
        </div>
      </header>

      <p
        className={cn(
          'text-foreground-muted leading-relaxed',
          featured ? 'text-sm line-clamp-3 min-h-[3.6rem]' : 'text-xs line-clamp-2 min-h-[2.2rem]',
        )}
      >
        {item.description}
      </p>

      <div className="mt-auto pt-2 border-t border-border-muted flex items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-2 min-w-0 text-foreground-subtle font-mono">
          <span>v{item.version}</span>
          <span>·</span>
          <span>{item.installedByCount} CUs</span>
          <span>·</span>
          <span>★ {item.rating.toFixed(1)}</span>
        </div>
        {item.installed ? (
          item.updateAvailable ? (
            <span className="inline-flex items-center gap-1 text-[11px] text-info font-medium">
              <ArrowDown className="size-3" />
              Update
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] text-success font-medium">
              <Check className="size-3" />
              Installed
            </span>
          )
        ) : (
          <span className="text-[11px] text-foreground-muted">Install</span>
        )}
      </div>
    </button>
  );
}

export { kindIcon, kindStyle };
