import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Stories, visuals, and discoverable content',
      description: 'Explore articles, images, listings, and curated posts through a cleaner reading-first experience.',
      openGraphTitle: 'Stories, visuals, and discoverable content',
      openGraphDescription: 'Discover articles, visual posts, and connected content through a calmer reading-first experience.',
      keywords: ['story platform', 'article site', 'visual content', 'content discovery'],
    },
    hero: {
      badge: 'Latest stories and visuals',
      title: ['A thoughtful home for', 'stories, visuals, and discovery.'],
      description: 'Explore fresh articles, image-led posts, and discoverable content across the platform through a calmer and clearer browsing experience.',
      primaryCta: { label: 'Read latest stories', href: '/article' },
      secondaryCta: { label: 'Explore visuals', href: '/image' },
      searchPlaceholder: 'Search stories, visuals, listings, and more',
      focusLabel: 'Focus',
      featureCardBadge: 'latest cover rotation',
      featureCardTitle: 'Latest posts shape the visual identity of the homepage.',
      featureCardDescription: 'Recent images and stories stay at the center of the experience without changing any core platform behavior.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for reading, browsing, and connecting different kinds of content.',
      paragraphs: [
        'This site brings together article-style reading, visual browsing, and structured discovery so visitors can move naturally between different content types.',
        'Instead of separating stories, visuals, and supporting resources into disconnected surfaces, the platform keeps them connected in one place with consistent navigation and easier exploration.',
        'Whether someone starts with a story, an image-led post, a listing, or a resource page, they can keep discovering related content without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Reading-first homepage with stronger emphasis on stories and imagery.',
        'Connected sections for articles, visuals, listings, and supporting resources.',
        'Cleaner browsing rhythm designed to make exploration feel easier.',
        'Lightweight interactions that keep the experience fast and readable.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'See visuals', href: '/image' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Explore articles, visuals, and resources through one connected experience.',
      description: 'Move between articles, image-led posts, listings, and resources through one clearer and more connected visual system.',
      primaryCta: { label: 'Browse Articles', href: '/article' },
      secondaryCta: { label: 'Contact Sales', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About Us',
    title: 'A premium home for visual discovery.',
    description: `${slot4BrandConfig.siteName} brings together image-first publishing, profile storytelling, and clean discovery in one refined experience.`,
    paragraphs: [
      'Our approach is simple: strong visuals, clear structure, and thoughtful pacing from the first scroll to the final click.',
      'Every surface is designed to help people find meaningful content quickly while still feeling curated and editorial.',
    ],
    values: [
      {
        title: 'Visual-first experience',
        description: 'We prioritize imagery, spacing, and hierarchy so each page feels elegant and easy to navigate.',
      },
      {
        title: 'Connected discovery flow',
        description: 'Images, profiles, and supporting content remain connected so discovery feels natural across the site.',
      },
      {
        title: 'Consistent quality',
        description: 'We focus on clean navigation and balanced layouts to keep the browsing experience polished and dependable.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Let’s build something visually exceptional.',
    description: 'Share what you are planning, launching, or improving. We will guide your request to the right team with clear next steps.',
    formTitle: 'Send a message',
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
