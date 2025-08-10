import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
    console.log("webhok is tunnong")
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature');
  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Webhook Error: ${message}`);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const paymentType = session.metadata?.type;
      if (!userId) return NextResponse.json({ received: true });

      if (paymentType === 'token_pack') {
        console.log("token pack is tunnong")
        await supabase.from('users')
          .update({ token_balance: 1, subscription_tier: 'basic' })
          .eq('id', userId);
      } else if (paymentType === 'subscription') {
        console.log("subscription is tunnong")
        const customerId =
          typeof session.customer === 'string' ? session.customer : session.customer?.id;
        await supabase.from('users')
          .update({ subscription_tier: 'unlimited', stripe_customer_id: customerId })
          .eq('id', userId);
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId =
        typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id;
      await supabase.from('users')
        .update({ subscription_tier: 'basic', token_balance: 0 })
        .eq('stripe_customer_id', customerId);
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}