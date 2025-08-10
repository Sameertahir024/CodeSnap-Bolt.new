import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);


export async function POST(request: Request) {
  const { userId } = await request.json();
  console.log(userId)
  if (!userId) {
    return NextResponse.json({ error: "please provide the id" }, { status: 400 });
  }

  const { data: user, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId)
  .single();

  // Unlimited users don't consume tokens
  if (user?.subscription_tier === 'unlimited') {
    return NextResponse.json({ success: true });
  }

  // Check token balance
  if (user?.token_balance <= 0) {
    return NextResponse.json(
      { 
        requiresPayment: true,
        currentTier: user?.subscription_tier 
      },
      { status: 402 }
    );
  }

  // Deduct token for basic/token_pack users
  await supabase
    .from('users')
    .update({ token_balance: user?.token_balance - 1 })
    .eq('id', userId);

  return NextResponse.json({ 
    success: true,
    remainingTokens: user?.token_balance - 1
  });
}