// app/api/webhooks/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request:Request) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const session = event.data.object;
  const userId = session.metadata?.userId;
  const paymentType = session.metadata?.type;

  if (!userId) return NextResponse.json({ received: true });

  switch (event.type) {
    case 'checkout.session.completed':
      if (paymentType === 'token_pack') {
        // Add 5 tokens
        await supabase
          .from('users')
          .update({ 
            token_balance: 5,
            subscription_tier: 'token_pack'
          })
          .eq('id', userId);
      } else if (paymentType === 'subscription') {
        // Upgrade to unlimited
        await supabase
          .from('users')
          .update({ 
            subscription_tier: 'unlimited',
            stripe_customer_id: session.customer
          })
          .eq('id', userId);
      }
      break;

    case 'customer.subscription.deleted':
      // Downgrade to basic
      await supabase
        .from('users')
        .update({ 
          subscription_tier: 'basic',
          token_balance: 0
        })
        .eq('stripe_customer_id', session.customer);
      break;
  }

  return NextResponse.json({ received: true });
}