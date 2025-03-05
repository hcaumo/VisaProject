import '@/styles/global.css';

import type { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

// No import needed
import { AllLocales } from '@/utils/AppConfig';

export const metadata: Metadata = {
  metadataBase: new URL('https://drexfyvisa.com'),
  title: {
    default: 'Drexfy Visa – Your Gateway to a Digital Nomad Life in Portugal',
    template: '%s | Drexfy Visa',
  },
  description: 'Simplified visas and relocation solutions for digital nomads, tech entrepreneurs, and creative professionals looking to move to Portugal.',
  keywords: ['Portugal visa', 'digital nomad visa', 'entrepreneur visa', 'creative visa', 'Portugal relocation', 'visa application', 'Portugal immigration'],
  authors: [{ name: 'Drexfy Visa Team' }],
  creator: 'Drexfy Visa',
  publisher: 'Drexfy Visa',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://drexfyvisa.com',
    siteName: 'Drexfy Visa',
    title: 'Drexfy Visa – Your Gateway to a Digital Nomad Life in Portugal',
    description: 'Simplified visas and relocation solutions for digital nomads, tech entrepreneurs, and creative professionals looking to move to Portugal.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Drexfy Visa - Portugal Visa Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@drexfyvisa',
    creator: '@drexfyvisa',
    title: 'Drexfy Visa – Your Gateway to a Digital Nomad Life in Portugal',
    description: 'Simplified visas and relocation solutions for digital nomads, tech entrepreneurs, and creative professionals looking to move to Portugal.',
    images: ['/og-image.jpg'],
  },
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
  alternates: {
    canonical: 'https://drexfyvisa.com',
    languages: {
      en: 'https://drexfyvisa.com/en',
      pt: 'https://drexfyvisa.com/pt',
      fr: 'https://drexfyvisa.com/fr',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export function generateStaticParams() {
  return AllLocales.map(locale => ({ locale }));
}

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);

  // Using internationalization in Client Components
  const messages = useMessages();

  // The `suppressHydrationWarning` in <html> is used to prevent hydration errors caused by `next-themes`.
  // Solution provided by the package itself: https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app

  // The `suppressHydrationWarning` attribute in <body> is used to prevent hydration errors caused by Sentry Overlay,
  // which dynamically adds a `style` attribute to the body tag.
  return (
    <html lang={props.params.locale} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased" suppressHydrationWarning>
        {/* PRO: Dark mode support for Shadcn UI */}
        <NextIntlClientProvider
          locale={props.params.locale}
          messages={messages}
        >
          {props.children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
