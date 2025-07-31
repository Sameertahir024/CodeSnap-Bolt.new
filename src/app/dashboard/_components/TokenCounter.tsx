'use client';
import { createClient } from '@/lib/supabase/browserClient';
import { CircleDollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TokenCounter() {
  const [tokens, setTokens] = useState<number | null>(null);
  const [user, setUser] = useState<any | null>(null); // start with null
  const supabase = createClient();

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          setUser(null);
          setTokens(null);
          return;
        }

        setUser(user);

        const { data, error } = await supabase
          .from('users')
          .select('token_balance')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        setTokens(data?.token_balance || 0);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
        setTokens(null);
      }
    };

    fetchTokens();
  }, []);

  return (
    <div className="text-sm">
      {user && (
      <div className="flex items-center justify-center gap-1 p-2 border-2 font-mono  rounded-full">

             <CircleDollarSign  />
          Tokens: {tokens !== null ? tokens : 'Loading...'}
        </div>
      ) }
    </div>
  );
}
