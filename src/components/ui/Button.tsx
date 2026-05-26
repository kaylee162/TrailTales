import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-coral text-white border-ink shadow-[4px_4px_0_#2f2a25]',
    secondary: 'bg-sun text-ink border-ink shadow-[4px_4px_0_#2f2a25]',
    danger: 'bg-red-500 text-white border-ink shadow-[4px_4px_0_#2f2a25]',
  }

  return (
    <button
      className={`rounded-2xl border-2 px-5 py-3 font-bold transition hover:-translate-y-1 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}