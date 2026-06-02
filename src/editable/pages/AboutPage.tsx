import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#ececec] px-4 py-14 text-black sm:px-6 lg:px-8">
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-sm">
            <div className="bg-[linear-gradient(120deg,#05070d,#172335)] p-8 text-white lg:p-12">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#9fcb98]">{pagesContent.about.badge}</p>
              <h1 className="mt-5 text-5xl font-black tracking-[-0.07em]">About {SITE_CONFIG.name}</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/80">{pagesContent.about.description}</p>
            </div>
            <div className="p-8 lg:p-12">
              <h2 className="text-4xl font-black tracking-[-0.05em]">{pagesContent.about.title}</h2>
              <div className="mt-6 space-y-4 text-sm leading-8 opacity-75">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </article>
          <aside className="space-y-4">
            {pagesContent.about.values.map((value, index) => (
              <div key={value.title} className="rounded-[1.25rem] border border-black/10 bg-white p-6 shadow-sm">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#346739]">Pillar {index + 1}</p>
                <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 opacity-70">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
