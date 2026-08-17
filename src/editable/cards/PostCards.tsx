import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim()
const cleanTitle = (post: SitePost) => stripHtml(post.title || '')

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || ''
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured read' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="group block overflow-hidden bg-[#0f0f1a] transition duration-300 hover:-translate-y-0.5">
      <div className="relative min-h-[520px] lg:min-h-[620px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a]/90 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/50">{label}</p>
          <h3 className="mt-4 max-w-3xl text-[clamp(2rem,4vw,3.5rem)] font-light leading-[0.92] tracking-[-0.02em] text-white">{cleanTitle(post)}</h3>
          <p className="mt-5 max-w-2xl text-[14px] leading-[1.8] text-white/55">{getEditableExcerpt(post, 190)}</p>
          <span className="mt-6 inline-flex items-center gap-2 border-b border-white/30 pb-1 text-[12px] font-medium uppercase tracking-[0.18em] text-white/70">
            Read story <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index: _index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block w-[160px] shrink-0 snap-start overflow-hidden transition duration-300 hover:-translate-y-0.5 sm:w-[180px]">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="mt-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#5b21b6]">{getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-3 text-[15px] font-medium leading-tight tracking-[-0.01em] text-[#1a1a2e]">{cleanTitle(post)}</h3>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex items-start gap-5 border-b border-black/6 py-5 transition duration-300 hover:bg-[#fafaf6]">
      <span className="shrink-0 text-[14px] text-[#1a1a2e]/30">{String(index + 1).padStart(2, '0')}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#5b21b6]">{getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-2 text-[18px] font-medium leading-tight tracking-[-0.01em] text-[#1a1a2e]">{cleanTitle(post)}</h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-[1.7] text-[#1a1a2e]/50">{getEditableExcerpt(post, 105)}</p>
      </div>
      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[#1a1a2e]/25 transition group-hover:text-[#5b21b6]" />
    </Link>
  )
}

export function ArticleListCard({ post, href, index: _index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-w-0 gap-5 border border-black/6 bg-white p-4 transition duration-300 hover:-translate-y-0.5 sm:grid-cols-[240px_minmax(0,1fr)]">
      <div className="relative aspect-[16/12] overflow-hidden sm:aspect-auto sm:min-h-[200px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0 p-2 sm:py-4 sm:pr-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#5b21b6]">{getEditableCategory(post)}</p>
        <h2 className="mt-3 line-clamp-3 text-[22px] font-medium leading-tight tracking-[-0.02em] text-[#1a1a2e] sm:text-[26px]">{cleanTitle(post)}</h2>
        <p className="mt-4 line-clamp-3 text-[14px] leading-[1.8] text-[#1a1a2e]/50">{getEditableExcerpt(post, 180)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-[#1a1a2e]/50 transition group-hover:text-[#5b21b6]">
          View image <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  )
}
