// src/components/shared/TokenCounter.tsx
'use client';

import { CircleDollarSign, Infinity } from 'lucide-react';
import { useToken } from '@/contexts/TokenContext';

export default function TokenCounter() {
  const { tokens } = useToken();

  return (
    <div className="text-sm">
      {tokens !== null && (
        <div className="flex items-center justify-center gap-1 p-2 border-2 font-mono rounded-full">
          <CircleDollarSign />
          Tokens: {tokens === 'unlimited' ? (
            <span className="flex items-center gap-1">
              <Infinity className="w-4 h-4" />
              Unlimited
            </span>
          ) : (
            tokens
          )}
        </div>
      )}
    </div>
  );
}