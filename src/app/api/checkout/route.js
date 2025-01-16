import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SERVER_KEY);

export async function POST(req) {
  try {
    const { finalTotal } = await req.json(); // Parse JSON body from the request

    // Validate finalTotal
    if (!finalTotal || finalTotal < 0.5) { // Minimum of $0.50
      return NextResponse.json(
        { error: 'Invalid amount. Must be at least $0.50.' },
        { status: 400 }
      );
    }

    // Convert finalTotal to cents (Stripe requires amounts in the smallest currency unit)
    const amount = Math.round(finalTotal * 100);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Pass the amount in cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Return the client secret and amount
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
    });
  } catch (err) {
    console.error('Payment intent creation error:', err.message);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
