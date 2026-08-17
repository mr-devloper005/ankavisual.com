import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#f5f5f0] text-[#1a1a2e]">
        <section className="border-b border-black/6">
          <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#5b21b6]">{pagesContent.about.badge}</p>
            <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[0.92] tracking-[-0.03em]">
              About {SITE_CONFIG.name}
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-[1.8] text-[#1a1a2e]/55 font-mono">{pagesContent.about.description}</p>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-light leading-[0.95] tracking-[-0.02em]">{pagesContent.about.title}</h2>
              <div className="mt-8 space-y-5 text-[15px] leading-[1.9] text-[#1a1a2e]/60">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>

            <aside className="space-y-4">
              {pagesContent.about.values.map((value, index) => (
                <div key={value.title} className="border border-black/6 bg-white p-6">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#1a1a2e]/35">Pillar {String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mt-3 text-[20px] font-medium leading-tight tracking-[-0.01em]">{value.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.8] text-[#1a1a2e]/50">{value.description}</p>
                </div>
              ))}
            </aside>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
