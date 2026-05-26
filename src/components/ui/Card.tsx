import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-4xl border-2 border-ink bg-white/80 p-5 shadow-[6px_6px_0_#2f2a25] ${className}`}
    >
      {children}
    </div>
  )
}