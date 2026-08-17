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
      <main className="bg-[#f5f5f0] text-[#1a1a2e]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1440px] items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-12">
          <div className="border border-black/6 bg-white p-6 sm:p-8">
            <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-light tracking-[-0.02em]">Create account</h1>
            <p className="mt-2 text-[14px] text-[#1a1a2e]/45">Set up your account to publish and manage content.</p>
            <EditableLocalSignupForm />
            <p className="mt-6 text-[14px] text-[#1a1a2e]/50">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-[#5b21b6] underline-offset-4 hover:underline">
                Login
              </Link>
            </p>
          </div>

          <div className="bg-[#0f0f1a] p-8 text-white lg:p-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/40">New member access</p>
            <h2 className="mt-6 max-w-xl text-[clamp(2rem,5vw,3.5rem)] font-light leading-[0.92] tracking-[-0.02em]">Build your profile and publish with confidence.</h2>
            <p className="mt-6 max-w-lg text-[14px] leading-[1.8] text-white/45">
              Join to organize your visual presence, share curated work, and keep your content portfolio polished.
            </p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
