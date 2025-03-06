import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  try {
    console.log('Received request to create payment link');
    
    const body = await request.json();
    const { amount, currency, description, applicationId, successUrl, cancelUrl } = body;
    
    console.log('Request body:', { amount, currency, description, applicationId, successUrl, cancelUrl });

    // Get Stripe secret key - for sandbox testing we need a real test key
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    console.log('Stripe secret key available:', !!stripeSecretKey);
    
    if (!stripeSecretKey) {
      console.error('No Stripe secret key found. Please set the STRIPE_SECRET_KEY environment variable.');
      return NextResponse.json(
        { error: 'Stripe secret key is required for sandbox testing' },
        { status: 500 }
      );
    }

    // Initialize Stripe with the secret key
    console.log('Initializing Stripe with secret key');
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-06-20', // Using the compatible Stripe API version
    });

    // Create a product for this payment
    console.log('Creating product for payment');
    const product = await stripe.products.create({
      name: description,
      description: `Payment for ${description}`,
    });
    console.log('Created product:', product.id);

    // Create a price for the product
    console.log('Creating price for product');
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: amount,
      currency: currency,
    });
    console.log('Created price:', price.id);

    // Create a payment link
    console.log('Creating payment link with params:', {
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      after_completion: {
        type: 'redirect',
        redirect: {
          url: successUrl,
        },
      },
    });
    
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      after_completion: {
        type: 'redirect',
        redirect: {
          url: successUrl,
        },
      },
      metadata: {
        applicationId: applicationId || '',
      },
    });

    console.log('Payment link created successfully');
    console.log('Payment link URL:', paymentLink.url);
    
    return NextResponse.json({
      paymentLinkId: paymentLink.id,
      paymentLinkUrl: paymentLink.url,
      amount,
      currency,
      description,
      applicationId
    });
  } catch (error) {
    console.error('Error creating payment link:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Failed to create payment link', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}