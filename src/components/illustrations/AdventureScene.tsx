import type { AdventureCategory } from '../../types/adventure'

type AdventureSceneProps = {
  category?: AdventureCategory
  className?: string
}

const skyByCategory: Record<AdventureCategory, [string, string]> = {
  hike: ['#bfe3e8', '#eaf4ee'],
  city: ['#f7d9b8', '#f6efdd'],
  park: ['#c9e8cf', '#eaf4ee'],
  beach: ['#a9dbe8', '#fdf1d6'],
  camping: ['#9cc9d8', '#e3ece1'],
  flight: ['#a7d4ea', '#eef6f0'],
  roadtrip: ['#f0cf9c', '#f6efdd'],
}

/** A flat, layered SVG outdoor scene used as decorative cover art (hero, empty states, photo-less adventure covers). */
export default function AdventureScene({ category = 'hike', className = '' }: AdventureSceneProps) {
  const [skyTop, skyBottom] = skyByCategory[category]

  return (
    <svg viewBox="0 0 400 260" className={className} preserveAspectRatio="xMidYMax slice" role="img" aria-hidden="true">
      <defs>
        <linearGradient id={`sky-${category}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={skyTop} />
          <stop offset="100%" stopColor={skyBottom} />
        </linearGradient>
      </defs>

      <rect width="400" height="260" fill={`url(#sky-${category})`} />
      <circle cx="322" cy="58" r="30" fill="#f4bb3d" opacity="0.9" />

      {category === 'beach' ? <BeachScene /> : null}
      {category === 'city' ? <CityScene /> : null}
      {category === 'flight' ? <FlightScene /> : null}
      {category === 'roadtrip' ? <RoadtripScene /> : null}
      {(category === 'hike' || category === 'park' || category === 'camping') ? <MountainScene withTent={category === 'camping'} /> : null}
    </svg>
  )
}

function MountainScene({ withTent }: { withTent?: boolean }) {
  return (
    <g>
      <path d="M0 190 L90 90 L150 160 L210 70 L300 190 Z" fill="#8fae7c" opacity="0.55" />
      <path d="M0 210 L120 120 L190 190 L260 110 L400 210 L400 260 L0 260 Z" fill="#2f5d3a" opacity="0.85" />
      <path d="M120 120 L140 140 L100 140 Z" fill="#fffbf2" opacity="0.8" />
      <path d="M260 110 L280 132 L240 132 Z" fill="#fffbf2" opacity="0.8" />
      <ellipse cx="200" cy="250" rx="210" ry="26" fill="#7fc3de" opacity="0.5" />
      {[40, 90, 330, 360].map((x, i) => (
        <g key={x} transform={`translate(${x} ${200 + (i % 2) * 8})`}>
          <path d="M0 40 L-14 40 L0 10 L-11 10 L0 -14 L11 10 L0 10 L14 40 Z" fill="#2f5d3a" />
          <rect x="-3" y="40" width="6" height="8" fill="#29343c" opacity="0.4" />
        </g>
      ))}
      {withTent && (
        <g transform="translate(200 215)">
          <path d="M-32 30 L0 -22 L32 30 Z" fill="#e17b49" />
          <path d="M-14 30 L0 0 L14 30 Z" fill="#29343c" opacity="0.35" />
          <path d="M-32 30 L32 30 L28 34 L-28 34 Z" fill="#c96438" />
        </g>
      )}
    </g>
  )
}

function BeachScene() {
  return (
    <g>
      <path d="M0 190 Q100 165 200 188 T400 185 L400 260 L0 260 Z" fill="#f6e2b0" />
      <path d="M0 230 Q100 205 200 228 T400 224 L400 260 L0 260 Z" fill="#a9dbe8" opacity="0.85" />
      <path d="M0 246 Q100 226 200 246 T400 240 L400 260 L0 260 Z" fill="#7fc3de" />
      <g transform="translate(70 170)">
        <path d="M0 60 L0 0" stroke="#2f5d3a" strokeWidth="5" strokeLinecap="round" />
        <path d="M0 8 C -26 6 -34 -14 -30 -30 C -12 -26 0 -10 0 8Z" fill="#8fae7c" />
        <path d="M0 8 C 26 6 34 -14 30 -30 C 12 -26 0 -10 0 8Z" fill="#2f5d3a" />
      </g>
    </g>
  )
}

function CityScene() {
  const buildings = [
    { x: 30, w: 46, h: 110, c: '#2f5d3a' },
    { x: 84, w: 34, h: 150, c: '#e17b49' },
    { x: 126, w: 50, h: 90, c: '#8fae7c' },
    { x: 184, w: 40, h: 130, c: '#2f5d3a' },
    { x: 232, w: 30, h: 100, c: '#7fc3de' },
    { x: 270, w: 52, h: 160, c: '#29343c' },
    { x: 330, w: 38, h: 95, c: '#8fae7c' },
  ]
  return (
    <g>
      <rect x="0" y="230" width="400" height="30" fill="#c9e8cf" />
      {buildings.map((b) => (
        <rect key={b.x} x={b.x} y={230 - b.h} width={b.w} height={b.h} fill={b.c} opacity="0.85" rx="4" />
      ))}
    </g>
  )
}

function FlightScene() {
  return (
    <g>
      <path d="M0 200 Q100 180 200 198 T400 195 L400 260 L0 260 Z" fill="#a7d4ea" opacity="0.5" />
      <g transform="translate(230 90) rotate(18)">
        <path d="M0 0 L54 6 L60 10 L54 14 L0 8 L-14 20 L-24 18 L-16 6 L-24 -6 L-14 -8 Z" fill="#fffbf2" stroke="#29343c" strokeWidth="1.5" />
      </g>
      <path d="M40 96 Q100 96 150 96" stroke="#fffbf2" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <path d="M20 130 Q90 128 140 132" stroke="#fffbf2" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
    </g>
  )
}

function RoadtripScene() {
  return (
    <g>
      <path d="M0 210 L120 130 L200 190 L260 120 L400 210 L400 260 L0 260 Z" fill="#8fae7c" opacity="0.6" />
      <path d="M0 260 L160 230 Q200 224 240 230 L400 260 Z" fill="#e5c88f" />
      <path d="M150 260 L190 230 L210 230 L250 260 Z" fill="#4a5560" />
      <path d="M196 234 L204 234 L202 250 L198 250 Z" fill="#f4bb3d" />
    </g>
  )
}
