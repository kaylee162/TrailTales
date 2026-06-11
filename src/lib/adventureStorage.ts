import type { Adventure } from '../types/adventure'
import { starterAdventures } from './mockData'

const STORAGE_KEY = 'trailtales-adventures'
const MAX_LOCAL_STORAGE_CHARS = 4_500_000

export function getAdventures(): Adventure[] {
  if (!isLocalStorageAvailable()) return starterAdventures

  const saved = localStorage.getItem(STORAGE_KEY)

  if (!saved) return starterAdventures

  try {
    const parsed = JSON.parse(saved) as Adventure[]
    return Array.isArray(parsed) && parsed.length ? parsed : starterAdventures
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return starterAdventures
  }
}

export function saveAdventures(adventures: Adventure[]): boolean {
  if (!isLocalStorageAvailable()) {
    alert('Your browser is blocking local storage, so this adventure could not be saved.')
    return false
  }

  const payload = JSON.stringify(adventures)

  if (payload.length > MAX_LOCAL_STORAGE_CHARS) {
    alert(
      'This adventure journal is too large to save locally. Try removing a few photos or using smaller photos.',
    )
    return false
  }

  try {
    localStorage.setItem(STORAGE_KEY, payload)
    return true
  } catch (error) {
    console.error('Could not save adventures:', error)

    alert(
      'This adventure journal is too large to save locally. Try removing a few photos or using smaller photos.',
    )
    return false
  }
}

function isLocalStorageAvailable() {
  try {
    const testKey = `${STORAGE_KEY}-test`
    localStorage.setItem(testKey, '1')
    localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}
