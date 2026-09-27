type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  action?: React.ReactNode
}

export default function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && <p className="eyebrow mb-2.5 md:mb-3">{eyebrow}</p>}
        <h1 className="font-display text-[40px] font-medium leading-[1.02] tracking-[-0.02em] sm:text-5xl md:text-6xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted md:mt-4 md:text-lg">{description}</p>}
      </div>
      {action && <div className="hidden shrink-0 md:block">{action}</div>}
    </header>
  )
}
