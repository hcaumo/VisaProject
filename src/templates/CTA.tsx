'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/buttonVariants';
import { CTABanner } from '@/features/landing/CTABanner';
import { Section } from '@/features/landing/Section';

export const CTA = () => {
  const t = useTranslations('CTA');

  return (
    <Section>
      <CTABanner
        title={t('title')}
        description={t('description')}
        buttons={(
          <>
            <button
              className={buttonVariants({ size: 'lg' })}
              data-cal-link="glima-drexfy/certificate"
              data-cal-namespace="certificate"
              data-cal-config='{"layout":"month_view"}'
              aria-label="Schedule a consultation call"
            >
              {t('button_text')}
            </button>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/digital-nomad-visa"
                className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
                aria-label="Learn about Digital Nomad Visa"
              >
                Digital Nomad Visa
              </Link>
              <Link
                href="/entrepreneur-visa"
                className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800 transition-colors hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800"
                aria-label="Learn about Entrepreneur Visa"
              >
                Entrepreneur Visa
              </Link>
              <Link
                href="/creative-visa"
                className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800 transition-colors hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:hover:bg-purple-800"
                aria-label="Learn about Creative Visa"
              >
                Creative Visa
              </Link>
            </div>
          </>
        )}
      />
    </Section>
  );
};
