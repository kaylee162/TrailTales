type BrandMarkProps = {
  tone?: 'blaze' | 'spruce'
  size?: 'sm' | 'md' | 'responsive'
  className?: string
}

// Square "trail marker" logo with a mountain peak.
export default function BrandMark({ tone = 'blaze', size = 'md', className = '' }: BrandMarkProps) {
  const boxes = {
    sm: 'h-8 w-8 rounded-lg',
    md: 'h-10 w-10 rounded-[10px]',
    responsive: 'h-8 w-8 rounded-lg md:h-10 md:w-10 md:rounded-[10px]',
  }
  const box = boxes[size]
  const bg = tone === 'blaze' ? 'bg-blaze' : 'bg-spruce'

  return (
    <span className={`grid shrink-0 place-items-center ${box} ${bg} ${className}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[62%] w-[62%]">
        <path d="M3 19l6.5-11 4 6.5 2.5-4 5 8.5z" fill="#f2ede3" />
      </svg>
    </span>
  )
}
