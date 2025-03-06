'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { PLAN_ID } from '@/utils/AppConfig';
import type { BillingInterval } from '@/types/Subscription';

// Map plan IDs to their translation key names
const planIdToNameKey: Record<string, string> = {
  [PLAN_ID.FREE]: 'free',
  [PLAN_ID.PREMIUM]: 'premium',
  [PLAN_ID.ENTERPRISE]: 'enterprise',
};

export const PricingCard = (props: {
  planId: string;
  price: number;
  interval: BillingInterval;
  button: React.ReactNode;
  children: React.ReactNode;
}) => {
  const t = useTranslations('PricingPlan');
  const planNameKey = planIdToNameKey[props.planId] || 'free';

  return (
    <div className="rounded-xl border border-border px-6 py-8 text-center">
      <div className="text-lg font-semibold">
        {t(`${planNameKey}_plan_name`)}
      </div>

      <div className="mt-3 flex items-center justify-center">
        <div className="text-5xl font-bold">
          {`$${props.price}`}
        </div>

        <div className="ml-1 text-muted-foreground">
          {`/ ${t(`plan_interval_${props.interval}`)}`}
        </div>
      </div>

      <div className="mt-2 text-sm text-muted-foreground">
        {t(`${planNameKey}_plan_description`)}
      </div>

      {props.button}

      <ul className="mt-8 space-y-3">{props.children}</ul>
    </div>
  );
};
