// src/contexts/TokenContext.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/browserClient';

type TokenContextType = {
  tokens: number | null;
  refreshTokens: () => Promise<void>;
};

const TokenContext = createContext<TokenContextType>({
  tokens: null,
  refreshTokens: async () => {},
});

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const [tokens, setTokens] = useState<number | null>(null);
  const supabase = createClient();

  const refreshTokens = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setTokens(null);
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('token_balance')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setTokens(data?.token_balance || 0);
    } catch (error) {
      console.error('Token refresh failed:', error);
      setTokens(null);
    }
  };

  // Initial load
  useEffect(() => {
    refreshTokens();
  }, []);

  return (
    <TokenContext.Provider value={{ tokens, refreshTokens }}>
      {children}
    </TokenContext.Provider>
  );
}

export const useToken = () => useContext(TokenContext);