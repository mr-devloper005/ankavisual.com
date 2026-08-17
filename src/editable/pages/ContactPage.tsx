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
      <main className="bg-[#f5f5f0] text-[#1a1a2e]">
        <section className="border-b border-black/6">
          <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#5b21b6]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,5rem)] font-light leading-[0.92] tracking-[-0.03em]">{pagesContent.contact.title}</h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-[1.8] text-[#1a1a2e]/55 font-mono">{pagesContent.contact.description}</p>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="border border-black/6 bg-white p-6">
                  <div className="flex items-start gap-4">
                    <lane.icon className="mt-0.5 h-5 w-5 text-[#5b21b6]" />
                    <div>
                      <h2 className="text-[18px] font-medium tracking-[-0.01em]">{lane.title}</h2>
                      <p className="mt-2 text-[14px] leading-[1.8] text-[#1a1a2e]/50">{lane.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-black/6 bg-white p-6 sm:p-8">
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-light tracking-[-0.02em]">{pagesContent.contact.formTitle}</h2>
              <p className="mt-2 text-[14px] text-[#1a1a2e]/45">Tell us what you need and we will respond with the best next step.</p>
              <div className="mt-6">
                <EditableContactLeadForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
