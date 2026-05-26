import type { ReactNode } from 'react'

export default function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-ink bg-sun/80 px-3 py-1 text-xs font-bold text-ink">
      {children}
    </span>
  )
}