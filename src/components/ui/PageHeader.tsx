type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  action?: React.ReactNode
}

export default function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && <p className="mb-2 text-sm font-black uppercase tracking-[0.24em] text-coral">{eyebrow}</p>}
        <h1 className="font-display text-5xl font-black leading-tight md:text-6xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-lg font-semibold leading-8 text-ink/70">{description}</p>}
      </div>
      {action}
    </header>
  )
}
