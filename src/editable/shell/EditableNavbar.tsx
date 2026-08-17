'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label.toUpperCase(), href: task.route })),
    []
  )

  return (
    <header className="sticky top-0 z-50 border-b border-black/8 bg-[#0f0f1a]">
      <nav className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center px-5 sm:px-8 lg:px-12">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
          <span className="hidden text-[13px] font-semibold uppercase tracking-[0.28em] text-white sm:block">
            {SITE_CONFIG.name}
          </span>
        </Link>

        <div className="ml-10 hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12px] font-medium uppercase tracking-[0.18em] text-white/70 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/about" className="text-[12px] font-medium uppercase tracking-[0.18em] text-white/70 transition hover:text-white">
            ABOUT
          </Link>
          <Link href="/contact" className="text-[12px] font-medium uppercase tracking-[0.18em] text-white/70 transition hover:text-white">
            CONTACT
          </Link>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <Link href="/search" className="flex h-9 w-9 items-center justify-center text-white/60 transition hover:text-white">
            <Search className="h-4 w-4" />
          </Link>

          {session ? (
            <>
              <span className="hidden border border-white/15 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/80 sm:inline-flex">
                {session.name}
              </span>
              <button
                type="button"
                onClick={logout}
                className="hidden items-center bg-[#5b21b6] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#4c1d95] sm:inline-flex"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden items-center border border-white/20 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition hover:bg-white/10 sm:inline-flex"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="hidden items-center bg-[#5b21b6] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#4c1d95] sm:inline-flex"
              >
                Join the network
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-white/8 bg-[#0f0f1a] px-5 py-6 lg:hidden">
          <div className="grid gap-1">
            {[{ label: 'HOME', href: '/' }, ...navItems, { label: 'ABOUT', href: '/about' }, { label: 'CONTACT', href: '/contact' }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/6 px-1 py-3 text-[12px] font-medium uppercase tracking-[0.18em] text-white/80"
              >
                {item.label}
              </Link>
            ))}
            {!session ? (
              <div className="mt-4 flex gap-3">
                <Link href="/login" onClick={() => setOpen(false)} className="flex-1 border border-white/20 py-3 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-white">
                  Sign in
                </Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="flex-1 bg-[#5b21b6] py-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                  Join the network
                </Link>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => { logout(); setOpen(false) }}
                className="mt-4 w-full bg-[#5b21b6] py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
