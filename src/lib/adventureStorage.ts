import type { Adventure } from '../types/adventure'
import { starterAdventures } from './mockData'

const STORAGE_KEY = 'trailtales-adventures'

export function getAdventures(): Adventure[] {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (!saved) return starterAdventures

  try {
    const parsed = JSON.parse(saved) as Adventure[]
    return parsed.length ? parsed : starterAdventures
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return starterAdventures
  }
}

export function saveAdventures(adventures: Adventure[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(adventures))
  } catch (error) {
    console.error('Could not save adventures:', error)

    alert(
      'This adventure is too large to save locally. Try removing a few photos or uploading smaller photos.',
    )
  }
}