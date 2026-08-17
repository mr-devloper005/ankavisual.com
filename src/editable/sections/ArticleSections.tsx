import Link from 'next/link'
import { ArrowUpRight, ChevronLeft } from 'lucide-react'
import type { SitePost, SiteFeedPagination } from '@/lib/site-connector'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { pagesContent } from '@/editable/content/pages.content'
import { ArticleListCard, postHref } from '@/editable/cards/PostCards'

export function EditableArticleArchive({ posts, pagination, category = 'all', basePath = '/article' }: { posts: SitePost[]; pagination: SiteFeedPagination; category?: string; basePath?: string }) {
  const voice = taskPageVoices.article
  const page = pagination.page || 1
  const pageHref = (nextPage: number) => `${basePath}?${new URLSearchParams({ ...(category && category !== 'all' ? { category } : {}), page: String(nextPage) }).toString()}`
  return (
    <main className="bg-[#f5f5f0] text-[#1a1a2e]">
      <section className="border-b border-black/6">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#5b21b6]">{voice.eyebrow}</p>
          <h1 className="mt-6 max-w-5xl text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[0.92] tracking-[-0.03em]">{voice.headline}</h1>
          <p className="mt-6 max-w-3xl text-[15px] leading-[1.8] text-[#1a1a2e]/55 font-mono">{voice.description}</p>
          <form action={basePath} className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <select name="category" defaultValue={category || 'all'} className="min-w-0 flex-1 border border-black/10 bg-white px-5 py-3 text-[13px] font-medium outline-none">
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
            </select>
            <button className="bg-[#5b21b6] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#4c1d95]">Filter</button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        {posts.length ? (
          <div className="grid gap-5">
            {posts.map((post, index) => <ArticleListCard key={post.id} post={post} href={postHref('article', post, basePath)} index={index + (page - 1) * pagination.limit} />)}
          </div>
        ) : (
          <div className="border border-dashed border-black/15 py-20 text-center">
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-light tracking-[-0.02em]">No articles found</h2>
            <p className="mt-3 text-[14px] text-[#1a1a2e]/45">Try another category or return to all articles.</p>
          </div>
        )}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          {pagination.hasPrevPage ? <Link href={pageHref(page - 1)} className="border border-[#1a1a2e]/15 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.14em] transition hover:bg-[#1a1a2e] hover:text-white">Previous</Link> : null}
          <span className="bg-[#1a1a2e] px-6 py-3 text-[12px] font-medium uppercase tracking-[0.14em] text-white">Page {page} of {pagination.totalPages || 1}</span>
          {pagination.hasNextPage ? <Link href={pageHref(page + 1)} className="border border-[#1a1a2e]/15 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.14em] transition hover:bg-[#1a1a2e] hover:text-white">Next</Link> : null}
        </div>
      </section>
    </main>
  )
}

export function EditableArticleDetailShell({ slug, post }: { slug: string; post: SitePost | null }) {
  const voice = taskPageVoices.article
  return (
    <main className="bg-[#f5f5f0] text-[#1a1a2e]">
      <section className="mx-auto max-w-[1440px] px-5 pt-12 sm:px-8 lg:px-12 lg:pt-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            <Link href="/article" className="inline-flex items-center gap-2 border border-[#1a1a2e]/15 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em] transition hover:bg-[#1a1a2e] hover:text-white"><ChevronLeft className="h-3.5 w-3.5" /> Articles</Link>
            <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.22em] text-[#5b21b6]">{voice.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-[clamp(2rem,5vw,4rem)] font-light leading-[0.95] tracking-[-0.02em]">{post?.title || pagesContent.detailPages.article.fallbackTitle}</h1>
          </div>
          <aside className="min-w-0 bg-[#0f0f1a] p-6 text-white">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/40">Reading note</p>
            <p className="mt-4 text-[14px] leading-[1.8] text-white/50">{voice.secondaryNote}</p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 bg-white px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0f0f1a]">Contact <ArrowUpRight className="h-3.5 w-3.5" /></Link>
          </aside>
        </div>
      </section>
      <section className="mx-auto w-full max-w-5xl px-5 pb-16 pt-8 sm:px-8 lg:px-12 lg:pb-24">
        <div className="border border-black/6 bg-white p-6 sm:p-10">
          <p className="text-[15px] leading-[1.8] text-[#1a1a2e]/55">{post?.summary || `Article detail content for ${slug} will render through the editable detail page.`}</p>
        </div>
      </section>
    </main>
  )
}
