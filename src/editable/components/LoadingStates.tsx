import { cn } from '@/lib/utils'

function PulseBlock({ className }: { className?: string }) {
  return <div className={cn('animate-pulse bg-[#1a1a2e]/6', className)} />
}

export function PageLoadingState({ label, className }: { label?: string; className?: string }) {
  return (
    <div aria-busy="true" className={cn('mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12', className)}>
      <PulseBlock className="h-3 w-32" />
      <PulseBlock className="mt-6 h-14 max-w-2xl" />
      <PulseBlock className="mt-4 h-14 max-w-xl" />
      <PulseBlock className="mt-8 h-4 max-w-lg" />
      <PulseBlock className="mt-2 h-4 max-w-md" />
      {label ? <p className="mt-10 text-[13px] text-[#1a1a2e]/30">{label}</p> : null}
    </div>
  )
}

export function CardGridLoadingState({ count = 6, label, className }: { count?: number; label?: string; className?: string }) {
  return (
    <div aria-busy="true" className={cn('mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12', className)}>
      {label ? <p className="mb-6 text-[13px] text-[#1a1a2e]/30">{label}</p> : null}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="border border-black/6 bg-white">
            <PulseBlock className="aspect-[4/3]" />
            <div className="p-5">
              <PulseBlock className="h-2.5 w-20" />
              <PulseBlock className="mt-3 h-5 w-full" />
              <PulseBlock className="mt-2 h-5 w-3/4" />
              <PulseBlock className="mt-4 h-3 w-full" />
              <PulseBlock className="mt-1.5 h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DetailLoadingState({ label, className }: { label?: string; className?: string }) {
  return (
    <div aria-busy="true" className={cn('mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12', className)}>
      <PulseBlock className="h-8 w-36" />
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="border border-black/6 bg-white p-6 sm:p-10">
          <PulseBlock className="h-3 w-24" />
          <PulseBlock className="mt-4 h-12 w-full" />
          <PulseBlock className="mt-3 h-12 w-3/4" />
          <PulseBlock className="mt-10 aspect-[16/9] w-full" />
          <PulseBlock className="mt-8 h-4 w-full" />
          <PulseBlock className="mt-2 h-4 w-full" />
          <PulseBlock className="mt-2 h-4 w-2/3" />
        </div>
        <div>
          <div className="border border-black/6 bg-white p-5">
            <PulseBlock className="h-3 w-32" />
            <PulseBlock className="mt-4 h-4 w-full" />
            <PulseBlock className="mt-2 h-4 w-3/4" />
          </div>
        </div>
      </div>
      {label ? <p className="mt-10 text-[13px] text-[#1a1a2e]/30">{label}</p> : null}
    </div>
  )
}
