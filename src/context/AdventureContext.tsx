import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { Adventure } from '../types/adventure'
import { getAdventures, saveAdventures } from '../lib/adventureStorage'

type AdventureContextType = {
  adventures: Adventure[]
  addAdventure: (adventure: Omit<Adventure, 'id'>) => string
  updateAdventure: (id: string, adventure: Omit<Adventure, 'id'>) => void
  deleteAdventure: (id: string) => void
  getAdventureById: (id: string) => Adventure | undefined
}

const AdventureContext = createContext<AdventureContextType | null>(null)

export function AdventureProvider({ children }: { children: React.ReactNode }) {
  const [adventures, setAdventures] = useState<Adventure[]>(() => getAdventures())

  useEffect(() => {
    saveAdventures(adventures)
  }, [adventures])

  const addAdventure = (adventure: Omit<Adventure, 'id'>) => {
    const id = uuidv4()
    setAdventures((current) => [{ ...adventure, id }, ...current])
    return id
  }

  const updateAdventure = (id: string, adventure: Omit<Adventure, 'id'>) => {
    setAdventures((current) => current.map((item) => (item.id === id ? { ...adventure, id } : item)))
  }

  const deleteAdventure = (id: string) => {
    setAdventures((current) => current.filter((item) => item.id !== id))
  }

  const getAdventureById = (id: string) => adventures.find((adventure) => adventure.id === id)

  const value = useMemo(
    () => ({ adventures, addAdventure, updateAdventure, deleteAdventure, getAdventureById }),
    [adventures]
  )

  return <AdventureContext.Provider value={value}>{children}</AdventureContext.Provider>
}

export function useAdventures() {
  const context = useContext(AdventureContext)
  if (!context) throw new Error('useAdventures must be used inside AdventureProvider')
  return context
}
