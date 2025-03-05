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
    namespace: 'Community',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const CommunityPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);
  const t = useTranslations('Community');
  const faqT = useTranslations('CommunityFAQ');

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
              <div className="mb-12 rounded-lg bg-gray-50 p-8 dark:bg-gray-800">
                <h3 className="mb-6 text-xl font-semibold">{t('benefits_title')}</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                    <div className="mb-4 flex items-center">
                      <svg className="mr-3 size-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <h4 className="text-lg font-semibold">{t('benefit1')}</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">Connect with fellow digital nomads, entrepreneurs, and creatives at our regular community events.</p>
                  </div>

                  <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                    <div className="mb-4 flex items-center">
                      <svg className="mr-3 size-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h4 className="text-lg font-semibold">{t('benefit2')}</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">Enjoy special rates on coworking spaces, accommodation, and local services through our partner network.</p>
                  </div>

                  <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                    <div className="mb-4 flex items-center">
                      <svg className="mr-3 size-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h4 className="text-lg font-semibold">{t('benefit3')}</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">Our team remains available to assist with any challenges you face during your time in Portugal.</p>
                  </div>

                  <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                    <div className="mb-4 flex items-center">
                      <svg className="mr-3 size-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <h4 className="text-lg font-semibold">{t('benefit4')}</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">Learn from experienced expats and professionals through our structured mentorship programs.</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <a
                  className={buttonVariants({ size: 'lg' })}
                  href="#schedule-call"
                >
                  {t('cta_button')}
                </a>
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

export default CommunityPage;
