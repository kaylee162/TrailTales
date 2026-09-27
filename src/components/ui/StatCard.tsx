import type { ReactNode } from 'react'

type StatCardProps = {
  icon: ReactNode
  label: string
  value: string | number
  tone?: 'sun' | 'sky' | 'sage' | 'coral'
}

const tones: Record<NonNullable<StatCardProps['tone']>, string> = {
  sun: 'bg-sun/25 text-[#7a3b52]',
  sky: 'bg-sky/25 text-[#1f3d63]',
  sage: 'bg-sage/25 text-forest',
  coral: 'bg-coral/20 text-coral',
}

export default function StatCard({ icon, label, value, tone = 'sage' }: StatCardProps) {
  return (
    <div className="surface flex items-center gap-4 p-5">
      <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${tones[tone]}`}>{icon}</div>
      <div>
        <p className="font-display text-2xl font-semibold text-ink leading-none">{value}</p>
        <p className="mt-1 text-sm font-semibold text-ink/60">{label}</p>
      </div>
    </div>
  )
}
