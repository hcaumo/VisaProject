import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  try {
    console.log('Received request to create checkout session');
    
    const body = await request.json();
    const { amount, currency, description, applicationId, successUrl, cancelUrl } = body;
    
    console.log('Request body:', { amount, currency, description, applicationId, successUrl, cancelUrl });

    // Check if we have a Stripe secret key
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      console.log('No Stripe secret key found, returning mock session ID');
      
      // For demo purposes, we'll just return a mock session ID
      return NextResponse.json({
        sessionId: 'cs_test_' + Math.random().toString(36).substring(2, 15),
        amount,
        currency,
        description,
        applicationId
      });
    }

    // Initialize Stripe with the secret key
    console.log('Initializing Stripe with secret key');
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-06-20',
    });

    // Create a Stripe Checkout session
    console.log('Creating Stripe checkout session');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: description,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        applicationId: applicationId || '',
      },
    });

    console.log('Checkout session created:', session.id);
    
    return NextResponse.json({
      sessionId: session.id,
      amount,
      currency,
      description,
      applicationId
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}