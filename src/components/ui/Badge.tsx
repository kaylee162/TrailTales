import type { ReactNode } from 'react'

export default function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="tag">
      {children}
    </span>
  )
}