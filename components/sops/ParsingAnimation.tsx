'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const MESSAGES = [
  'Reading your SOP…',
  'Identifying intents, tasks, and escalation rules…',
  'Checking against the credit-union baseline for safety and compliance…',
  'Selecting sub-agents and attaching knowledge…',
  'Generating evaluation tests from your SOP…',
];

const TOTAL_MS = 6000;

export function ParsingAnimation({ onComplete }: { onComplete: () => void }) {
  const [messageIdx, setMessageIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIdx((i) => (i + 1) % MESSAGES.length);
    }, 1200);

    const start = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(1, elapsed / TOTAL_MS));
    }, 60);

    const done = setTimeout(() => {
      onComplete();
    }, TOTAL_MS);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(done);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-[640px] mx-6 rounded-2xl border border-border bg-background-elevated shadow-xl p-8">
        <div className="flex items-center justify-center relative mb-6">
          <div className="absolute size-24 rounded-full bg-purple/20 blur-2xl animate-pulse" />
          <Loader2 className="size-10 text-purple animate-spin relative" />
        </div>

        <div className="text-center min-h-[3.5rem]">
          <p
            key={messageIdx}
            className="text-base font-medium tracking-tight text-foreground animate-fade-in"
          >
            {MESSAGES[messageIdx]}
          </p>
        </div>

        <div className="mt-6 h-1 rounded-full bg-background-muted overflow-hidden">
          <div
            className="h-full bg-purple/80 transition-all duration-100 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <p className="text-[11px] text-foreground-subtle text-center mt-4">
          You can continue working — we&apos;ll notify you when this is done.
        </p>
      </div>
    </div>
  );
}
