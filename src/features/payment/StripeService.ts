"use client";

import { AppConfig, AllLocales } from '@/utils/AppConfig';

// Initialize Stripe with your publishable key from environment variable
const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
console.log('Stripe publishable key:', STRIPE_PUBLISHABLE_KEY);

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
   * Create a Stripe Payment Link and redirect to the payment page
   */
  static async redirectToCheckout(options: PaymentOptions): Promise<void> {
    try {
      console.log('Starting Stripe payment process...');
      console.log('Options:', options);
      
      // Create a payment link
      console.log('Creating payment link with options:', options);
      
      // Extract the current locale from URL path or use the default locale
      const pathParts = window.location.pathname.split('/');
      // Check if the first path segment is a valid locale
      const locale = pathParts.length > 1 && pathParts[1] && AllLocales.includes(pathParts[1])
          ? pathParts[1]
          : AppConfig.defaultLocale;
      
      console.log('Using locale for API request:', locale);
      
      // Construct API URL with proper locale prefix
      // If it's the default locale with 'as-needed' prefix, we might not need the locale in the URL
      const apiUrl = locale === AppConfig.defaultLocale && AppConfig.localePrefix === 'as-needed'
          ? `${window.location.origin}/api/create-checkout-session`
          : `${window.location.origin}/${locale}/api/create-checkout-session`;
      
      console.log('Requesting API at:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: options.amount,
          currency: options.currency,
          description: options.description,
          applicationId: options.applicationId,
          successUrl: options.successUrl || `${window.location.origin}/${locale}/dashboard?payment=success`,
          cancelUrl: options.cancelUrl || `${window.location.origin}/${locale}/dashboard?payment=cancelled`,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API response not OK:', response.status, errorText);
        
        // For specific handling of 404 errors
        if (response.status === 404) {
          console.error('API route not found. This could be due to internationalization configuration issues.');
          
          // Try a fallback without locale prefix as last resort
          console.log('Attempting fallback to direct API route without locale prefix...');
          const fallbackResponse = await fetch(`${window.location.origin}/api/create-checkout-session`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: options.amount,
              currency: options.currency,
              description: options.description,
              applicationId: options.applicationId,
              successUrl: options.successUrl || `${window.location.origin}/${locale}/dashboard?payment=success`,
              cancelUrl: options.cancelUrl || `${window.location.origin}/${locale}/dashboard?payment=cancelled`,
            }),
          });
          
          if (fallbackResponse.ok) {
            return fallbackResponse.json().then(data => {
              console.log('Fallback successful:', data);
              // Handle the successful response
              const { paymentLinkUrl } = data;
              if (paymentLinkUrl) {
                window.location.href = paymentLinkUrl;
              } else {
                throw new Error('No payment link URL returned from API');
              }
              return;
            });
          } else {
            console.error('Fallback also failed');
          }
        }
        
        throw new Error(`API error: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log('Payment link created:', data);
      
      const { paymentLinkUrl } = data;
      if (!paymentLinkUrl) {
        console.error('No payment link URL returned from API');
        throw new Error('No payment link URL returned from API');
      }
      
      // Redirect to the payment link URL
      console.log('Redirecting to payment link:', paymentLinkUrl);
      window.location.href = paymentLinkUrl;
      return;
    } catch (error) {
      console.error('Error redirecting to Stripe Payment:', error);
      
      // Display a user-friendly error message
      if (error instanceof Error) {
        alert(`Failed to redirect to Stripe Payment: ${error.message}`);
      } else {
        alert("Failed to redirect to Stripe Payment. Please try again.");
      }
      throw error; // Re-throw for proper error handling upstream
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