import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || '',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: '',
    primaryLinks: [
      { label: 'Image', href: '/image' },
      { label: 'Profile', href: '/profile' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Explore the latest', href: '/' },
      secondary: { label: 'Get in touch', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Independent business culture',
    description: 'A living index of founders, makers, visual thinkers, and practical ideas. Built to help business owners discover useful perspectives.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Images', href: '/image' },
          { label: 'Profiles', href: '/profile' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Independent business culture.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
