import type { MetadataRoute } from 'next';

import { AllLocales } from '@/utils/AppConfig';
import { getBaseUrl } from '@/utils/Helpers';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const currentDate = new Date();

  // Define the main pages
  const pages = [
    {
      url: '/',
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: '/digital-nomad-visa',
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: '/entrepreneur-visa',
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: '/creative-visa',
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: '/how-it-works',
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: '/community',
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: '/about',
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: '/contact',
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: '/blog',
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: '/terms',
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: '/privacy',
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  // Create sitemap entries for all locales
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add default (non-locale) URLs
  pages.forEach((page) => {
    sitemapEntries.push({
      url: `${baseUrl}${page.url}`,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  });

  // Add localized URLs
  AllLocales.forEach((locale) => {
    pages.forEach((page) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page.url}`,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    });
  });

  return sitemapEntries;
}
