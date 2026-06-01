import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: 'Sign in to access your visual profile and publishing workspace.' })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#ececec] text-black">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <div className="overflow-hidden rounded-[1.6rem] border border-black/10 bg-[linear-gradient(120deg,#070a12,#17263a)] p-8 text-white shadow-sm lg:p-10">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#9FCB98]">Member login</p>
            <h1 className="mt-4 max-w-xl text-5xl font-black leading-[0.95] tracking-[-0.06em] sm:text-6xl">Welcome back to your visual workspace.</h1>
            <p className="mt-5 max-w-lg text-sm leading-8 text-white/75">
              Sign in to continue managing your profile, content drafts, and publishing flow.
            </p>
          </div>

          <div className="rounded-[1.6rem] border border-black/10 bg-[linear-gradient(180deg,#0a0c10,#121d2c)] p-6 text-white shadow-sm sm:p-8">
            <h2 className="text-3xl font-black tracking-[-0.04em]">Login</h2>
            <p className="mt-2 text-sm text-white/70">Use your local account credentials to continue.</p>
            <EditableLocalLoginForm />
            <p className="mt-5 text-sm text-white/70">
              New here?{' '}
              <Link href="/signup" className="font-black text-[#9FCB98] underline-offset-4 hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
