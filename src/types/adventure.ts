export type AdventureCategory =
  | 'hike'
  | 'city'
  | 'park'
  | 'beach'
  | 'camping'
  | 'flight'
  | 'roadtrip'

export type Adventure = {
  id: string
  title: string
  location: string
  date: string
  category: AdventureCategory
  description: string
  journal: string
  miles: number
  rating: number
  mood: string
  tags: string[]
  favoriteMoment: string
  isFavorite: boolean
  isPark: boolean
  state?: string
  country?: string
  latitude?: number
  longitude?: number
  coverPhoto?: string
  photos: string[]
}
