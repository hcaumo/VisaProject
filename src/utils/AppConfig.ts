import type { LocalePrefix } from 'node_modules/next-intl/dist/types/src/routing/types';

import { BILLING_INTERVAL, type PricingPlan } from '@/types/Subscription';

const localePrefix: LocalePrefix = 'as-needed';

export const AppConfig = {
  name: 'Portuguese Visa Applications',
  locales: [
    {
      id: 'en',
      name: 'English',
    },
    { id: 'fr', name: 'Français' },
  ],
  defaultLocale: 'en',
  localePrefix,
};

export const AllLocales = AppConfig.locales.map(locale => locale.id);

export const PLAN_ID = {
  FREE: 'd7',
  PREMIUM: 'd2',
  ENTERPRISE: 'd8',
} as const;

export const PricingPlanList: Record<string, PricingPlan> = {
  [PLAN_ID.FREE]: {
    id: PLAN_ID.FREE,
    price: 1100,
    interval: BILLING_INTERVAL.YEAR,
    testPriceId: 'price_d7_test',
    devPriceId: '',
    prodPriceId: '',
    features: {
      familyMembers: 4,
      validityYears: 2,
      documentStorage: true,
      translationService: true,
      supportService: true,
    },
  },
  [PLAN_ID.PREMIUM]: {
    id: PLAN_ID.PREMIUM,
    price: 1100,
    interval: BILLING_INTERVAL.YEAR,
    testPriceId: 'price_d2_test',
    devPriceId: '',
    prodPriceId: '',
    features: {
      familyMembers: 4,
      validityYears: 2,
      documentStorage: true,
      translationService: true,
      supportService: true,
    },
  },
  [PLAN_ID.ENTERPRISE]: {
    id: PLAN_ID.ENTERPRISE,
    price: 1100,
    interval: BILLING_INTERVAL.YEAR,
    testPriceId: 'price_d8_test',
    devPriceId: '',
    prodPriceId: '',
    features: {
      familyMembers: 4,
      validityYears: 2,
      documentStorage: true,
      translationService: true,
      supportService: true,
    },
  },
};
