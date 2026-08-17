'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, ImageIcon, Lock, PlusCircle, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Sparkles,
  classified: PlusCircle,
  image: ImageIcon,
  profile: Sparkles,
  pdf: FileText,
  sbm: ArrowRight,
}

const fieldClass = 'border border-black/8 bg-[#fafaf6] px-4 py-3 text-[14px] text-[#1a1a2e] outline-none transition placeholder:text-[#1a1a2e]/30 focus:border-[#5b21b6]'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-[#f5f5f0] text-[#1a1a2e]">
          <section className="mx-auto grid max-w-5xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-[0.9fr_1.1fr] lg:px-12">
            <div className="flex h-full min-h-72 items-center justify-center bg-[#0f0f1a] text-white">
              <Lock className="h-16 w-16 opacity-50" />
            </div>
            <div className="self-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#1a1a2e]/40">{pagesContent.create.locked.badge}</p>
              <h1 className="mt-5 text-[clamp(2rem,5vw,4rem)] font-light leading-[0.92] tracking-[-0.02em]">{pagesContent.create.locked.title}</h1>
              <p className="mt-6 max-w-xl text-[15px] leading-[1.8] text-[#1a1a2e]/55">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 bg-[#0f0f1a] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white">Login <ArrowRight className="h-3.5 w-3.5" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 border border-[#1a1a2e]/15 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em]">Sign up</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[#f5f5f0] text-[#1a1a2e]">
        <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <aside>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#1a1a2e]/40">{pagesContent.create.hero.badge}</p>
              <h1 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-light leading-[0.92] tracking-[-0.02em]">{pagesContent.create.hero.title}</h1>
              <p className="mt-6 max-w-xl text-[15px] leading-[1.8] text-[#1a1a2e]/55">{pagesContent.create.hero.description}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {enabledTasks.map((item) => {
                  const Icon = taskIcon[item.key] || FileText
                  const active = item.key === task
                  return (
                    <button key={item.key} type="button" onClick={() => setTask(item.key)} className={`border p-4 text-left transition ${active ? 'border-[#0f0f1a] bg-[#0f0f1a] text-white' : 'border-black/6 bg-white hover:-translate-y-0.5'}`}>
                      <Icon className="h-4 w-4" />
                      <span className="mt-3 block text-[13px] font-medium">{item.label}</span>
                      <span className="mt-1 block text-[12px] text-current/55">{item.description}</span>
                    </button>
                  )
                })}
              </div>
            </aside>

            <form onSubmit={submit} className="border border-black/6 bg-white p-5 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#1a1a2e]/40">Create {activeTask?.label || 'post'}</p>
                  <h2 className="mt-1 text-[clamp(1.5rem,3vw,2rem)] font-light tracking-[-0.02em]">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="border border-black/8 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em]">{session.name}</span>
              </div>

              <div className="mt-6 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <p className="flex items-center gap-2 text-[13px] font-medium"><CheckCircle2 className="h-4 w-4" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-[13px] text-emerald-700">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 bg-[#0f0f1a] text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#1a1a2e]">
                <Send className="h-3.5 w-3.5" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
