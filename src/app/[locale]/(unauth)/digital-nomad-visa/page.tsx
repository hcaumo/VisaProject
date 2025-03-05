import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { buttonVariants } from '@/components/ui/buttonVariants';
import { Section } from '@/features/landing/Section';
import { CTA } from '@/templates/CTA';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'DigitalNomad',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: [
      'Digital Nomad Visa Portugal',
      'Remote work visa Portugal',
      'Portugal digital nomad',
      'Live and work in Portugal',
      'Portugal visa for remote workers',
      'Portugal D8 visa',
      'Portugal remote work permit',
      'Digital nomad lifestyle Portugal',
    ],
    alternates: {
      canonical: 'https://drexfyvisa.com/digital-nomad-visa',
      languages: {
        en: 'https://drexfyvisa.com/en/digital-nomad-visa',
        pt: 'https://drexfyvisa.com/pt/digital-nomad-visa',
        fr: 'https://drexfyvisa.com/fr/digital-nomad-visa',
      },
    },
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      url: 'https://drexfyvisa.com/digital-nomad-visa',
      type: 'website',
      images: [
        {
          url: '/digital-nomad-visa-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Digital Nomad Visa Portugal',
        },
      ],
    },
  };
}

const DigitalNomadPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);
  const t = useTranslations('DigitalNomad');
  const faqT = useTranslations('DigitalNomadFAQ');

  return (
    <>
      <Navbar />
      <main>
        <Section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-4xl text-center">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl">{t('title')}</h1>
              <h2 className="mb-8 text-2xl text-gray-600 dark:text-gray-300 md:text-3xl">{t('subtitle')}</h2>
              <p className="mb-8 text-lg">{t('description')}</p>
            </div>

            <div className="mx-auto mb-16 max-w-4xl">
              <p className="mb-8 text-lg">{t('content')}</p>

              <div className="mb-12 rounded-lg bg-gray-50 p-8 dark:bg-gray-800">
                <h3 className="mb-6 text-xl font-semibold">{t('benefits_title')}</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="mr-2 size-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('benefit1')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="mr-2 size-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('benefit2')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="mr-2 size-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('benefit3')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="mr-2 size-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('benefit4')}</span>
                  </li>
                </ul>
              </div>

              {/* Related Visa Types Section with Internal Links */}
              <div className="mb-12">
                <h3 className="mb-6 text-center text-xl font-semibold">Explore Other Visa Options</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                    <h4 className="mb-2 text-lg font-semibold">Entrepreneur Visa</h4>
                    <p className="mb-4">Looking to start a business in Portugal? The Entrepreneur Visa might be the perfect option for you.</p>
                    <Link
                      href="/entrepreneur-visa"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Learn about Entrepreneur Visa →
                    </Link>
                  </div>
                  <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                    <h4 className="mb-2 text-lg font-semibold">Creative Professional Visa</h4>
                    <p className="mb-4">For artists, writers, and creative professionals looking to live and work in Portugal.</p>
                    <Link
                      href="/creative-visa"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Explore Creative Professional Visa →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Process Overview with Link */}
              <div className="mb-12 rounded-lg bg-blue-50 p-8 dark:bg-blue-900/20">
                <h3 className="mb-4 text-center text-xl font-semibold">How to Apply for Your Digital Nomad Visa</h3>
                <p className="mb-4">Our streamlined process makes applying for your Digital Nomad Visa simple and stress-free. We handle the paperwork while you focus on planning your new life in Portugal.</p>
                <div className="text-center">
                  <Link
                    href="/how-it-works"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    View our 4-step application process →
                  </Link>
                </div>
              </div>

              <div className="text-center">
                <a
                  className={buttonVariants({ size: 'lg' })}
                  href="#schedule-call"
                  id="schedule-call"
                >
                  {t('cta_button')}
                </a>
              </div>
            </div>

            {/* Community Section with Link */}
            <div className="mx-auto mb-16 max-w-4xl">
              <div className="rounded-lg bg-green-50 p-8 dark:bg-green-900/20">
                <h3 className="mb-4 text-center text-xl font-semibold">Join Our Digital Nomad Community</h3>
                <p className="mb-4 text-center">Connect with fellow digital nomads, attend exclusive events, and access special discounts on coworking spaces and accommodations throughout Portugal.</p>
                <div className="text-center">
                  <Link
                    href="/community"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Discover community benefits →
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mx-auto max-w-4xl">
              <h3 className="mb-8 text-center text-2xl font-bold">{faqT('title')}</h3>
              <div className="space-y-6">
                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                  <h4 className="mb-2 text-lg font-semibold">{faqT('question1')}</h4>
                  <p>{faqT('answer1')}</p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                  <h4 className="mb-2 text-lg font-semibold">{faqT('question2')}</h4>
                  <p>{faqT('answer2')}</p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                  <h4 className="mb-2 text-lg font-semibold">{faqT('question3')}</h4>
                  <p>{faqT('answer3')}</p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                  <h4 className="mb-2 text-lg font-semibold">{faqT('question4')}</h4>
                  <p>{faqT('answer4')}</p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <CTA />
      <Footer />
    </>
  );
};

export default DigitalNomadPage;
