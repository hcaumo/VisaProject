import '@/styles/global.css';

import type { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ThemeProvider } from 'next-themes';
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
      rel: 'icon',
      url: '/favicon.ico',
    },
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
        {/* Force light mode with CSS that overrides dark mode styles */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            color-scheme: light !important;
          }
          
          /* Override all dark mode styles */
          .dark, [data-theme="dark"] {
            --background: 0 0% 100% !important;
            --foreground: 222.2 84% 4.9% !important;
            --card: 0 0% 100% !important;
            --card-foreground: 222.2 84% 4.9% !important;
            --popover: 0 0% 100% !important;
            --popover-foreground: 222.2 84% 4.9% !important;
            --primary: 222.2 47.4% 11.2% !important;
            --primary-foreground: 210 40% 98% !important;
            --secondary: 210 40% 96.1% !important;
            --secondary-foreground: 222.2 47.4% 11.2% !important;
            --muted: 210 40% 96.1% !important;
            --muted-foreground: 215.4 16.3% 46.9% !important;
            --accent: 210 40% 96.1% !important;
            --accent-foreground: 222.2 47.4% 11.2% !important;
            --destructive: 0 84.2% 60.2% !important;
            --destructive-foreground: 210 40% 98% !important;
            --border: 214.3 31.8% 91.4% !important;
            --input: 214.3 31.8% 91.4% !important;
            --ring: 222.2 84% 4.9% !important;
            background-color: white !important;
            color: black !important;
          }
          
          /* Force light mode for all elements with dark mode classes */
          .dark\\:bg-gray-800, .dark\\:bg-gray-900, .dark\\:bg-gray-700, .dark\\:bg-blue-900\\/20, .dark\\:bg-green-900\\/20, .dark\\:bg-purple-900\\/20, .dark\\:bg-pink-900\\/20 {
            background-color: #f9fafb !important; /* light gray background */
          }
          
          .dark\\:text-gray-300, .dark\\:text-gray-200, .dark\\:text-gray-400, .dark\\:text-blue-400, .dark\\:text-blue-200, .dark\\:text-green-200, .dark\\:text-purple-200, .dark\\:text-yellow-200 {
            color: #1f2937 !important; /* dark gray text */
          }
          
          /* Hide any dark-mode only elements */
          .hidden.dark\\:block {
            display: none !important;
          }
          
          /* Show light-mode elements that might be hidden in dark mode */
          .dark\\:hidden {
            display: block !important;
          }
        `}} />
        
        <NextIntlClientProvider
          locale={props.params.locale}
          messages={messages}
        >
          <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
            {/* Script to immediately set light theme and clear any stored theme preference */}
            <script dangerouslySetInnerHTML={{ __html: `
              (function() {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
                try {
                  localStorage.removeItem('theme');
                  localStorage.setItem('theme', 'light');
                } catch (e) {}
              })();
            `}} />
            {props.children}
          </ThemeProvider>
        </NextIntlClientProvider>
        
        {/* Cal element-click embed code */}
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
          (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
          Cal("init", "certificate", {origin:"https://cal.com"});
          Cal.ns["certificate"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
        `}} />
      </body>
    </html>
  );
}
