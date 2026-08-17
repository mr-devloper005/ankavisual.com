import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight, Bookmark, BriefcaseBusiness, Building2, Camera, ChevronDown, Download, FileText, MapPin, Megaphone, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const image = asText(content.image) || asText(content.featuredImage) || asText(content.thumbnail)
  const logo = asText(content.logo)
  return [...media, ...images, ...(isUrl(image) ? [image] : []), ...(isUrl(logo) ? [logo] : [])].filter(Boolean).slice(0, 8)
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim()
const clean = (value: string) => stripHtml(value)
const getImage = (post: SitePost) => getImages(post)[0] || ''
const getCategory = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const getSummary = (post: SitePost) => stripHtml(post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || asText(getContent(post).body))
const getTitle = (post: SitePost) => clean(post.title || '')
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; archiveClass: string; promise: string; badge: string }> = {
  article: { icon: FileText, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Readable editorial cards with room for headlines and excerpts.', badge: 'Read' },
  listing: { icon: Building2, archiveClass: 'grid gap-5 xl:grid-cols-2', promise: 'Directory cards highlight company identity, location, contacts, and service details.', badge: 'Business' },
  classified: { icon: Megaphone, archiveClass: 'grid gap-5 xl:grid-cols-2', promise: 'Offer-board cards prioritize price, location, condition, and quick action.', badge: 'Offer' },
  image: { icon: Camera, archiveClass: 'columns-1 gap-5 space-y-5 md:columns-2 xl:columns-3', promise: 'Gallery-first browsing with strong visuals and compact captions.', badge: 'Gallery' },
  sbm: { icon: Bookmark, archiveClass: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3', promise: 'Bookmark cards stay mostly text-based so saved resources scan quickly.', badge: 'Bookmark' },
  pdf: { icon: Download, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Document cards surface file context, download intent, and summary.', badge: 'PDF' },
  profile: { icon: UserRound, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-4', promise: 'Profile cards focus on identity, short bio, and direct discovery.', badge: 'Profile' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const archiveVars = { '--archive-bg': '#f5f5f0', '--archive-text': '#1a1a2e', '--archive-surface': '#ffffff', '--archive-accent': '#5b21b6' } as CSSProperties
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category
  const isImageTask = task === 'image'
  const isProfileTask = task === 'profile'

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="bg-[#f5f5f0] text-[#1a1a2e]">
        <section className="border-b border-black/6">
          <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#5b21b6]">
              Visual index &bull; {label}
            </p>
            <h1 className="mt-6 max-w-5xl text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[0.92] tracking-[-0.03em]">
              {voice?.headline || `Browse ${label}`}
            </h1>
            <p className="mt-6 max-w-3xl text-[15px] leading-[1.8] text-[#1a1a2e]/55 font-mono">
              {voice?.description || deck.promise}
            </p>

            {voice?.chips?.length ? (
              <div className="mt-8 flex flex-wrap gap-2">
                {voice.chips.map((chip) => (
                  <span key={chip} className="border border-[#1a1a2e]/15 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.12em] text-[#1a1a2e]/70">
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section className="border-b border-black/6">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-12">
            <p className="text-[14px] text-[#1a1a2e]/50">
              <span className="font-medium text-[#1a1a2e]">{posts.length}</span> posts &middot; {categoryLabel}
            </p>
            <form action={basePath} className="flex items-center gap-3">
              <div className="relative">
                <select name="category" defaultValue={category} className="h-10 appearance-none border border-black/10 bg-white px-4 pr-10 text-[13px] font-medium uppercase tracking-[0.1em] outline-none">
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1a1a2e]/40" />
              </div>
              <button className="h-10 bg-[#5b21b6] px-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#4c1d95]">Apply</button>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
          {posts.length ? (
            isImageTask ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {posts.map((post, index) => <ImageArchiveCard key={post.id || post.slug} post={post} href={post.slug ? `/image/${post.slug}` : buildPostUrl(task, post.slug)} index={index} />)}
              </div>
            ) : isProfileTask ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {posts.map((post) => <ProfileArchiveCard key={post.id || post.slug} post={post} href={`${basePath}/${post.slug}`} />)}
              </div>
            ) : (
              <div className={deck.archiveClass}>
                {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
              </div>
            )
          ) : (
            <div className="border border-dashed border-black/15 py-20 text-center">
              <Search className="mx-auto h-6 w-6 text-[#1a1a2e]/30" />
              <h2 className="mt-5 text-[clamp(1.5rem,3vw,2.5rem)] font-light tracking-[-0.02em]">No posts found</h2>
              <p className="mt-3 text-[14px] text-[#1a1a2e]/50">Try another category or check back after new content is published.</p>
            </div>
          )}

          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="border border-[#1a1a2e]/15 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.14em] transition hover:bg-[#1a1a2e] hover:text-white">Previous</Link> : null}
            <span className="bg-[#1a1a2e] px-6 py-3 text-[12px] font-medium uppercase tracking-[0.14em] text-white">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="border border-[#1a1a2e]/15 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.14em] transition hover:bg-[#1a1a2e] hover:text-white">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}` || buildPostUrl(task, post.slug)
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return <ArticleArchiveCard post={post} href={href} index={index} />
}

function ArticleArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  const category = getCategory(post, 'Article')
  return (
    <Link href={href} className="group block overflow-hidden border border-black/6 bg-white transition duration-300 hover:-translate-y-0.5">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 bg-white px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em]">{category}</span>
      </div>
      <div className="p-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#5b21b6]">Story {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-2 line-clamp-2 text-[18px] font-medium leading-tight tracking-[-0.01em]">{getTitle(post)}</h2>
        <p className="mt-3 line-clamp-3 text-[13px] leading-[1.7] text-[#1a1a2e]/50">{getSummary(post)}</p>
      </div>
    </Link>
  )
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const logo = getImages(post)[0]
  const location = getField(post, ['location', 'address', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const website = getField(post, ['website', 'url'])
  return (
    <Link href={href} className="group grid gap-5 border border-black/6 bg-white p-5 transition duration-300 hover:-translate-y-0.5 sm:grid-cols-[100px_1fr]">
      <div className="flex h-24 w-24 items-center justify-center overflow-hidden border border-black/8 bg-[#f5f5f0]">
        {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <BriefcaseBusiness className="h-8 w-8 text-[#1a1a2e]/30" />}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <span className="bg-[#1a1a2e] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white">Directory</span>
          {location ? <span className="inline-flex items-center gap-1 border border-black/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em]"><MapPin className="h-3 w-3" /> {location}</span> : null}
        </div>
        <h2 className="mt-4 text-[20px] font-medium leading-tight tracking-[-0.02em]">{getTitle(post)}</h2>
        <p className="mt-3 line-clamp-2 text-[13px] leading-[1.7] text-[#1a1a2e]/50">{getSummary(post)}</p>
        <div className="mt-4 grid gap-2 text-[12px] text-[#1a1a2e]/50 sm:grid-cols-2">
          {phone ? <span>Phone: {phone}</span> : null}
          {website ? <span>Website available</span> : null}
        </div>
      </div>
    </Link>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const image = getImages(post)[0]
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'type', 'availability'])
  return (
    <Link href={href} className="group grid overflow-hidden border border-black/6 bg-white transition duration-300 hover:-translate-y-0.5 sm:grid-cols-[0.7fr_1fr]">
      <div className="relative bg-[#0f0f1a] p-6 text-white">
        <span className="bg-white/15 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em]">Classified</span>
        <h2 className="mt-8 text-[28px] font-light leading-[1] tracking-[-0.02em]">{price || 'Open offer'}</h2>
        <p className="mt-4 text-[13px] text-white/55">{location || condition || 'Details inside'}</p>
        {image ? <img src={image} alt="" className="absolute bottom-4 right-4 h-16 w-16 object-cover opacity-70" /> : null}
      </div>
      <div className="p-6">
        <h2 className="text-[20px] font-medium leading-tight tracking-[-0.02em]">{getTitle(post)}</h2>
        <p className="mt-4 line-clamp-4 text-[13px] leading-[1.7] text-[#1a1a2e]/50">{getSummary(post)}</p>
        <p className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#5b21b6]">View listing <ArrowUpRight className="h-3.5 w-3.5" /></p>
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index: _index }: { post: SitePost; href: string; index: number }) {
  const images = getImages(post)
  const mainImage = images[0] || ''
  const secondaryImages = images.slice(1, 4)

  return (
    <Link href={href} className="group block overflow-hidden border border-black/6 bg-white transition duration-300 hover:-translate-y-0.5">
      <div className="grid grid-cols-2 gap-[2px] bg-[#e8e8e2]">
        <div className={`${secondaryImages.length ? 'row-span-2' : 'col-span-2'} overflow-hidden`}>
          <img src={mainImage} alt="" className={`w-full object-cover transition duration-500 group-hover:scale-105 ${secondaryImages.length ? 'h-[240px]' : 'h-[200px]'}`} />
        </div>
        {secondaryImages.map((img, i) => (
          <div key={`${img}-${i}`} className="overflow-hidden">
            <img src={img} alt="" className="h-[119px] w-full object-cover transition duration-500 group-hover:scale-105" />
          </div>
        ))}
      </div>
      <div className="p-5">
        <h2 className="line-clamp-2 text-[16px] font-medium leading-tight tracking-[-0.01em]">{getTitle(post)}</h2>
        <p className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1a1a2e]/40 transition group-hover:text-[#5b21b6]">
          View image <ArrowUpRight className="h-3 w-3" />
        </p>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <Link href={href} className="group block border border-black/6 bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:bg-[#0f0f1a] hover:text-white">
      <div className="flex items-center justify-between gap-3">
        <span className="border border-current/20 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em]">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-4 w-4 text-current/40" />
      </div>
      <h2 className="mt-8 text-[20px] font-medium leading-tight tracking-[-0.02em]">{getTitle(post)}</h2>
      <p className="mt-4 line-clamp-4 text-[13px] leading-[1.7] opacity-50">{getSummary(post)}</p>
      {website ? <p className="mt-5 truncate text-[11px] font-medium uppercase tracking-[0.14em] opacity-40">{website.replace(/^https?:\/\//, '')}</p> : null}
    </Link>
  )
}

function PdfArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const category = getCategory(post, 'PDF')
  return (
    <Link href={href} className="group border border-black/6 bg-white p-6 transition duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        <div className="bg-[#0f0f1a] p-4 text-white"><FileText className="h-6 w-6" /></div>
        <span className="bg-[#f5f5f0] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em]">{category}</span>
      </div>
      <h2 className="mt-6 text-[20px] font-medium leading-tight tracking-[-0.02em]">{getTitle(post)}</h2>
      <p className="mt-4 line-clamp-4 text-[13px] leading-[1.7] text-[#1a1a2e]/50">{getSummary(post)}</p>
      <p className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#5b21b6]">Open document <Download className="h-3.5 w-3.5" /></p>
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const avatar = getImages(post)[0]
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="group block overflow-hidden border border-black/6 bg-white transition duration-300 hover:-translate-y-0.5">
      <div className="h-20 bg-[#0f0f1a]" />
      <div className="-mt-10 p-6 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden border-4 border-white bg-[#e8e8e2]">
          {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-8 w-8 text-[#1a1a2e]/30" />}
        </div>
        <h2 className="mt-4 text-[18px] font-medium leading-tight tracking-[-0.01em]">{getTitle(post)}</h2>
        {role ? <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#5b21b6]">{role}</p> : null}
        <p className="mt-4 line-clamp-3 text-[13px] leading-[1.7] text-[#1a1a2e]/50">{getSummary(post)}</p>
      </div>
    </Link>
  )
}
