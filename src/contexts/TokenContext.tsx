'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/browserClient';

type TokenContextType = {
  tokens: number | 'unlimited' | null;
  refreshTokens: () => Promise<void>;
};

const TokenContext = createContext<TokenContextType>({
  tokens: null,
  refreshTokens: async () => {},
});

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const [tokens, setTokens] = useState<number | 'unlimited' | null>(null);
  const supabase = createClient();

  const refreshTokens = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setTokens(null);
        return;
      }

      // Fetch both token balance and subscription tier
      const { data, error } = await supabase
        .from('users')
        .select('token_balance, subscription_tier')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      // Check subscription tier and set tokens accordingly
      if (data?.subscription_tier === 'unlimited') {
        setTokens('unlimited');
      } else if (data?.subscription_tier === 'basic') {
        // For basic tier, use the actual token balance
        setTokens(data?.token_balance || 0);
      } else {
        // Fallback for other tiers or no subscription
        setTokens(data?.token_balance || 0);
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      setTokens(null);
    }
  };

  // Initial load
  useEffect(() => {
    console.log("first")
    refreshTokens();
  }, []);

  return (
    <TokenContext.Provider value={{ tokens, refreshTokens }}>
      {children}
    </TokenContext.Provider>
  );
}

export const useToken = () => useContext(TokenContext);