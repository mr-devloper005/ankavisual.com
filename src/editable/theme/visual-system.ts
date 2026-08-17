import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset =
  | 'editorial-paper'
  | 'luxury-atelier'
  | 'brutalist-index'
  | 'organic-journal'
  | 'tech-directory'
  | 'retro-bulletin'
  | 'visual-gallery'

export const visualPresets = {
  'editorial-paper': {
    label: 'Editorial Paper',
    mood: 'calm magazine authority',
    fontDirection: 'light condensed headlines with quiet sans body',
    colors: {
      background: '#f5f5f0',
      foreground: '#1a1a2e',
      muted: '#7a7a8a',
      primary: '#1a1a2e',
      accent: '#5b21b6',
      surface: '#ffffff',
    },
    shape: 'clean lines, no rounded corners, editorial precision',
  },
  'luxury-atelier': {
    label: 'Luxury Atelier',
    mood: 'premium, restrained, polished',
    fontDirection: 'high-contrast display headings with spacious tracking',
    colors: {
      background: '#f5f5f0',
      foreground: '#1a1a2e',
      muted: '#7a7a8a',
      primary: '#1a1a2e',
      accent: '#5b21b6',
      surface: '#ffffff',
    },
    shape: 'clean panels, thin borders, generous negative space',
  },
  'brutalist-index': {
    label: 'Brutalist Index',
    mood: 'bold, raw, memorable',
    fontDirection: 'condensed headings, mono labels, hard rhythm',
    colors: {
      background: '#f5f5f0',
      foreground: '#1a1a2e',
      muted: '#7a7a8a',
      primary: '#1a1a2e',
      accent: '#5b21b6',
      surface: '#ffffff',
    },
    shape: 'sharp edges, thick borders, offset blocks',
  },
  'organic-journal': {
    label: 'Organic Journal',
    mood: 'warm, natural, trustworthy',
    fontDirection: 'rounded serif or humanist sans with soft captions',
    colors: {
      background: '#f5f5f0',
      foreground: '#1a1a2e',
      muted: '#7a7a8a',
      primary: '#1a1a2e',
      accent: '#5b21b6',
      surface: '#ffffff',
    },
    shape: 'rounded cards, natural spacing, calm texture',
  },
  'tech-directory': {
    label: 'Tech Directory',
    mood: 'clean, fast, useful',
    fontDirection: 'modern sans with crisp mono data accents',
    colors: {
      background: '#f5f5f0',
      foreground: '#1a1a2e',
      muted: '#7a7a8a',
      primary: '#1a1a2e',
      accent: '#5b21b6',
      surface: '#ffffff',
    },
    shape: 'clean grids, pill filters, sharp information hierarchy',
  },
  'retro-bulletin': {
    label: 'Retro Bulletin',
    mood: 'playful, local, energetic',
    fontDirection: 'chunky headings with friendly body type',
    colors: {
      background: '#f5f5f0',
      foreground: '#1a1a2e',
      muted: '#7a7a8a',
      primary: '#1a1a2e',
      accent: '#5b21b6',
      surface: '#ffffff',
    },
    shape: 'stickers, tabs, framed modules, playful dividers',
  },
  'visual-gallery': {
    label: 'Visual Gallery',
    mood: 'cinematic, image-led, immersive',
    fontDirection: 'minimal sans with oversized display moments',
    colors: {
      background: '#f5f5f0',
      foreground: '#1a1a2e',
      muted: '#7a7a8a',
      primary: '#1a1a2e',
      accent: '#5b21b6',
      surface: '#ffffff',
    },
    shape: 'clean cards, large media, editorial overlays',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset:
    slot4BrandConfig.productKind === 'visual'
      ? 'visual-gallery'
      : slot4BrandConfig.productKind === 'editorial'
        ? 'editorial-paper'
        : slot4BrandConfig.productKind === 'directory'
          ? 'tech-directory'
          : 'organic-journal',
  radius: {
    sm: '0',
    md: '0',
    lg: '0',
    xl: '0',
  },
  motion: {
    pageLoad: 'animate-in fade-in slide-in-from-bottom-4 duration-700',
    cardHover: 'transition duration-300 hover:-translate-y-0.5',
    softHover: 'transition duration-300 hover:opacity-80',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-[11px] font-medium uppercase tracking-[0.22em]',
    heroTitle: 'text-5xl text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[0.95] tracking-[-0.03em]',
    sectionTitle: 'text-[clamp(2rem,4vw,3.5rem)] font-light leading-[0.95] tracking-[-0.02em]',
    body: 'text-[15px] leading-[1.8]',
    caption: 'text-[11px] font-medium uppercase tracking-[0.22em]',
  },
  surfaces: {
    glass: 'border border-black/8 bg-white/80 backdrop-blur-xl',
    paper: 'border border-black/8 bg-white',
    quiet: 'border border-black/8 bg-[#fafaf6]',
    dark: 'border border-white/10 bg-[#0f0f1a] text-[#f5f5f0]',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl max-w-[1440px] px-5 sm:px-8 lg:px-12',
    sectionY: 'py-16 sm:py-20 lg:py-28',
    cardGrid: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}
