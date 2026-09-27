const CONTOUR = 'M0,-100 C60,-105 120,-60 115,0 C110,55 70,95 10,100 C-50,105 -120,70 -118,10 C-116,-50 -60,-95 0,-100 Z'
const RINGS = [0.35, 0.7, 1.05, 1.45, 1.9, 2.4, 2.95, 3.55]

type TopoLinesProps = {
  className?: string
  color?: string
  opacity?: number
}

// Decorative topographic contour rings. Position it with className.
export default function TopoLines({ className = '', color = '#1e3a2f', opacity = 0.13 }: TopoLinesProps) {
  return (
    <svg
      viewBox="-450 -310 900 620"
      className={`pointer-events-none absolute ${className}`}
      fill="none"
      stroke={color}
      strokeOpacity={opacity}
      aria-hidden="true"
    >
      {RINGS.map((scale, index) => (
        <path key={scale} d={CONTOUR} vectorEffect="non-scaling-stroke" transform={`scale(${scale}) rotate(${index * 4})`} />
      ))}
    </svg>
  )
}
