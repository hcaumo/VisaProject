'use client';

import { CalendarIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { badgeVariants } from '@/components/ui/badgeVariants';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { CenteredHero } from '@/features/landing/CenteredHero';
import { Section } from '@/features/landing/Section';

export const Hero = () => {
  const t = useTranslations('Hero');

  return (
    <Section className="py-36">
      <CenteredHero
        banner={(
          <a
            className={badgeVariants()}
            href="https://twitter.com/drexfyvisa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Twitter"
          >
            <TwitterLogoIcon className="mr-1 size-5" aria-hidden="true" />
            {' '}
            {t('follow_twitter')}
          </a>
        )}
        title={t.rich('title', {
          important: chunks => (
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {chunks}
            </span>
          ),
        })}
        description={t('description')}
        buttons={(
          <>
            <Link
              className={buttonVariants({ size: 'lg' })}
              href="/sign-up"
              aria-label="Apply now for your Visa"
            >
              Apply now for your Visa
            </Link>

            <button
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
              data-cal-link="glima-drexfy/certificate"
              data-cal-namespace="certificate"
              data-cal-config='{"layout":"month_view"}'
              aria-label="Schedule a consultation call"
            >
              <CalendarIcon className="mr-2 size-5" aria-hidden="true" />
              Schedule a Call
            </button>
          </>
        )}
      />

      {/* Quick Links Section */}
      <div className="mt-12 text-center">
        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-4">
          <Link
            href="/digital-nomad-visa"
            className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-800 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
            aria-label="Learn about Digital Nomad Visa"
          >
            Digital Nomad Visa
          </Link>
          <Link
            href="/entrepreneur-visa"
            className="rounded-full bg-green-100 px-4 py-2 text-sm text-green-800 transition-colors hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800"
            aria-label="Learn about Entrepreneur Visa"
          >
            Entrepreneur Visa
          </Link>
          <Link
            href="/creative-visa"
            className="rounded-full bg-purple-100 px-4 py-2 text-sm text-purple-800 transition-colors hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:hover:bg-purple-800"
            aria-label="Learn about Creative Visa"
          >
            Creative Visa
          </Link>
          <Link
            href="/how-it-works"
            className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-800 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            aria-label="Learn how our visa process works"
          >
            How It Works
          </Link>
          <Link
            href="/community"
            className="rounded-full bg-yellow-100 px-4 py-2 text-sm text-yellow-800 transition-colors hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:bg-yellow-800"
            aria-label="Learn about our community"
          >
            Community
          </Link>
        </div>
      </div>
    </Section>
  );
};
