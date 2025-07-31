

import Stripe from 'stripe';
import { NextResponse } from 'next/server';
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const { userId, email } = await request.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price: 'price_1RqZB6SCrGhNnckN2aTWUJ98', 
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?canceled=true`,
    metadata: { userId, type: 'token_pack' }
  });
  console.log(session.url)

  return NextResponse.json({ url: session.url });
}