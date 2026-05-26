import type { AdventureCategory } from '../types/adventure'

export const adventureCategories: AdventureCategory[] = [
  'hike',
  'city',
  'park',
  'beach',
  'camping',
  'flight',
  'roadtrip',
]

export const categoryLabels: Record<AdventureCategory, string> = {
  hike: 'Hike',
  city: 'City',
  park: 'Park',
  beach: 'Beach',
  camping: 'Camping',
  flight: 'Flight',
  roadtrip: 'Road Trip',
}

export const categoryEmoji: Record<AdventureCategory, string> = {
  hike: '🥾',
  city: '🏙️',
  park: '🏕️',
  beach: '🌊',
  camping: '⛺',
  flight: '✈️',
  roadtrip: '🚗',
}
