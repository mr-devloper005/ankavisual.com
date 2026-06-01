import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: 'Create your account and start building your visual presence.' })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#ececec] text-black">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1fr] lg:px-8">
          <div className="rounded-[1.6rem] border border-black/10 bg-[linear-gradient(180deg,#0a0c10,#121d2c)] p-6 text-white shadow-sm sm:p-8">
            <h1 className="text-3xl font-black tracking-[-0.05em]">Create account</h1>
            <p className="mt-2 text-sm text-white/70">Set up your account to publish and manage visual content.</p>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-white/70">
              Already have an account?{' '}
              <Link href="/login" className="font-black text-[#9FCB98] underline-offset-4 hover:underline">
                Login
              </Link>
            </p>
          </div>

          <div className="overflow-hidden rounded-[1.6rem] border border-black/10 bg-[linear-gradient(120deg,#8c000e,#22040c_55%,#090b11)] p-8 text-white shadow-sm lg:p-10">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#F2EDC2]">New member access</p>
            <h2 className="mt-4 max-w-xl text-5xl font-black leading-[0.95] tracking-[-0.06em] sm:text-6xl">Build your profile and publish with confidence.</h2>
            <p className="mt-5 max-w-lg text-sm leading-8 text-white/80">
              Join to organize your visual presence, share curated work, and keep your content portfolio polished.
            </p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
