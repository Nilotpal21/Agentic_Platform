'use client';

import { useMemo, useState } from 'react';
import { Search, LayoutGrid, List as ListIcon } from 'lucide-react';
import {
  marketplaceItems,
  featuredItemIds,
  marketplaceCategories,
  kindLabel,
  type MarketplaceItem,
  type MarketplaceKind,
} from '@/lib/mock-data';
import { ItemCard } from '@/components/marketplace/ItemCard';
import { ItemDetailSheet } from '@/components/marketplace/ItemDetailSheet';
import { Footer } from '@/components/shell/Footer';
import { cn } from '@/lib/utils';

const KIND_FILTERS: { id: MarketplaceKind | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'template', label: 'Templates' },
  { id: 'sub_agent', label: 'Sub-Agents' },
  { id: 'skill', label: 'Skills' },
  { id: 'knowledge_pack', label: 'Knowledge Packs' },
  { id: 'guardrail_pack', label: 'Guardrail Packs' },
  { id: 'evaluation_pack', label: 'Eval Scenario Packs' },
];

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [kind, setKind] = useState<MarketplaceKind | 'all'>('all');
  const [domain, setDomain] = useState<string>('All domains');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selected, setSelected] = useState<MarketplaceItem | null>(null);

  const featured = marketplaceItems.filter((m) => featuredItemIds.includes(m.id));

  const filtered = useMemo(() => {
    return marketplaceItems.filter((m) => {
      if (kind !== 'all' && m.kind !== kind) return false;
      if (domain !== 'All domains' && m.category !== domain) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !m.name.toLowerCase().includes(q) &&
          !m.description.toLowerCase().includes(q) &&
          !m.category.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [search, kind, domain]);

  const kindCounts = useMemo(() => {
    const counts: Record<string, number> = { all: marketplaceItems.length };
    for (const k of [
      'template',
      'sub_agent',
      'skill',
      'knowledge_pack',
      'guardrail_pack',
      'evaluation_pack',
    ] as MarketplaceKind[]) {
      counts[k] = marketplaceItems.filter((m) => m.kind === k).length;
    }
    return counts;
  }, []);

  return (
    <div className="space-y-5">
      <header className="flex items-end justify-between gap-3 pb-4 border-b border-border-muted">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Marketplace</h1>
          <p className="text-xs text-foreground-muted mt-1.5">
            Platform-curated building blocks for credit-union AI apps. Templates, sub-agents,
            knowledge packs, guardrail packs, and evaluation scenario packs.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-foreground-subtle pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search the Marketplace…"
              className="w-full h-9 bg-background-muted/60 border border-border-muted rounded-md pl-9 pr-3 text-sm placeholder:text-foreground-subtle focus:outline-none focus:ring-1 focus:ring-border-focus/40"
            />
          </div>
          <div className="flex items-center gap-0.5 p-0.5 rounded-md bg-background-muted/60">
            <button
              type="button"
              onClick={() => setView('grid')}
              className={cn(
                'size-7 rounded flex items-center justify-center transition-colors',
                view === 'grid'
                  ? 'bg-background-elevated text-foreground'
                  : 'text-foreground-muted hover:text-foreground',
              )}
              aria-label="Grid view"
            >
              <LayoutGrid className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setView('list')}
              className={cn(
                'size-7 rounded flex items-center justify-center transition-colors',
                view === 'list'
                  ? 'bg-background-elevated text-foreground'
                  : 'text-foreground-muted hover:text-foreground',
              )}
              aria-label="List view"
            >
              <ListIcon className="size-3.5" />
            </button>
          </div>
        </div>
      </header>

      <section className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          {KIND_FILTERS.map((k) => (
            <button
              key={k.id}
              type="button"
              onClick={() => setKind(k.id)}
              className={cn(
                'px-2 py-1 rounded-md text-[11px] font-medium border transition-colors inline-flex items-center gap-1.5',
                kind === k.id
                  ? 'bg-background-elevated border-border text-foreground'
                  : 'bg-background-muted/40 border-border-muted text-foreground-muted hover:text-foreground',
              )}
            >
              {k.label}
              <span className="font-mono text-foreground-subtle">
                ({kindCounts[k.id]})
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="text-[10px] uppercase tracking-wide text-foreground-meta font-medium pr-1">
            Domain
          </div>
          {marketplaceCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setDomain(c)}
              className={cn(
                'px-2 py-1 rounded-md text-[11px] font-medium border transition-colors',
                domain === c
                  ? 'bg-background-elevated border-border text-foreground'
                  : 'bg-background-muted/40 border-border-muted text-foreground-muted hover:text-foreground',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {search === '' && kind === 'all' && domain === 'All domains' && (
        <section>
          <h2 className="text-sm font-semibold mb-3">Featured by the Platform Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {featured.map((it) => (
              <ItemCard key={it.id} item={it} featured onClick={() => setSelected(it)} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-sm font-semibold mb-3">
          {kind === 'all' ? 'All items' : kindLabel[kind]}
          <span className="text-[11px] text-foreground-muted font-normal font-mono tabular-nums ml-2">
            ({filtered.length})
          </span>
        </h2>
        {filtered.length === 0 ? (
          <p className="text-xs text-foreground-muted text-center py-12 border border-dashed border-border-muted rounded-lg">
            No items match your filters.
          </p>
        ) : (
          <div
            className={cn(
              view === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'
                : 'space-y-2',
            )}
          >
            {filtered.map((it) => (
              <ItemCard key={it.id} item={it} onClick={() => setSelected(it)} />
            ))}
          </div>
        )}
      </section>

      <Footer />

      <ItemDetailSheet
        item={selected}
        open={selected !== null}
        onOpenChange={(o) => !o && setSelected(null)}
      />
    </div>
  );
}
