import Link from 'next/link'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const DUMMY_HOME_IMAGES = [
  { image: 'https://picsum.photos/id/1011/1200/800', title: 'Studio Portrait in Soft Window Light', description: 'Natural skin tones and shallow depth for premium profile pages.' },
  { image: 'https://picsum.photos/id/1027/1200/800', title: 'Minimal Product Scene with Pastel Props', description: 'Clean composition built for modern brand storytelling layouts.' },
  { image: 'https://picsum.photos/id/1031/1200/800', title: 'City Skyline at Blue Hour', description: 'Crisp urban atmosphere ideal for editorial and landing covers.' },
  { image: 'https://picsum.photos/id/1043/1200/800', title: 'Creative Team Collaboration Session', description: 'Authentic workplace moment for business and creator profiles.' },
  { image: 'https://picsum.photos/id/1050/1200/800', title: 'Designer Desk with Color Notes', description: 'A practical workflow visual for production and process pages.' },
  { image: 'https://picsum.photos/id/1060/1200/800', title: 'Technology Flat Lay Composition', description: 'Balanced negative space for interface banners and section art.' },
  { image: 'https://picsum.photos/id/1074/1200/800', title: 'Lifestyle Portrait in Warm Tones', description: 'Friendly framing suitable for bio highlights and feature cards.' },
  { image: 'https://picsum.photos/id/1084/1200/800', title: 'Forest Trail with Morning Mist', description: 'Atmospheric landscape that adds depth to curated collections.' },
  { image: 'https://picsum.photos/id/1080/1200/800', title: 'Mountain Range Under Dramatic Sky', description: 'High-impact travel image for hero modules and visual rails.' },
  { image: 'https://picsum.photos/id/1073/1200/800', title: 'Yellow Meadow in Spring Bloom', description: 'Bright seasonal texture for discovery pages and trend spots.' },
  { image: 'https://picsum.photos/id/1068/1200/800', title: 'Lakeside Reflection at Sunrise', description: 'Quiet scenic frame for premium category covers and features.' },
  { image: 'https://picsum.photos/id/1057/1200/800', title: 'Rural Road Through Open Fields', description: 'Story-driven travel visual with strong horizon and movement.' },
  { image: 'https://picsum.photos/id/1052/1200/800', title: 'Fashion Editorial Street Capture', description: 'Modern styling and candid motion for profile and style hubs.' },
  { image: 'https://picsum.photos/id/1049/1200/800', title: 'Night Market Scene with Neon Highlights', description: 'Rich color contrast for energetic homepage content blocks.' },
  { image: 'https://picsum.photos/id/1039/1200/800', title: 'Coastal Waves and Golden Light', description: 'Wide cinematic image suited for aspirational collection rows.' },
  { image: 'https://picsum.photos/id/1035/1200/800', title: 'Autumn Hillside with Layered Depth', description: 'Natural color gradient for elegant visual library sections.' },
]

export function EditableHomeHero({ primaryRoute }: HomeSectionProps) {
  const lead = DUMMY_HOME_IMAGES[0]
  return (
    <section className="bg-[#0f0f1a]">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[2.2fr_1fr]">
        <div className="relative">
          <div className="relative">
            <img src={lead.image} alt={lead.title} className="h-[520px] w-full object-cover opacity-70 lg:h-[620px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f0f1a]/90" />
          </div>

          <div className="absolute left-0 top-0 px-5 pt-8 sm:px-8 lg:px-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/60">
              Independent business culture / 01&ndash;26
            </p>
          </div>

          <div className="absolute bottom-0 left-0 px-5 pb-6 sm:px-8 lg:px-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/50">
              Real-estate / Featured perspective
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between border-l border-white/6 bg-[#16162a] p-8 lg:p-10">
          <div>
            <p className="max-w-xs text-[14px] leading-[1.85] text-white/55 font-mono">
              {lead.description} Discover carefully selected perspectives and profiles that help shape how business owners think, plan, and grow.
            </p>
            <Link
              href={primaryRoute}
              className="mt-8 inline-flex items-center gap-2 border-b border-white/30 pb-1 text-[12px] font-medium uppercase tracking-[0.18em] text-white/80 transition hover:text-white hover:border-white"
            >
              Read the lead story <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-12 text-right">
            <p className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-white/40">
              Scroll to discover <ArrowDown className="h-3.5 w-3.5" />
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-4 sm:px-8 lg:px-12">
        <h2 className="max-w-4xl text-[clamp(3.5rem,8vw,7rem)] font-light leading-[0.88] tracking-[-0.03em] text-white">
          FREE<br />
          <span className="ml-[5vw]">THINKING.</span>
        </h2>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  return (
    <section className="bg-[#f5f5f0] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[0.92] tracking-[-0.02em] text-[#1a1a2e]">
              A PLACE DEFINED BY INDEPENDENT MOVEMENT.
            </h2>
          </div>
          <div>
            <p className="text-[14px] leading-[1.9] text-[#1a1a2e]/55 font-mono">
              A living index of founders, makers, visual thinkers, and practical ideas. Built to help business owners discover useful perspectives without the usual noise.
            </p>
            <Link
              href={primaryRoute}
              className="mt-8 inline-flex items-center gap-2 border-b border-[#1a1a2e]/30 pb-1 text-[12px] font-medium uppercase tracking-[0.18em] text-[#1a1a2e]/70 transition hover:text-[#1a1a2e] hover:border-[#1a1a2e]"
            >
              Explore the latest <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-20 border-t border-black/8">
          <div className="grid gap-0 md:grid-cols-[1fr_2fr]">
            <div className="border-b border-r border-black/8 py-6 pr-8">
              <p className="text-[14px] text-[#1a1a2e]/40">01</p>
            </div>
            <div className="border-b border-black/8 py-6 pl-8" />
          </div>
          {SITE_CONFIG_TASKS_PLACEHOLDER.map((item) => (
            <div key={item.label} className="grid gap-0 md:grid-cols-[1fr_2fr]">
              <div className="border-b border-r border-black/8 py-6 pr-8">
                <Link
                  href={item.href}
                  className="group flex items-center justify-between"
                >
                  <span className="text-[15px] font-medium uppercase tracking-[0.08em] text-[#1a1a2e]">{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-[#1a1a2e]/40 transition group-hover:text-[#5b21b6]" />
                </Link>
              </div>
              <div className="border-b border-black/8 py-6 pl-8" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const SITE_CONFIG_TASKS_PLACEHOLDER = [
  { label: 'Image', href: '/image' },
  { label: 'Profile', href: '/profile' },
]

export function EditableMagazineSplit({}: HomeSectionProps) {
  const left = DUMMY_HOME_IMAGES.slice(0, 6)
  return (
    <section className="grid lg:grid-cols-2">
      <div className="relative bg-[#f5f5f0] p-5 sm:p-8 lg:p-12">
        <div className="grid grid-cols-2 gap-3">
          {left.map((item, i) => (
            <div key={item.image} className={`overflow-hidden ${i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'}`}>
              <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center bg-[#e8e8e2] p-8 sm:p-12 lg:p-16">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#1a1a2e]/45">Evolving ideas</p>
        <h2 className="mt-5 text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[0.92] tracking-[-0.02em] text-[#1a1a2e]">
          PEOPLE FIRST, IDEAS ALWAYS.
        </h2>
        <p className="mt-6 max-w-md text-[14px] leading-[1.9] text-[#1a1a2e]/55 font-mono">
          Independent perspectives and verified voices. Browse profiles, visual stories, and curated content from business owners and creative professionals.
        </p>
        <Link
          href="/about"
          className="mt-8 inline-flex w-fit items-center gap-2 border-b border-[#1a1a2e]/30 pb-1 text-[12px] font-medium uppercase tracking-[0.18em] text-[#1a1a2e]/70 transition hover:text-[#1a1a2e] hover:border-[#1a1a2e]"
        >
          About the platform <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  )
}

export function EditableTimeCollections({}: HomeSectionProps) {
  const items = DUMMY_HOME_IMAGES.slice(4, 10)
  return (
    <section className="bg-[#0f0f1a] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-end">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/40">Latest from the network</p>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] font-light leading-[0.92] tracking-[-0.02em] text-white">
              FEATURED PERSPECTIVES
            </h2>
          </div>
          <p className="text-[14px] leading-[1.9] text-white/45 font-mono lg:text-right">
            Handpicked stories, visual features, and business profiles selected for quality, originality, and practical value.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={item.image} className={`group relative overflow-hidden ${i === 0 ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2' : ''}`}>
              <img
                src={item.image}
                alt={item.title}
                className={`w-full object-cover transition duration-500 group-hover:scale-105 ${i === 0 ? 'h-full min-h-[480px]' : 'h-[280px]'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-[18px] font-medium leading-tight text-white">{item.title}</h3>
                <p className="mt-2 text-[13px] text-white/55">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="border-t border-black/8 bg-[#f5f5f0] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[0.92] tracking-[-0.02em] text-[#1a1a2e]">
              JOIN THE INDEPENDENT MOVEMENT.
            </h2>
          </div>
          <div>
            <p className="text-[14px] leading-[1.9] text-[#1a1a2e]/55 font-mono">
              Whether you are a founder building in public, a creative sharing your process, or a business owner looking for exposure &mdash; this is your platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup" className="bg-[#5b21b6] px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#4c1d95]">
                Join the network
              </Link>
              <Link href="/contact" className="border border-[#1a1a2e] px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1a1a2e] transition hover:bg-[#1a1a2e] hover:text-white">
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
