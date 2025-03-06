import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { Section } from '@/features/landing/Section';
import { CTA } from '@/templates/CTA';
import { Features } from '@/templates/Features';
import { Footer } from '@/templates/Footer';
import { Hero } from '@/templates/Hero';
import { Navbar } from '@/templates/Navbar';
import { Pricing } from '@/templates/Pricing';
import { Sponsors } from '@/templates/Sponsors';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: [
      'Portugal visa services',
      'digital nomad visa Portugal',
      'entrepreneur visa Portugal',
      'creative visa Portugal',
      'Portugal immigration',
      'Portugal relocation',
      'visa application Portugal',
      'live in Portugal',
      'work in Portugal',
      'Portugal residency',
    ],
    alternates: {
      canonical: 'https://drexfyvisa.com',
      languages: {
        en: 'https://drexfyvisa.com/en',
        pt: 'https://drexfyvisa.com/pt',
        fr: 'https://drexfyvisa.com/fr',
      },
    },
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      url: 'https://drexfyvisa.com',
      type: 'website',
      images: [
        {
          url: '/home-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Drexfy Visa - Portugal Visa Services',
        },
      ],
    },
  };
}

const IndexPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);
  const faqT = useTranslations('HomeFAQ');
  // Removed unused translation variable

  return (
    <>
      <Navbar />
      <Hero />
      <Sponsors />
      <Features />

      {/* Visa Options Section */}
      <Section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Our Visa Solutions</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <h3 className="mb-3 text-xl font-semibold">Digital Nomad Visa</h3>
              <p className="mb-4">Perfect for remote workers and digital professionals looking to live in Portugal while working for companies abroad.</p>
              <Link
                href="/digital-nomad-visa"
                className={buttonVariants({ variant: 'outline' })}
                aria-label="Learn more about Digital Nomad Visa"
              >
                Learn More
              </Link>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <h3 className="mb-3 text-xl font-semibold">Entrepreneur Visa</h3>
              <p className="mb-4">Designed for business owners and entrepreneurs who want to establish or relocate their business to Portugal.</p>
              <Link
                href="/entrepreneur-visa"
                className={buttonVariants({ variant: 'outline' })}
                aria-label="Learn more about Entrepreneur Visa"
              >
                Learn More
              </Link>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <h3 className="mb-3 text-xl font-semibold">Creative Professional Visa</h3>
              <p className="mb-4">Tailored for artists, writers, and creative professionals seeking to live and work in Portugal's vibrant creative scene.</p>
              <Link
                href="/creative-visa"
                className={buttonVariants({ variant: 'outline' })}
                aria-label="Learn more about Creative Professional Visa"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Pricing />

      {/* Process Overview Section */}
      <Section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">How It Works</h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg">Our streamlined process makes applying for your Portugal visa simple and stress-free.</p>

          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex flex-col items-center justify-center md:flex-row">
              <div className="p-4 md:w-1/2">
                <h3 className="mb-2 text-xl font-semibold">1. Initial Consultation</h3>
                <p>We assess your situation and recommend the best visa option for your specific needs.</p>
              </div>
              <div className="p-4 md:w-1/2">
                <h3 className="mb-2 text-xl font-semibold">2. Document Preparation</h3>
                <p>Our team helps you gather and prepare all necessary documentation for your application.</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center md:flex-row">
              <div className="p-4 md:w-1/2">
                <h3 className="mb-2 text-xl font-semibold">3. Application Submission</h3>
                <p>We submit your application and communicate with authorities on your behalf.</p>
              </div>
              <div className="p-4 md:w-1/2">
                <h3 className="mb-2 text-xl font-semibold">4. Relocation Support</h3>
                <p>Once approved, we provide comprehensive support for your move to Portugal.</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/how-it-works"
                className={buttonVariants()}
                aria-label="Learn more about our visa application process"
              >
                Learn More About Our Process
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Custom FAQ Section */}
      <Section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">{faqT('title')}</h2>
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>{faqT('question1')}</AccordionTrigger>
              <AccordionContent>{faqT('answer1')}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>{faqT('question2')}</AccordionTrigger>
              <AccordionContent>{faqT('answer2')}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>{faqT('question3')}</AccordionTrigger>
              <AccordionContent>{faqT('answer3')}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>{faqT('question4')}</AccordionTrigger>
              <AccordionContent>{faqT('answer4')}</AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="mt-8 text-center">
            <button
              className={buttonVariants({ variant: 'outline' })}
              data-cal-link="glima-drexfy/certificate"
              data-cal-namespace="certificate"
              data-cal-config='{"layout":"month_view"}'
              aria-label="Contact us with your questions"
            >
              Have More Questions? Contact Us
            </button>
          </div>
        </div>
      </Section>

      {/* Community Section */}
      <Section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">Join Our Community</h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg">
            Connect with fellow expats, digital nomads, entrepreneurs, and creative professionals in Portugal.
          </p>
          <div className="text-center">
            <Link
              href="/community"
              className={buttonVariants()}
              aria-label="Learn more about our community"
            >
              Discover Community Benefits
            </Link>
          </div>
        </div>
      </Section>

      <CTA />
      <Footer />
    </>
  );
};

export default IndexPage;
