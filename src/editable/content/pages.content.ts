import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Independent perspectives for business owners',
      description: 'A living index of founders, makers, and visual thinkers. Discover profiles, image stories, and curated content.',
      openGraphTitle: 'Independent perspectives for business owners',
      openGraphDescription: 'A playful directory of founders, makers, and visual thinkers built for business owners.',
      keywords: ['business directory', 'visual index', 'founder profiles', 'independent perspectives'],
    },
    hero: {
      badge: 'Independent business culture',
      title: ['A place defined by', 'independent movement.'],
      description: 'A living index of founders, makers, visual thinkers, and practical ideas. Built to help business owners discover useful perspectives without the usual noise.',
      primaryCta: { label: 'Explore the latest', href: '/image' },
      secondaryCta: { label: 'Browse profiles', href: '/profile' },
      searchPlaceholder: 'Search the directory',
      focusLabel: 'Focus',
      featureCardBadge: 'Featured perspective',
      featureCardTitle: 'Independent voices shape how business owners think and grow.',
      featureCardDescription: 'Handpicked visual stories and profiles selected for quality, originality, and practical value.',
    },
    intro: {
      badge: 'About the platform',
      title: 'A place defined by independent movement.',
      paragraphs: [
        'This platform brings together image-first storytelling, verified profiles, and curated perspectives so business owners can discover what matters.',
        'Instead of generic feeds and algorithm-driven content, the experience stays editorial and human-curated with consistent quality.',
        'Whether someone starts with a visual story, a profile, or a curated collection, they keep discovering without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Image-led homepage with visual storytelling and editorial pacing.',
        'Connected sections for profiles, visual features, and curated content.',
        'Cleaner browsing rhythm designed for business owners.',
        'Lightweight interactions that keep the experience fast and focused.',
      ],
      primaryLink: { label: 'Browse images', href: '/image' },
      secondaryLink: { label: 'See profiles', href: '/profile' },
    },
    cta: {
      badge: 'Join the movement',
      title: 'Join the independent movement.',
      description: 'Whether you are a founder building in public, a creative sharing your process, or a business owner looking for exposure — this is your platform.',
      primaryCta: { label: 'Join the network', href: '/signup' },
      secondaryCta: { label: 'Get in touch', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About Us',
    title: 'A premium home for independent perspectives.',
    description: `${slot4BrandConfig.siteName} brings together image-first publishing, profile storytelling, and clean discovery in one refined experience for business owners.`,
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

  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the directory.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find stories, profiles, visuals, and resources faster.',
      description: 'Use keywords, categories, and content types to discover posts from every active section of the directory.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the directory.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create new content.',
      description: 'Use your account to open the publishing workspace and create posts for the active sections of this directory.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create content for every active section.',
      description: 'Choose the content type, add details, and prepare a clean post with images, links, summary, and body content.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this directory.',
      badge: 'Member access',
      title: 'Welcome back to your publishing space.',
      description: 'Login to continue browsing, managing submissions, and creating new content from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this directory.',
      badge: 'Directory access',
      title: 'Create your account and start publishing.',
      description: 'Create an account to access the publishing workspace, save details, and submit content through the directory.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
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
      relatedTitle: 'Suggested profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
