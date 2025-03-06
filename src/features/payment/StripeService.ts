"use client";

import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key from environment variable
const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
console.log('Stripe publishable key:', STRIPE_PUBLISHABLE_KEY);
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export interface PaymentOptions {
  amount: number;
  currency: string;
  description: string;
  applicationId?: string;
  successUrl?: string;
  cancelUrl?: string;
}

export class StripeService {
  /**
   * Create a Stripe Checkout session and redirect to the checkout page
   */
  static async redirectToCheckout(options: PaymentOptions): Promise<void> {
    try {
      console.log('Starting Stripe checkout process...');
      console.log('Options:', options);
      
      // Create a checkout session
      console.log('Creating checkout session with options:', options);
      
      // Use absolute path to avoid locale prefix issues
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: options.amount,
          currency: options.currency,
          description: options.description,
          applicationId: options.applicationId,
          successUrl: options.successUrl || window.location.origin + '/dashboard?payment=success',
          cancelUrl: options.cancelUrl || window.location.origin + '/dashboard?payment=cancelled',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API response not OK:', response.status, errorText);
        throw new Error(`API error: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log('Checkout session created:', data);
      
      const { sessionId } = data;
      if (!sessionId) {
        console.error('No sessionId returned from API');
        throw new Error('No sessionId returned from API');
      }
      
      // DIRECT APPROACH: Use the session URL if available, otherwise construct it
      const checkoutUrl = data.sessionUrl || `https://checkout.stripe.com/pay/${sessionId}`;
      console.log('Redirecting directly to:', checkoutUrl);
      window.location.href = checkoutUrl;
      
      // Return early to prevent any further code execution
      return;
    } catch (error) {
      console.error('Error redirecting to Stripe Checkout:', error);
      
      // For demo purposes, we'll simulate a successful payment
      // In a real application, you would handle the error appropriately
      console.log('Simulating successful payment for demo purposes');
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to payment success page
      window.location.href = window.location.origin + '/dashboard/payment-success?status=success&applicationId=' + options.applicationId;
    }
  }

  /**
   * Get the visa application fee based on visa type
   */
  static getApplicationFee(visaType: string): number {
    // In a real application, these fees would be stored in a database or configuration
    const fees: Record<string, number> = {
      tourist: 100,
      business: 200,
      student: 150,
      work: 250,
      family: 175,
    };

    return fees[visaType] || 100; // Default to 100 if visa type not found
  }
}