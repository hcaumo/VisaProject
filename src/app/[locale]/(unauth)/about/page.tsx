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
    namespace: 'About',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const AboutPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);
  const t = useTranslations('About');

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
              <div className="mb-16 grid items-center gap-12 md:grid-cols-2">
                <div>
                  <p className="mb-6 text-lg">{t('description')}</p>
                  <p className="mb-6 text-lg">
                    At Drexfy Visa, we understand that relocating to a new country can be overwhelming. That's why we've built a team of experienced immigration specialists, legal experts, and technology professionals who are passionate about making international mobility accessible to everyone.
                  </p>
                  <p className="text-lg">
                    Our mission is to empower digital professionals to embrace the freedom of location-independent living while navigating the complexities of immigration with confidence and ease.
                  </p>
                </div>
                <div className="rounded-lg bg-gray-100 p-8 dark:bg-gray-800">
                  <h3 className="mb-6 text-xl font-semibold">Our Values</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg className="mr-2 size-6 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>
                        <strong>Integrity:</strong>
                        {' '}
                        We maintain the highest ethical standards in all our operations.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mr-2 size-6 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>
                        <strong>Innovation:</strong>
                        {' '}
                        We leverage technology to create efficient, user-friendly solutions.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mr-2 size-6 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>
                        <strong>Community:</strong>
                        {' '}
                        We foster connections among international professionals.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mr-2 size-6 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <span>
                        <strong>Global Perspective:</strong>
                        {' '}
                        We embrace diversity and cultural exchange.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-16">
                <h3 className="mb-8 text-center text-2xl font-bold">Our Team</h3>
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-900">
                    <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="p-6">
                      <h4 className="mb-1 text-xl font-semibold">Maria Silva</h4>
                      <p className="mb-4 text-blue-500">Founder & CEO</p>
                      <p className="text-gray-600 dark:text-gray-300">Immigration law specialist with over 10 years of experience helping digital professionals relocate to Portugal.</p>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-900">
                    <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="p-6">
                      <h4 className="mb-1 text-xl font-semibold">João Santos</h4>
                      <p className="mb-4 text-blue-500">Legal Director</p>
                      <p className="text-gray-600 dark:text-gray-300">Expert in Portuguese immigration law with extensive experience in visa applications and business formation.</p>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-900">
                    <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="p-6">
                      <h4 className="mb-1 text-xl font-semibold">Ana Ferreira</h4>
                      <p className="mb-4 text-blue-500">Client Success Manager</p>
                      <p className="text-gray-600 dark:text-gray-300">Dedicated to ensuring a smooth experience for all clients throughout their visa application journey.</p>
                    </div>
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
          </div>
        </Section>
      </main>
      <CTA />
      <Footer />
    </>
  );
};

export default AboutPage;
