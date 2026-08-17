import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#f5f5f0',
  '--slot4-page-text': '#1a1a2e',
  '--slot4-panel-bg': '#ffffff',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#7a7a8a',
  '--slot4-soft-muted-text': '#9a9aaa',
  '--slot4-accent': '#5b21b6',
  '--slot4-accent-fill': '#5b21b6',
  '--slot4-accent-soft': '#7c3aed',
  '--slot4-dark-bg': '#0f0f1a',
  '--slot4-dark-text': '#f5f5f0',
  '--slot4-media-bg': '#e8e8e2',
  '--slot4-cream': '#f5f5f0',
  '--slot4-warm': '#eeeee8',
  '--slot4-lavender': '#f0f0ea',
  '--slot4-gray': '#e5e5df',
  '--slot4-body-gradient': 'none',
  '--editable-container': '1440px',
  '--editable-border': 'rgba(0,0,0,0.08)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-black/15',
  shadow: 'shadow-none',
  shadowStrong: 'shadow-none',
  overlay: 'bg-[linear-gradient(180deg,rgba(15,15,26,0.05),rgba(15,15,26,0.82))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12',
    sectionY: 'py-16 sm:py-20 lg:py-28',
  },
  layout: {
    safeGrid: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[140px] shrink-0 snap-start sm:w-[160px]',
  },
  type: {
    eyebrow: 'text-[11px] font-medium uppercase tracking-[0.22em]',
    heroTitle: 'text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[0.95] tracking-[-0.03em]',
    sectionTitle: 'text-[clamp(2rem,4vw,3.5rem)] font-light leading-[0.95] tracking-[-0.02em]',
    body: 'text-[15px] leading-[1.8] font-normal',
  },
  surface: {
    card: `border ${editablePalette.border} bg-white`,
    soft: `border ${editablePalette.border} bg-[#fafaf6]`,
    dark: `bg-[#0f0f1a] text-[#f5f5f0]`,
  },
  button: {
    primary: `inline-flex items-center justify-center bg-[#5b21b6] px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#4c1d95]`,
    secondary: `inline-flex items-center justify-center border border-[#1a1a2e] bg-transparent px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#1a1a2e] transition hover:bg-[#1a1a2e] hover:text-white`,
    accent: `inline-flex items-center justify-center bg-[#5b21b6] px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#4c1d95]`,
  },
  media: {
    frame: `relative overflow-hidden ${editablePalette.mediaBg}`,
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-0.5',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all homepage sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use wide readable grids; never create skinny columns for paragraphs or cards.',
  'Use horizontal rails for dense post browsing.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
