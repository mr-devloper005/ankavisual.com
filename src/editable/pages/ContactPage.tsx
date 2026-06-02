'use client'

import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)

  const lanes =
    productKind === 'directory'
      ? [
          { icon: Building2, title: 'Business onboarding', body: 'Share your goals for listings, category visibility, and local presence.' },
          { icon: Phone, title: 'Partnership support', body: 'Discuss collaborations, growth opportunities, and publishing plans.' },
          { icon: MapPin, title: 'Coverage requests', body: 'Request new regions, topics, or service-focused discovery lanes.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Editorial submissions', body: 'Pitch story ideas, long-form features, and publication-focused concepts.' },
            { icon: Mail, title: 'Campaign support', body: 'Coordinate branded content, series plans, and launch schedules.' },
            { icon: Sparkles, title: 'Contributor support', body: 'Get help with formatting, review flow, and publication guidelines.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery features, profile spotlights, and visual campaigns.' },
              { icon: Sparkles, title: 'Licensing and usage', body: 'Reach out about usage rights and commercial visual requests.' },
              { icon: Mail, title: 'Media requests', body: 'Request creator decks, project support, and curation assistance.' },
            ]
          : [
              { icon: Bookmark, title: 'Collection submissions', body: 'Suggest boards, resources, and curated references for inclusion.' },
              { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation work, collaboration pages, and shared projects.' },
              { icon: Sparkles, title: 'Curator support', body: 'Get help structuring collections and profile-connected content.' },
            ]

  return (
    <EditableSiteShell>
      <main className="bg-[#ececec]">
        <section className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-sm">
            <div className="bg-[linear-gradient(120deg,#05070d,#172335)] px-7 py-10 text-white sm:px-10">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#9fcb98]">{pagesContent.contact.eyebrow}</p>
              <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-[-0.05em] sm:text-6xl">{pagesContent.contact.title}</h1>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-white/75">{pagesContent.contact.description}</p>
            </div>

            <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-4">
                {lanes.map((lane, index) => (
                  <div key={lane.title} className="rounded-[1.25rem] border border-black/10 bg-[#f8f8f8] p-5">
                    <div className="mt-2 flex items-start gap-3">
                      <lane.icon className="mt-1 h-5 w-5" />
                      <div>
                        <h2 className="text-xl font-black tracking-[-0.03em]">{lane.title}</h2>
                        <p className="mt-2 text-sm leading-7 text-black/70">{lane.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.5rem] border border-black/10 bg-white p-6 shadow-sm sm:p-7">
                <h2 className="text-3xl font-black tracking-[-0.04em]">{pagesContent.contact.formTitle}</h2>
                <p className="mt-2 text-sm text-black/65">Tell us what you need and we will respond with the best next step.</p>
                <div className="mt-5">
                  <EditableContactLeadForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
