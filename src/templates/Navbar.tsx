'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { CenteredMenu } from '@/features/landing/CenteredMenu';
import { Section } from '@/features/landing/Section';

import { Logo } from './Logo';

export const Navbar = () => {
  const t = useTranslations('Navbar');
  const [visaDropdownOpen, setVisaDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  return (
    <Section className="px-3 py-6">
      <CenteredMenu
        logo={<Link href="/" aria-label="Home"><Logo /></Link>}
        rightMenu={(
          <>
            {/* PRO: Dark mode toggle button */}
            <li data-fade>
              <LocaleSwitcher />
            </li>
            <li className="ml-1 mr-2.5" data-fade>
              <Link href="/sign-in">{t('sign_in')}</Link>
            </li>
            <li>
              <Link className={buttonVariants()} href="/sign-up">
                {t('sign_up')}
              </Link>
            </li>
          </>
        )}
      >
        {/* Visa Services Dropdown */}
        <li className="group relative">
          <button
            type="button"
            className="flex items-center"
            onClick={() => setVisaDropdownOpen(!visaDropdownOpen)}
            onMouseEnter={() => setVisaDropdownOpen(true)}
            onMouseLeave={() => setVisaDropdownOpen(false)}
            aria-expanded={visaDropdownOpen}
            aria-haspopup="true"
          >
            {t('product')}
            <svg className="ml-1 size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={`absolute left-0 z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5 dark:bg-gray-800 ${visaDropdownOpen ? 'block' : 'hidden'}`}
            onMouseEnter={() => setVisaDropdownOpen(true)}
            onMouseLeave={() => setVisaDropdownOpen(false)}
            role="menu"
            aria-orientation="vertical"
            tabIndex={0}
          >
            <div className="py-1">
              <Link
                href="/digital-nomad-visa"
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                role="menuitem"
              >
                Digital Nomad Visa
              </Link>
              <Link
                href="/entrepreneur-visa"
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                role="menuitem"
              >
                Entrepreneur Visa
              </Link>
              <Link
                href="/creative-visa"
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                role="menuitem"
              >
                Creative Professional Visa
              </Link>
            </div>
          </div>
        </li>

        {/* Services Dropdown */}
        <li className="group relative">
          <button
            type="button"
            className="flex items-center"
            onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
            aria-expanded={servicesDropdownOpen}
            aria-haspopup="true"
          >
            Services
            <svg className="ml-1 size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={`absolute left-0 z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5 dark:bg-gray-800 ${servicesDropdownOpen ? 'block' : 'hidden'}`}
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
            role="menu"
            aria-orientation="vertical"
            tabIndex={0}
          >
            <div className="py-1">
              <Link
                href="/how-it-works"
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                role="menuitem"
              >
                How It Works
              </Link>
              <Link
                href="/community"
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                role="menuitem"
              >
                Community
              </Link>
            </div>
          </div>
        </li>

        <li>
          <Link href="/blog">{t('blog')}</Link>
        </li>

        {/* Resources Dropdown */}
        <li className="group relative">
          <button
            type="button"
            className="flex items-center"
            onClick={() => setResourcesDropdownOpen(!resourcesDropdownOpen)}
            onMouseEnter={() => setResourcesDropdownOpen(true)}
            onMouseLeave={() => setResourcesDropdownOpen(false)}
            aria-expanded={resourcesDropdownOpen}
            aria-haspopup="true"
          >
            {t('company')}
            <svg className="ml-1 size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={`absolute left-0 z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5 dark:bg-gray-800 ${resourcesDropdownOpen ? 'block' : 'hidden'}`}
            onMouseEnter={() => setResourcesDropdownOpen(true)}
            onMouseLeave={() => setResourcesDropdownOpen(false)}
            role="menu"
            aria-orientation="vertical"
            tabIndex={0}
          >
            <div className="py-1">
              <Link
                href="/about"
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                role="menuitem"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                role="menuitem"
              >
                Contact
              </Link>
              <Link
                href="/terms"
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                role="menuitem"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                role="menuitem"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </li>

        <li>
          <Link href="/contact" className="font-medium text-blue-600 dark:text-blue-400">
            Contact
          </Link>
        </li>
      </CenteredMenu>
    </Section>
  );
};
