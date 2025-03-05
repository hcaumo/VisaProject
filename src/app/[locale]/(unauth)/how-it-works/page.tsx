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
    namespace: 'HowItWorks',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const HowItWorksPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);
  const t = useTranslations('HowItWorks');
  const faqT = useTranslations('HowItWorksFAQ');

  return (
    <>
      <Navbar />
      <main>
        <Section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-4xl text-center">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl">{t('title')}</h1>
              <h2 className="mb-8 text-2xl text-gray-600 dark:text-gray-300 md:text-3xl">{t('subtitle')}</h2>
            </div>

            <div className="mx-auto mb-16 max-w-4xl">
              <h3 className="mb-8 text-center text-2xl font-bold">{t('process_title')}</h3>

              <div className="mb-12 grid gap-8 md:grid-cols-2">
                <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-900">
                  <div className="mb-4 flex items-center">
                    <div className="mr-3 flex size-8 items-center justify-center rounded-full bg-blue-500 text-white">
                      1
                    </div>
                    <h4 className="text-xl font-semibold">{t('step1_title')}</h4>
                  </div>
                  <p>{t('step1_description')}</p>
                </div>

                <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-900">
                  <div className="mb-4 flex items-center">
                    <div className="mr-3 flex size-8 items-center justify-center rounded-full bg-blue-500 text-white">
                      2
                    </div>
                    <h4 className="text-xl font-semibold">{t('step2_title')}</h4>
                  </div>
                  <p>{t('step2_description')}</p>
                </div>

                <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-900">
                  <div className="mb-4 flex items-center">
                    <div className="mr-3 flex size-8 items-center justify-center rounded-full bg-blue-500 text-white">
                      3
                    </div>
                    <h4 className="text-xl font-semibold">{t('step3_title')}</h4>
                  </div>
                  <p>{t('step3_description')}</p>
                </div>

                <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-900">
                  <div className="mb-4 flex items-center">
                    <div className="mr-3 flex size-8 items-center justify-center rounded-full bg-blue-500 text-white">
                      4
                    </div>
                    <h4 className="text-xl font-semibold">{t('step4_title')}</h4>
                  </div>
                  <p>{t('step4_description')}</p>
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

export default HowItWorksPage;
