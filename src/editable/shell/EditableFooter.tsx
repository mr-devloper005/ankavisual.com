'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="border-t border-black/8 bg-[#0f0f1a] text-white">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 py-16 md:grid-cols-[1fr_auto_auto_auto]">
          <div className="max-w-sm">
            <p className="text-[13px] font-semibold uppercase tracking-[0.28em]">{SITE_CONFIG.name}</p>
            <p className="mt-5 text-[14px] leading-[1.8] text-white/50">
              A living index of founders, makers, visual thinkers, and practical ideas. Built to help business owners discover useful perspectives.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/40">Explore</p>
            <div className="mt-5 grid gap-3 text-[14px]">
              {SITE_CONFIG.tasks.filter((t) => t.enabled).map((t) => (
                <Link key={t.route} href={t.route} className="text-white/60 transition hover:text-white">{t.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/40">Company</p>
            <div className="mt-5 grid gap-3 text-[14px]">
              <Link href="/about" className="text-white/60 transition hover:text-white">About</Link>
              <Link href="/contact" className="text-white/60 transition hover:text-white">Contact</Link>
              <Link href="/search" className="text-white/60 transition hover:text-white">Search</Link>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/40">Account</p>
            <div className="mt-5 grid gap-3 text-[14px]">
              {session ? (
                <>
                  <Link href="/create" className="text-white/60 transition hover:text-white">Create</Link>
                  <button type="button" onClick={logout} className="text-left text-white/60 transition hover:text-white">Sign out</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-white/60 transition hover:text-white">Sign in</Link>
                  <Link href="/signup" className="text-white/60 transition hover:text-white">Join the network</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/6 px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <p className="text-[12px] text-white/35">&copy; {year} {SITE_CONFIG.name}</p>
          <p className="text-[12px] text-white/35">Independent business culture</p>
        </div>
      </div>
    </footer>
  )
}
