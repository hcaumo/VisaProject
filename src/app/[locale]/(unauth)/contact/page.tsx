import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { buttonVariants } from '@/components/ui/buttonVariants';
import { Section } from '@/features/landing/Section';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Contact',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const ContactPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);
  const t = useTranslations('Contact');

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

            <div className="mx-auto max-w-4xl">
              <div className="mb-16 grid gap-12 md:grid-cols-2">
                <div>
                  <h3 className="mb-6 text-2xl font-bold">Get in Touch</h3>
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                        placeholder="Tell us about your visa needs..."
                      >
                      </textarea>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className={buttonVariants({ size: 'lg' })}
                      >
                        {t('cta_button')}
                      </button>
                    </div>
                  </form>
                </div>

                <div>
                  <h3 className="mb-6 text-2xl font-bold">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <svg className="mr-3 mt-1 size-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <h4 className="mb-1 font-semibold">Phone</h4>
                        <p className="text-gray-600 dark:text-gray-300">+351 123 456 789</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <svg className="mr-3 mt-1 size-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <h4 className="mb-1 font-semibold">Email</h4>
                        <p className="text-gray-600 dark:text-gray-300">info@drexfyvisa.com</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <svg className="mr-3 mt-1 size-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <h4 className="mb-1 font-semibold">Office</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Avenida da Liberdade 110
                          <br />
                          1250-146 Lisbon
                          <br />
                          Portugal
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <svg className="mr-3 mt-1 size-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="mb-1 font-semibold">Business Hours</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Monday - Friday: 9:00 AM - 6:00 PM
                          <br />
                          Saturday: 10:00 AM - 2:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-gray-100 p-8 dark:bg-gray-800">
                <h3 className="mb-6 text-center text-xl font-semibold">Schedule a Call</h3>
                <p className="mb-6 text-center">Prefer to speak with one of our visa specialists directly? Schedule a call at a time that works for you.</p>
                <div className="text-center">
                  <a
                    className={buttonVariants({ size: 'lg' })}
                    href="#schedule-call"
                  >
                    Schedule a Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
