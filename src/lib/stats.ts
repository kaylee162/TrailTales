import type { Adventure } from '../types/adventure'

export function getAdventureStats(adventures: Adventure[]) {
  const totalMiles = adventures.reduce((sum, adventure) => sum + Number(adventure.miles || 0), 0)
  const states = new Set(adventures.map((a) => a.state).filter(Boolean))
  const countries = new Set(adventures.map((a) => a.country).filter(Boolean))
  const parks = adventures.filter((a) => a.isPark).length
  const photos = adventures.reduce((sum, adventure) => sum + adventure.photos.length, 0)

  const categoryCounts = adventures.reduce<Record<string, number>>((counts, adventure) => {
    counts[adventure.category] = (counts[adventure.category] || 0) + 1
    return counts
  }, {})

  const yearlyCounts = adventures.reduce<Record<string, number>>((counts, adventure) => {
    const year = new Date(adventure.date).getFullYear().toString()
    counts[year] = (counts[year] || 0) + 1
    return counts
  }, {})

  const favorite = adventures.find((adventure) => adventure.isFavorite) ?? adventures[0]

  return {
    totalAdventures: adventures.length,
    totalMiles,
    statesVisited: states.size,
    countriesVisited: countries.size,
    parksVisited: parks,
    totalPhotos: photos,
    categoryCounts,
    yearlyCounts,
    favorite,
  }
}
