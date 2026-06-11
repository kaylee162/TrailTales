import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { Adventure } from '../types/adventure'
import { getAdventures, saveAdventures } from '../lib/adventureStorage'

export type AdventureContextType = {
  adventures: Adventure[]
  addAdventure: (adventure: Omit<Adventure, 'id'>) => string | null
  updateAdventure: (id: string, adventure: Omit<Adventure, 'id'>) => boolean
  deleteAdventure: (id: string) => boolean
  getAdventureById: (id: string) => Adventure | undefined
}

const AdventureContext = createContext<AdventureContextType | null>(null)

export function AdventureProvider({ children }: { children: React.ReactNode }) {
  const [adventures, setAdventures] = useState<Adventure[]>(() => getAdventures())

  const persistAdventures = useCallback((nextAdventures: Adventure[]) => {
    const didSave = saveAdventures(nextAdventures)

    if (didSave) {
      setAdventures(nextAdventures)
    }

    return didSave
  }, [])

  const addAdventure = useCallback(
    (adventure: Omit<Adventure, 'id'>) => {
      const id = uuidv4()
      const nextAdventures = [{ ...adventure, id }, ...adventures]

      return persistAdventures(nextAdventures) ? id : null
    },
    [adventures, persistAdventures],
  )

  const updateAdventure = useCallback(
    (id: string, adventure: Omit<Adventure, 'id'>) => {
      const nextAdventures = adventures.map((item) => (item.id === id ? { ...adventure, id } : item))
      return persistAdventures(nextAdventures)
    },
    [adventures, persistAdventures],
  )

  const deleteAdventure = useCallback(
    (id: string) => {
      const nextAdventures = adventures.filter((item) => item.id !== id)
      return persistAdventures(nextAdventures)
    },
    [adventures, persistAdventures],
  )

  const getAdventureById = useCallback(
    (id: string) => adventures.find((adventure) => adventure.id === id),
    [adventures],
  )

  const value = useMemo(
    () => ({ adventures, addAdventure, updateAdventure, deleteAdventure, getAdventureById }),
    [adventures, addAdventure, updateAdventure, deleteAdventure, getAdventureById],
  )

  return <AdventureContext.Provider value={value}>{children}</AdventureContext.Provider>
}

export function useAdventures() {
  const context = useContext(AdventureContext)
  if (!context) throw new Error('useAdventures must be used inside AdventureProvider')
  return context
}
