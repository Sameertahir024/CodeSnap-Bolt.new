// src/components/shared/TokenCounter.tsx
'use client';

import { CircleDollarSign } from 'lucide-react';
import { useToken } from '@/contexts/TokenContext';

export default function TokenCounter() {
  const { tokens } = useToken();

  return (
    <div className="text-sm">
      {tokens !== null && (
        <div className="flex items-center justify-center gap-1 p-2 border-2 font-mono rounded-full">
          <CircleDollarSign />
          Tokens: {tokens}
        </div>
      )}
    </div>
  );
}