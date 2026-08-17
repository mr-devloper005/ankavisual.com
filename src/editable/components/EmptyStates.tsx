import Link from 'next/link'
import { ArrowUpRight, SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'

export function EmptyState({
  title = 'Nothing here yet',
  description = 'Content will appear here once published.',
  actionLabel,
  actionHref = '/',
  className,
}: {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
  className?: string
}) {
  return (
    <div className={cn('border border-dashed border-black/12 py-20 text-center', className)}>
      <SearchX className="mx-auto h-6 w-6 text-[#1a1a2e]/25" />
      <h2 className="mt-5 text-[clamp(1.5rem,3vw,2.5rem)] font-light tracking-[-0.02em] text-[#1a1a2e]">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-[14px] leading-[1.8] text-[#1a1a2e]/45">{description}</p>
      {actionLabel ? (
        <Link
          href={actionHref}
          className="mt-8 inline-flex items-center gap-2 border border-[#1a1a2e]/15 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.14em] text-[#1a1a2e] transition hover:bg-[#1a1a2e] hover:text-white"
        >
          {actionLabel} <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      ) : null}
    </div>
  )
}

export function TaskEmptyState({ taskLabel, className }: { taskLabel?: string; className?: string }) {
  return (
    <EmptyState
      title={`No ${taskLabel || 'posts'} available yet`}
      description="Try a different filter or check back after new content is published."
      actionLabel="Browse all"
      actionHref="/"
      className={className}
    />
  )
}

export function ContactSuccessState({ className }: { className?: string }) {
  return (
    <div className={cn('border border-black/6 bg-white py-16 text-center', className)}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center bg-emerald-50 text-emerald-600">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="mt-5 text-[22px] font-light tracking-[-0.02em]">Message received</h2>
      <p className="mx-auto mt-3 max-w-md text-[14px] leading-[1.8] text-[#1a1a2e]/45">
        We received your message and will respond with the best next step.
      </p>
    </div>
  )
}
