import { Building2, Car, Mountain, Plane, Tent, Trees, Waves } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import type { AdventureCategory } from '../../types/adventure'

const icons = {
  hike: Mountain,
  city: Building2,
  park: Trees,
  beach: Waves,
  camping: Tent,
  flight: Plane,
  roadtrip: Car,
} satisfies Record<AdventureCategory, React.ComponentType<LucideProps>>

export default function CategoryIcon({ category, ...props }: { category: AdventureCategory } & LucideProps) {
  const Icon = icons[category] ?? Mountain
  return <Icon aria-hidden="true" {...props} />
}
