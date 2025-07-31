import Stripe from 'stripe';
import { NextResponse } from 'next/server';
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);


export async function POST(request: Request) {
  const { userId, email } = await request.json();

  // Check for existing customer
  let customer;
  const existingCustomers = await stripe.customers.list({ email });
  customer = existingCustomers.data[0];

  if (!customer) {
    customer = await stripe.customers.create({
     
      metadata: { userId }
    });
  }

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    payment_method_types: ['card'],
    line_items: [{
      price: 'price_1RqZWcSCrGhNnckNr822BSaW', // Your subscription price ID
      quantity: 1,
    }],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?canceled=true`,
    metadata: { userId, type: 'subscription' }
  });
  console.log(session.url)

  return NextResponse.json({ url: session.url });
}