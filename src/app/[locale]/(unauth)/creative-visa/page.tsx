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
    namespace: 'Creative',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: [
      'Creative Professional Visa Portugal',
      'Artist visa Portugal',
      'Creative visa Portugal',
      'Portugal visa for artists',
      'Portugal creative residency',
      'Writers visa Portugal',
      'Designers visa Portugal',
      'Creative immigration Portugal',
      'Portugal D7 visa for artists',
      'Portugal cultural visa',
      'Musician visa Portugal',
      'Filmmaker visa Portugal',
      'Visual artist Portugal visa',
      'Portugal creative economy',
      'Creative professionals Portugal',
    ],
    alternates: {
      canonical: 'https://drexfyvisa.com/creative-visa',
      languages: {
        en: 'https://drexfyvisa.com/en/creative-visa',
        pt: 'https://drexfyvisa.com/pt/creative-visa',
        fr: 'https://drexfyvisa.com/fr/creative-visa',
      },
    },
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      url: 'https://drexfyvisa.com/creative-visa',
      type: 'website',
      images: [
        {
          url: '/creative-visa-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Creative Professional Visa Portugal',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@drexfyvisa',
      creator: '@drexfyvisa',
      title: t('meta_title'),
      description: t('meta_description'),
      images: ['/creative-visa-og.jpg'],
    },
    robots: {
      'index': true,
      'follow': true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    authors: [{ name: 'Drexfy Visa Team' }],
    publisher: 'Drexfy Visa',
  };
}

const CreativePage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);
  const t = useTranslations('Creative');
  const faqT = useTranslations('CreativeFAQ');

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
                    <h4 className="mb-2 text-lg font-semibold">Digital Nomad Visa</h4>
                    <p className="mb-4">Working remotely for foreign companies? The Digital Nomad Visa offers flexibility for remote professionals.</p>
                    <Link
                      href="/digital-nomad-visa"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                      aria-label="Learn more about Digital Nomad Visa options"
                    >
                      Learn about Digital Nomad Visa →
                    </Link>
                  </div>
                  <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                    <h4 className="mb-2 text-lg font-semibold">Entrepreneur Visa</h4>
                    <p className="mb-4">Looking to start a creative business in Portugal? The Entrepreneur Visa might be the perfect option for you.</p>
                    <Link
                      href="/entrepreneur-visa"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                      aria-label="Learn more about Entrepreneur Visa options"
                    >
                      Explore Entrepreneur Visa →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Creative Industries Section */}
              <div className="mb-12 rounded-lg bg-white p-8 shadow-sm dark:bg-gray-900">
                <h3 className="mb-6 text-center text-xl font-semibold">Creative Industries in Portugal</h3>
                <p className="mb-6">Portugal has a thriving creative scene with opportunities in various fields:</p>
                <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                    <h4 className="font-medium">Visual Arts</h4>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                    <h4 className="font-medium">Film & Media</h4>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                    <h4 className="font-medium">Music</h4>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                    <h4 className="font-medium">Literature</h4>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                    <h4 className="font-medium">Design</h4>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                    <h4 className="font-medium">Photography</h4>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                    <h4 className="font-medium">Performing Arts</h4>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                    <h4 className="font-medium">Digital Arts</h4>
                  </div>
                </div>
              </div>

              {/* Process Overview with Link */}
              <div className="mb-12 rounded-lg bg-purple-50 p-8 dark:bg-purple-900/20">
                <h3 className="mb-4 text-center text-xl font-semibold">How to Apply for Your Creative Professional Visa</h3>
                <p className="mb-4">Our streamlined process makes applying for your Creative Professional Visa simple and stress-free. We handle the paperwork while you focus on your creative work.</p>
                <div className="mt-6 flex flex-col items-center justify-center gap-6 md:flex-row">
                  <div className="w-full rounded-lg bg-white p-4 text-center shadow-sm dark:bg-gray-800 md:w-1/4">
                    <div className="mb-2 inline-flex size-10 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-800 dark:bg-purple-900 dark:text-purple-200">1</div>
                    <h4 className="font-medium">Initial Consultation</h4>
                  </div>
                  <div className="w-full rounded-lg bg-white p-4 text-center shadow-sm dark:bg-gray-800 md:w-1/4">
                    <div className="mb-2 inline-flex size-10 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-800 dark:bg-purple-900 dark:text-purple-200">2</div>
                    <h4 className="font-medium">Document Preparation</h4>
                  </div>
                  <div className="w-full rounded-lg bg-white p-4 text-center shadow-sm dark:bg-gray-800 md:w-1/4">
                    <div className="mb-2 inline-flex size-10 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-800 dark:bg-purple-900 dark:text-purple-200">3</div>
                    <h4 className="font-medium">Application Submission</h4>
                  </div>
                  <div className="w-full rounded-lg bg-white p-4 text-center shadow-sm dark:bg-gray-800 md:w-1/4">
                    <div className="mb-2 inline-flex size-10 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-800 dark:bg-purple-900 dark:text-purple-200">4</div>
                    <h4 className="font-medium">Relocation Support</h4>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Link
                    href="/how-it-works"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                    aria-label="View our detailed visa application process"
                  >
                    View our detailed application process →
                  </Link>
                </div>
              </div>

              <div className="text-center">
                <Link
                  className={buttonVariants({ size: 'lg' })}
                  href="#schedule-call"
                  id="schedule-call"
                  aria-label="Schedule a consultation call"
                >
                  {t('cta_button')}
                </Link>
              </div>
            </div>

            {/* Community Section with Link */}
            <div className="mx-auto mb-16 max-w-4xl">
              <div className="rounded-lg bg-pink-50 p-8 dark:bg-pink-900/20">
                <h3 className="mb-4 text-center text-xl font-semibold">Join Our Creative Community</h3>
                <p className="mb-4 text-center">Connect with fellow artists, writers, and creative professionals. Attend exhibitions, workshops, and networking events throughout Portugal.</p>
                <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="rounded-lg bg-white p-3 text-center dark:bg-gray-800">
                    <h4 className="text-sm font-medium">Networking Events</h4>
                  </div>
                  <div className="rounded-lg bg-white p-3 text-center dark:bg-gray-800">
                    <h4 className="text-sm font-medium">Exhibition Opportunities</h4>
                  </div>
                  <div className="rounded-lg bg-white p-3 text-center dark:bg-gray-800">
                    <h4 className="text-sm font-medium">Collaborative Spaces</h4>
                  </div>
                  <div className="rounded-lg bg-white p-3 text-center dark:bg-gray-800">
                    <h4 className="text-sm font-medium">Funding Resources</h4>
                  </div>
                </div>
                <div className="text-center">
                  <Link
                    href="/community"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                    aria-label="Learn more about our creative community benefits"
                  >
                    Discover creative community benefits →
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mx-auto max-w-4xl">
              <h3 className="mb-8 text-center text-2xl font-bold" id="faq">{faqT('title')}</h3>
              <div className="space-y-6">
                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                  <h4 className="mb-2 text-lg font-semibold">{faqT('question1')}</h4>
                  <p className="mb-2">{faqT('answer1')}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Learn more about
                    {' '}
                    <Link href="/how-it-works" className="text-blue-600 hover:underline dark:text-blue-400">our application process</Link>
                    .
                  </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                  <h4 className="mb-2 text-lg font-semibold">{faqT('question2')}</h4>
                  <p className="mb-2">{faqT('answer2')}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Explore
                    {' '}
                    <Link href="/digital-nomad-visa" className="text-blue-600 hover:underline dark:text-blue-400">Digital Nomad</Link>
                    {' '}
                    and
                    {' '}
                    <Link href="/entrepreneur-visa" className="text-blue-600 hover:underline dark:text-blue-400">Entrepreneur</Link>
                    {' '}
                    visa alternatives.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                  <h4 className="mb-2 text-lg font-semibold">{faqT('question3')}</h4>
                  <p className="mb-2">{faqT('answer3')}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Join our
                    {' '}
                    <Link href="/community" className="text-blue-600 hover:underline dark:text-blue-400">creative community</Link>
                    {' '}
                    for more resources.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                  <h4 className="mb-2 text-lg font-semibold">{faqT('question4')}</h4>
                  <p className="mb-2">{faqT('answer4')}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <Link href="/contact" className="text-blue-600 hover:underline dark:text-blue-400">Contact us</Link>
                    {' '}
                    for personalized assistance.
                  </p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <p className="mb-4 text-gray-600 dark:text-gray-400">Still have questions about the Creative Professional Visa?</p>
                <Link
                  href="/contact"
                  className={buttonVariants({ variant: 'outline' })}
                  aria-label="Contact us with your questions about Creative Professional Visa"
                >
                  Contact Our Visa Specialists
                </Link>
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

export default CreativePage;
