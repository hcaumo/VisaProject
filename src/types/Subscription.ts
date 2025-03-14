import type { PLAN_ID } from '@/utils/AppConfig';

import type { EnumValues } from './Enum';

export type PlanId = EnumValues<typeof PLAN_ID>;

export const BILLING_INTERVAL = {
  MONTH: 'month',
  YEAR: 'year',
} as const;

export type BillingInterval = EnumValues<typeof BILLING_INTERVAL>;

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending',
} as const;

export type PricingPlan = {
  id: PlanId;
  price: number;
  interval: BillingInterval;
  testPriceId: string;
  devPriceId: string;
  prodPriceId: string;
  features: {
    familyMembers: number;
    validityYears: number;
    documentStorage: boolean;
    translationService: boolean;
    supportService: boolean;
  };
};

export type IStripeSubscription = {
  stripeSubscriptionId: string | null;
  stripeSubscriptionPriceId: string | null;
  stripeSubscriptionStatus: string | null;
  stripeSubscriptionCurrentPeriodEnd: number | null;
};

export type PlanDetails =
  | {
      isPaid: true;
      plan: PricingPlan;
      stripeDetails: IStripeSubscription;
    }
  | {
      isPaid: false;
      plan: PricingPlan;
      stripeDetails?: undefined;
    };
