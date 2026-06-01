import Link from 'next/link'
import { Search } from 'lucide-react'
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
  return (
    <section className="relative overflow-hidden bg-[#08090d]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_42%,#c9111f_0,#810000_35%,transparent_60%)] opacity-90" />
      <div className="relative mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h1 className="text-center text-5xl font-black tracking-[-0.05em] text-white sm:text-6xl">This is where great work starts</h1>
        <div className="mx-auto mt-9 flex w-full justify-center">
          <form action="/search" className="flex w-full max-w-[920px] min-w-0 overflow-hidden rounded-xl border border-white/20 bg-white">
            <input name="q" placeholder="Search from the directory" className="h-14 min-w-0 flex-1 px-4 text-base outline-none" />
            <button className="inline-flex h-14 items-center justify-center bg-[#e91f32] px-5 text-white" type="submit"><Search className="h-5 w-5" /></button>
          </form>
        </div>
        <div className="mt-10 text-center"><Link href={primaryRoute} className="rounded-full bg-white px-8 py-3 text-sm font-black text-black">Browse all content</Link></div>
      </div>
    </section>
  )
}

export function EditableStoryRail({}: HomeSectionProps) {
  return (
    <section className="bg-[#ececec] py-14">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-black tracking-[-0.05em] text-black">Content at your fingertips</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {DUMMY_HOME_IMAGES.slice(0, 4).map((item) => (
            <div key={item.image} className="group relative overflow-hidden rounded-xl">
              <img src={item.image} alt={item.title} className="h-[430px] w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-white">
                <h3 className="text-3xl font-black">{item.title}</h3>
                <p className="mt-1 text-sm text-white/85">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({}: HomeSectionProps) {
  const items = DUMMY_HOME_IMAGES.slice(4, 16)
  return (
    <section className="bg-[#ececec] pb-14">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-black tracking-[-0.05em] text-black">Explore popular and handpicked visuals</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {['Spring flowers', 'Business', 'Adventure', 'Landscape', 'Sustainability'].map((tag) => <button key={tag} type="button" className="rounded-full border border-black/20 px-4 py-2 text-sm">{tag}</button>)}
        </div>
        <div className="mt-8 columns-1 gap-4 space-y-4 md:columns-3">
          {items.map((item, index) => (
            <div key={item.image} className="group block break-inside-avoid overflow-hidden rounded-xl bg-white">
              <img src={item.image} alt={item.title} className={`${index % 3 === 0 ? 'h-[340px]' : 'h-[240px]'} w-full object-cover transition duration-500 group-hover:scale-105`} />
              <div className="p-4">
                <h3 className="line-clamp-2 text-xl font-black">{item.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-black/70">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({}: HomeSectionProps) {
  const merged = DUMMY_HOME_IMAGES.slice(8, 16)
  return (
    <section className="bg-[#ececec] py-14">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-black tracking-[-0.05em]">Curated collections backed by AI</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {merged.slice(0, 4).map((item) => (
            <div key={item.image} className="group relative overflow-hidden rounded-xl">
              <img src={item.image} alt={item.title} className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-white">
                <h3 className="text-3xl font-black">{item.title}</h3>
                <p className="mt-1 text-sm text-white/85">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return null
}
