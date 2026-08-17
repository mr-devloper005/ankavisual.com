import Link from 'next/link'
import type { CSSProperties } from 'react'
import { notFound } from 'next/navigation'
import { ArrowLeft, Bookmark, Building2, CheckCircle2, Download, ExternalLink, FileText, Globe2, Mail, MapPin, MessageCircle, Phone, Tag, UserRound } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { buildPostUrl, fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export const revalidate = 3

export async function generateEditableDetailMetadata(task: TaskKey, params: Promise<{ slug?: string; username?: string }>) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  return post ? await buildPostMetadata(task, post) : await buildTaskMetadata(task)
}

export async function EditableTaskDetailRoute({ task, params }: { task: TaskKey; params: Promise<{ slug?: string; username?: string }> }) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 7)).filter((item) => item.slug !== post.slug).slice(0, 4)
  const comments = task === 'article' ? await fetchArticleComments(post.slug, 50) : []
  return <TaskDetailView task={task} post={post} related={related} comments={comments} />
}

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const singleImages = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...singleImages].filter(Boolean).slice(0, 12)
}

const getBody = (post: SitePost) => {
  const content = getContent(post)
  return asText(content.body) || asText(content.description) || asText(content.details) || post.summary || 'Details will appear here once available.'
}

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')

const safeUrl = (value: string) => /^https?:\/\//i.test(value) ? value : '#'

const linkifyMarkdown = (value: string) => value
  .replace(/\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gi, (_match, label, url) => `<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${label}</a>`)

const linkifyText = (value: string) => linkifyMarkdown(value)
  .replace(/(^|[\s(>])((https?:\/\/)[^\s<)]+)/gi, (_match, prefix, url) => `${prefix}<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${url}</a>`)

const hardenLinks = (html: string) => html.replace(/<a\s+([^>]*href=["'][^"']+["'][^>]*)>/gi, (_match, attrs) => {
  let next = String(attrs).replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  if (!/\starget=/i.test(next)) next += ' target="_blank"'
  if (!/\srel=/i.test(next)) next += ' rel="nofollow noopener noreferrer"'
  return `<a ${next}>`
})

const sanitizeHtml = (html: string) => hardenLinks(html
  .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/<(iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi, '')
  .replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  .replace(/(href|src)=(['"])javascript:[\s\S]*?\2/gi, '$1="#"'))

const formatPlainText = (raw: string) => {
  const value = raw.trim()
  if (!value) return ''
  if (/<[a-z][\s\S]*>/i.test(value)) return sanitizeHtml(linkifyMarkdown(value))
  return value
    .split(/\n{2,}/)
    .map((part) => `<p>${linkifyText(escapeHtml(part).replace(/\n/g, '<br />'))}</p>`)
    .join('')
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim()
const summaryText = (post: SitePost) => post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || ''
const plainSummary = (post: SitePost) => stripHtml(summaryText(post))
const cleanTitle = (post: SitePost) => stripHtml(post.title || '')
const categoryOf = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const mapSrcFor = (post: SitePost) => {
  const address = getField(post, ['address', 'location', 'city'])
  const lat = getField(post, ['lat', 'latitude'])
  const lng = getField(post, ['lng', 'lon', 'longitude'])
  if (lat && lng) return `https://maps.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}&z=14&output=embed`
  if (address) return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=13&output=embed`
  return ''
}

export function TaskDetailView({ task, post, related, comments = [] }: { task: TaskKey; post: SitePost; related: SitePost[]; comments?: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const detailVars = { '--detail-bg': '#f5f5f0', '--detail-text': '#1a1a2e', '--detail-surface': '#ffffff', '--detail-accent': '#5b21b6' } as CSSProperties

  return (
    <EditableSiteShell>
      <main style={detailVars} className="bg-[#f5f5f0] text-[#1a1a2e]">
        {task === 'listing' ? <ListingDetail post={post} related={related} /> : null}
        {task === 'classified' ? <ClassifiedDetail post={post} related={related} /> : null}
        {task === 'image' ? <ImageDetail post={post} related={related} /> : null}
        {task === 'sbm' ? <BookmarkDetail post={post} related={related} /> : null}
        {task === 'pdf' ? <PdfDetail post={post} related={related} /> : null}
        {task === 'profile' ? <ProfileDetail post={post} related={related} /> : null}
        {task === 'article' ? <ArticleDetail post={post} related={related} comments={comments} /> : null}
      </main>
    </EditableSiteShell>
  )
}

function BackLink({ task }: { task: TaskKey }) {
  const taskConfig = getTaskConfig(task)
  return (
    <Link href={taskConfig?.route || '/'} className="inline-flex items-center gap-2 border border-[#1a1a2e]/15 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em] transition hover:bg-[#1a1a2e] hover:text-white">
      <ArrowLeft className="h-3.5 w-3.5" /> Back to {taskConfig?.label || 'posts'}
    </Link>
  )
}

function ArticleDetail({ post, related, comments }: { post: SitePost; related: SitePost[]; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const images = getImages(post)
  return (
    <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-12 lg:py-20">
      <article className="min-w-0 border border-black/6 bg-white p-6 sm:p-10 lg:p-14">
        <BackLink task="article" />
        <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.22em] text-[#5b21b6]">{categoryOf(post, 'Article')}</p>
        <h1 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-light leading-[0.95] tracking-[-0.02em]">{cleanTitle(post)}</h1>
        {images[0] ? <img src={images[0]} alt="" className="mt-10 max-h-[560px] w-full object-cover" /> : null}
        <BodyContent post={post} />
        <EditableComments slug={post.slug} comments={comments} />
      </article>
      <RelatedPanel task="article" post={post} related={related} />
    </section>
  )
}

function ListingDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const logo = images[0]
  const address = getField(post, ['address', 'location', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  const mapSrc = mapSrcFor(post)
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
      <BackLink task="listing" />
      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
        <article className="border border-black/6 bg-white p-6 sm:p-10">
          <div className="grid gap-6 sm:grid-cols-[120px_1fr]">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden border border-black/8 bg-[#f5f5f0]">
              {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <Building2 className="h-12 w-12 text-[#1a1a2e]/25" />}
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#5b21b6]">Business listing</p>
              <h1 className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-light leading-[0.95] tracking-[-0.02em]">{cleanTitle(post)}</h1>
              <p className="mt-5 max-w-3xl text-[15px] leading-[1.8] text-[#1a1a2e]/55">{plainSummary(post)}</p>
            </div>
          </div>
          <InfoGrid items={[['Location', address, MapPin], ['Phone', phone, Phone], ['Email', email, Mail], ['Website', website, Globe2]]} />
          <BodyContent post={post} />
          <ImageStrip images={images.slice(1)} label="Business showcase" />
        </article>
        <aside className="space-y-5">
          {mapSrc ? <MapBox src={mapSrc} label={address || post.title} /> : <ContactAction website={website} phone={phone} email={email} />}
          {mapSrc ? <ContactAction website={website} phone={phone} email={email} /> : null}
          <RelatedPanel task="listing" post={post} related={related} compact />
        </aside>
      </div>
    </section>
  )
}

function ClassifiedDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'availability', 'type'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  return (
    <section className="mx-auto grid max-w-[1440px] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-20">
      <aside className="border border-black/6 bg-[#0f0f1a] p-8 text-white lg:sticky lg:top-24 lg:self-start">
        <BackLink task="classified" />
        <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.22em] text-white/40">Classified notice</p>
        <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-light leading-[0.95] tracking-[-0.02em]">{cleanTitle(post)}</h1>
        <div className="mt-8 grid gap-3">
          {price ? <BadgeLine label="Price" value={price} /> : null}
          {condition ? <BadgeLine label="Condition" value={condition} /> : null}
          {location ? <BadgeLine label="Location" value={location} /> : null}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {phone ? <a href={`tel:${phone}`} className="bg-white px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0f0f1a]">Call now</a> : null}
          {email ? <a href={`mailto:${email}`} className="border border-white/20 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em]">Email</a> : null}
        </div>
      </aside>
      <article className="border border-black/6 bg-white p-6 sm:p-10">
        <ImageStrip images={images} label="Offer images" large />
        <BodyContent post={post} />
        <ContactAction website={website} phone={phone} email={email} />
        <RelatedPanel task="classified" post={post} related={related} />
      </article>
    </section>
  )
}

function ImageDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const hero = images[0]
  const gallery = images.slice(1)
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
      <BackLink task="image" />

      <article className="mt-8 overflow-hidden border border-black/6 bg-white">
        {hero ? (
          <div className="relative">
            <img src={hero} alt={post.title} className="h-[44vh] w-full object-cover sm:h-[52vh] lg:h-[64vh]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a]/80 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/50">Visual feature</p>
              <h1 className="mt-4 max-w-4xl text-[clamp(2rem,5vw,4rem)] font-light leading-[0.92] tracking-[-0.02em] text-white">{cleanTitle(post)}</h1>
              {plainSummary(post) ? <p className="mt-4 max-w-3xl text-[14px] leading-[1.8] text-white/60">{plainSummary(post)}</p> : null}
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-10 lg:p-14">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#5b21b6]">Visual feature</p>
            <h1 className="mt-4 max-w-4xl text-[clamp(2rem,5vw,4rem)] font-light leading-[0.92] tracking-[-0.02em]">{cleanTitle(post)}</h1>
            {plainSummary(post) ? <p className="mt-4 max-w-3xl text-[15px] leading-[1.8] text-[#1a1a2e]/55">{plainSummary(post)}</p> : null}
          </div>
        )}

        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="border border-black/6 bg-[#fafaf6] p-6">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#5b21b6]">Story notes</h2>
            <BodyContent post={post} compact />
          </aside>

          {gallery.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {gallery.slice(0, 6).map((image, index) => (
                <figure key={`${image}-${index}`} className={`${index % 3 === 0 ? 'sm:col-span-2' : ''} overflow-hidden border border-black/6`}>
                  <img src={image} alt={`Gallery visual ${index + 1}`} className={`${index % 3 === 0 ? 'h-56' : 'h-40'} w-full object-cover`} />
                </figure>
              ))}
            </div>
          ) : null}
        </div>
      </article>

      <div className="mt-12"><RelatedPanel task="image" post={post} related={related} /></div>
    </section>
  )
}

function BookmarkDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-12 lg:py-20">
      <article className="border border-black/6 bg-white p-8 sm:p-12">
        <BackLink task="sbm" />
        <div className="mt-10 flex h-16 w-16 items-center justify-center bg-[#0f0f1a] text-white"><Bookmark className="h-7 w-7" /></div>
        <h1 className="mt-8 text-[clamp(2rem,4vw,3.5rem)] font-light leading-[0.95] tracking-[-0.02em]">{cleanTitle(post)}</h1>
        <p className="mt-5 max-w-3xl text-[16px] leading-[1.9] text-[#1a1a2e]/55">{plainSummary(post)}</p>
        {website ? <Link href={website} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 bg-[#0f0f1a] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white">Open saved resource <ExternalLink className="h-3.5 w-3.5" /></Link> : null}
        <BodyContent post={post} />
      </article>
      <RelatedPanel task="sbm" post={post} related={related} />
    </section>
  )
}

function PdfDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const fileUrl = getField(post, ['fileUrl', 'pdfUrl', 'documentUrl', 'url'])
  return (
    <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-12 lg:py-20">
      <article className="border border-black/6 bg-white p-6 sm:p-10">
        <BackLink task="pdf" />
        <div className="mt-10 grid gap-6 sm:grid-cols-[100px_1fr]">
          <div className="flex h-24 w-24 items-center justify-center bg-[#0f0f1a] text-white"><FileText className="h-10 w-10" /></div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#5b21b6]">PDF resource</p>
            <h1 className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-light leading-[0.95] tracking-[-0.02em]">{cleanTitle(post)}</h1>
          </div>
        </div>
        <BodyContent post={post} />
        {fileUrl ? (
          <div className="mt-10 overflow-hidden border border-black/6">
            <div className="flex items-center justify-between gap-3 border-b border-black/6 bg-[#fafaf6] p-4">
              <span className="text-[13px] font-medium">Document preview</span>
              <Link href={fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#0f0f1a] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">Download <Download className="h-3.5 w-3.5" /></Link>
            </div>
            <iframe src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`} title={post.title} className="h-[78vh] w-full" />
          </div>
        ) : null}
      </article>
      <RelatedPanel task="pdf" post={post} related={related} />
    </section>
  )
}

function ProfileDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  const website = getField(post, ['website', 'url'])
  const email = getField(post, ['email'])
  const hero = images[1] || images[0]
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
      <article className="mt-6 overflow-hidden border border-black/6 bg-white">
        {hero ? (
          <div className="relative h-48 sm:h-64 lg:h-72">
            <img src={hero} alt={post.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a]/60 to-transparent" />
          </div>
        ) : (
          <div className="h-48 bg-[#e8e8e2] sm:h-64 lg:h-72" />
        )}

        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="-mt-20 self-start border border-black/6 bg-white p-8 text-center">
            <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden border-4 border-white bg-[#e8e8e2]">
              {images[0] ? <img src={images[0]} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-12 w-12 text-[#1a1a2e]/30" />}
            </div>
            <h1 className="mt-5 text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-[0.95] tracking-[-0.02em]">{cleanTitle(post)}</h1>
            {role ? <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#5b21b6]">{role}</p> : null}
            <ContactAction website={website} email={email} />
          </aside>

          <div className="border border-black/6 bg-[#fafaf6] p-6 sm:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#5b21b6]">Profile overview</p>
            <BodyContent post={post} />
            <ImageStrip images={images.slice(1)} label="Profile gallery" />
          </div>
        </div>

        <div className="px-6 pb-10 sm:px-10">
          <RelatedPanel task="profile" post={post} related={related} />
        </div>
      </article>
    </section>
  )
}

function BodyContent({ post, compact = false }: { post: SitePost; compact?: boolean }) {
  return <div className={`article-content mt-8 max-w-none ${compact ? 'text-[14px] leading-[1.8]' : 'text-[16px] leading-[1.9]'} text-[#1a1a2e]/70`} dangerouslySetInnerHTML={{ __html: formatPlainText(getBody(post)) }} />
}

function InfoGrid({ items }: { items: Array<[string, string, typeof MapPin]> }) {
  const visible = items.filter(([, value]) => value)
  if (!visible.length) return null
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      {visible.map(([label, value, Icon]) => (
        <div key={label} className="border border-black/6 bg-[#fafaf6] p-4">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1a1a2e]/40"><Icon className="h-3.5 w-3.5" /> {label}</div>
          <p className="mt-2 break-words text-[14px] leading-[1.7] text-[#1a1a2e]/70">{value}</p>
        </div>
      ))}
    </div>
  )
}

function ImageStrip({ images, label, large = false }: { images: string[]; label: string; large?: boolean }) {
  if (!images.length) return null
  return (
    <section className="mt-8">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#5b21b6]">{label}</p>
      <div className={`mt-4 grid gap-3 ${large ? 'sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
        {images.slice(0, large ? 4 : 8).map((image, index) => <img key={`${image}-${index}`} src={image} alt="" className="aspect-[4/3] object-cover border border-black/6" />)}
      </div>
    </section>
  )
}

function MapBox({ src, label }: { src: string; label: string }) {
  return (
    <div className="overflow-hidden border border-black/6 bg-white">
      <div className="flex items-center gap-2 border-b border-black/6 p-4 text-[13px] font-medium"><MapPin className="h-3.5 w-3.5" /> {label || 'Map location'}</div>
      <iframe src={src} title="Map" loading="lazy" className="h-72 w-full border-0" />
    </div>
  )
}

function ContactAction({ website, phone, email }: { website?: string; phone?: string; email?: string }) {
  if (!website && !phone && !email) return null
  return (
    <div className="mt-6 border border-black/6 bg-white p-5">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#1a1a2e]/40">Quick actions</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {website ? <Link href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#0f0f1a] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-white">Website <ExternalLink className="h-3.5 w-3.5" /></Link> : null}
        {phone ? <a href={`tel:${phone}`} className="inline-flex items-center gap-2 border border-black/15 px-4 py-2 text-[12px] font-medium"><Phone className="h-3.5 w-3.5" /> Call</a> : null}
        {email ? <a href={`mailto:${email}`} className="inline-flex items-center gap-2 border border-black/15 px-4 py-2 text-[12px] font-medium"><Mail className="h-3.5 w-3.5" /> Email</a> : null}
      </div>
    </div>
  )
}

function BadgeLine({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 border border-white/10 bg-white/5 px-4 py-3 text-[13px]"><span className="font-medium uppercase tracking-[0.14em] text-white/45">{label}</span><span className="font-medium">{value}</span></div>
}

function RelatedPanel({ task, post: _post, related, compact = false }: { task: TaskKey; post: SitePost; related: SitePost[]; compact?: boolean }) {
  const taskConfig = getTaskConfig(task)
  return (
    <aside className="min-w-0 space-y-5">
      {!compact ? (
        <div className="border border-black/6 bg-white p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#1a1a2e]/40">About this post</p>
          <div className="mt-4 grid gap-3 text-[13px] text-[#1a1a2e]/60">
            <p className="inline-flex items-center gap-2"><Tag className="h-3.5 w-3.5" /> Task: {taskConfig?.label || task}</p>
            <p className="inline-flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5" /> Site: {SITE_CONFIG.name}</p>
          </div>
        </div>
      ) : null}
      {related.length ? (
        <div className={compact ? '' : 'border border-black/6 bg-white p-5'}>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#1a1a2e]/40">{compact ? '' : 'Related'}</p>
          <div className={`${compact ? '' : 'mt-4'} grid gap-3`}>
            {related.map((item) => <RelatedCard key={item.id} task={task} post={item} />)}
          </div>
        </div>
      ) : null}
    </aside>
  )
}

function RelatedCard({ task, post }: { task: TaskKey; post: SitePost }) {
  const image = getImages(post)[0]
  const href = task === 'image' && post.slug ? `/image/${post.slug}` : buildPostUrl(task, post.slug)
  return (
    <Link href={href} className="group flex gap-3 border border-black/6 bg-white p-3 transition duration-300 hover:-translate-y-0.5">
      {image && task !== 'sbm' ? <img src={image} alt="" className="h-16 w-16 shrink-0 object-cover" /> : <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-[#f5f5f0]"><FileText className="h-5 w-5 text-[#1a1a2e]/30" /></div>}
      <div className="min-w-0">
        <h3 className="line-clamp-3 text-[13px] font-medium leading-tight">{cleanTitle(post)}</h3>
        <p className="mt-2 line-clamp-2 text-[12px] leading-[1.6] text-[#1a1a2e]/45">{plainSummary(post)}</p>
      </div>
    </Link>
  )
}

function EditableComments({ slug, comments }: { slug: string; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  return (
    <section className="mt-12 border-t border-black/6 pt-8">
      <div className="flex items-center gap-2 text-[15px] font-medium"><MessageCircle className="h-4 w-4" /> Comments</div>
      <div className="mt-6 grid gap-3">
        {comments.slice(0, 5).map((comment) => (
          <div key={comment.id} className="border border-black/6 bg-[#fafaf6] p-4">
            <p className="text-[13px] font-medium">{comment.name}</p>
            <p className="mt-2 text-[13px] leading-[1.7] text-[#1a1a2e]/60">{comment.comment}</p>
          </div>
        ))}
        {!comments.length ? <p className="text-[13px] text-[#1a1a2e]/45">No comments yet for {slug}.</p> : null}
      </div>
    </section>
  )
}
