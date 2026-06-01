'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="border-t border-white/10 bg-[#0a0c10] text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mt-2 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          <div>
            <p className="text-4xl font-black tracking-[-0.04em]">{SITE_CONFIG.name}</p>
            <p className="mt-3 text-sm text-white/70">Explore refined visuals, curated profiles, and polished publishing lanes.</p>
          </div>
          <div>
            <h3 className="text-lg font-black">Company</h3>
            <div className="mt-3 grid gap-2 text-sm">
              <Link href="/about" className="text-white/80 hover:text-white">About</Link>
              <Link href="/contact" className="text-white/80 hover:text-white">Contact</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/65">© {year} {SITE_CONFIG.name}. All rights reserved.</div>
    </footer>
  )
}
