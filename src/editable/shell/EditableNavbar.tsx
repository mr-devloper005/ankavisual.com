'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { Menu, UserPlus, LogIn, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()
  const navVars = { '--editable-nav-bg': preset.colors.background, '--editable-nav-text': preset.colors.foreground, '--editable-nav-active': preset.colors.foreground, '--editable-nav-active-text': preset.colors.background, '--editable-cta-bg': preset.colors.foreground, '--editable-cta-text': preset.colors.background, '--editable-search-bg': preset.colors.surface, '--editable-border': `${preset.colors.muted}33`, '--editable-container': '1440px' } as CSSProperties
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    []
  )

  return (
    <header style={navVars} className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0c10] text-white backdrop-blur-2xl">
      <nav className="mx-auto flex min-h-[78px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/95 shadow-sm transition-transform group-hover:-rotate-2">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-11 w-11 object-contain" />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block max-w-[180px] truncate text-base font-black tracking-[-0.03em] text-white">{SITE_CONFIG.name}</span>
            <span className="block max-w-[180px] truncate text-[10px] font-bold uppercase tracking-[0.24em] opacity-60">{globalContent.nav?.tagline || SITE_CONFIG.tagline}</span>
          </span>
        </Link>

        <div className="hidden xl:block" />

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {session ? (
            <>
              <span className="hidden rounded-full border border-white/20 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-white/80 sm:inline-flex">{session.name}</span>
              <button type="button" onClick={logout} className="hidden items-center gap-2 rounded-full bg-[linear-gradient(90deg,#346739,#79ae6f)] px-5 py-2.5 text-xs font-black uppercase tracking-[0.14em] text-[#f2edc2] shadow-sm sm:inline-flex">Sign out</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-black hover:bg-white/10 sm:inline-flex"><LogIn className="h-4 w-4" /> Login</Link>
              <Link href="/signup" className="hidden items-center gap-2 rounded-full bg-[linear-gradient(90deg,#346739,#79ae6f)] px-5 py-2.5 text-xs font-black uppercase tracking-[0.14em] text-[#f2edc2] shadow-sm sm:inline-flex"><UserPlus className="h-4 w-4" /> Sign up</Link>
            </>
          )}
          <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-full border border-white/20 bg-white/10 p-2 lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-[#0a0c10] px-4 py-4 lg:hidden">
          <div className="grid gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'Contact', href: '/contact' }].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-black">
                {item.label}
              </Link>
            ))}
            {session ? (
              <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-2xl border border-white/10 bg-[linear-gradient(90deg,#346739,#79ae6f)] px-4 py-3 text-left text-sm font-black text-[#f2edc2]">
                Sign out
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
