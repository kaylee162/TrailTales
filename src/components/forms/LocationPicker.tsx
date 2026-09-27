import { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin, Search, X } from 'lucide-react'

type PickedLocation = {
  location: string
  latitude?: number
  longitude?: number
  state?: string
  country?: string
}

type NominatimResult = {
  place_id: number
  display_name: string
  lat: string
  lon: string
  address?: {
    state?: string
    country?: string
  }
}

type LocationPickerProps = {
  location: string
  latitude?: number
  longitude?: number
  state?: string
  country?: string
  onPick: (location: PickedLocation) => void
}

const DEFAULT_CENTER: LatLngExpression = [32.8, -83.5]

const scrapbookPin = new Icon({
  iconUrl:
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(`
      <svg width="42" height="42" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 39s13-12.2 13-24A13 13 0 1 0 8 15c0 11.8 13 24 13 24Z" fill="#c2521b" stroke="#16211b" stroke-width="2"/>
        <circle cx="21" cy="15" r="5" fill="#f2ede3"/>
      </svg>
    `),
  iconSize: [42, 42],
  iconAnchor: [21, 42],
})

export default function LocationPicker({
  location,
  latitude,
  longitude,
  state,
  country,
  onPick,
}: LocationPickerProps) {
  const [query, setQuery] = useState(location)
  const [results, setResults] = useState<NominatimResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState('')

  const selectedPosition: LatLngExpression | null =
    typeof latitude === 'number' && typeof longitude === 'number' ? [latitude, longitude] : null


  const searchLocation = async () => {
    if (query.trim().length < 2) return

    try {
      setIsSearching(true)
      setError('')

      const params = new URLSearchParams({
        q: query,
        format: 'jsonv2',
        addressdetails: '1',
        limit: '5',
      })

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?${params}`,
      )

      if (!response.ok) throw new Error('Search failed')

      const data = (await response.json()) as NominatimResult[]
      setResults(data)

      if (data.length === 0) {
        setError('No places found. Try a more specific search.')
      }
    } catch {
      setError('Could not search right now. Try again in a second.')
    } finally {
      setIsSearching(false)
    }
  }

  const chooseResult = (result: NominatimResult) => {
    onPick({
      location: result.display_name,
      latitude: Number(result.lat),
      longitude: Number(result.lon),
      state: result.address?.state ?? '',
      country: result.address?.country ?? '',
    })

    setQuery(result.display_name)
    setResults([])
  }

  const clearLocation = () => {
    onPick({
      location: '',
      latitude: undefined,
      longitude: undefined,
      state: '',
      country: '',
    })

    setQuery('')
    setResults([])
    setError('')
  }

  return (
    <section className="lg:col-span-2">
      <div className="mb-3 flex items-start justify-between gap-3 sm:items-center">
        <div>
          <p className="field-label mb-1">Location pin</p>
          <p className="field-hint">
            Search for a place, choose a result, or click directly on the map.
          </p>
        </div>

        {location && (
          <button
            type="button"
            onClick={clearLocation}
            className="btn btn-outline min-h-9 px-3.5 text-sm"
          >
            <X size={14} /> Clear
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-stone bg-parchment">
        <div className="relative border-b border-stone p-3">
          <div className="flex gap-2 sm:gap-3">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                size={20}
              />

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    searchLocation()
                  }
                }}
                placeholder="Try Tybee Island, Yosemite, Paris..."
                className="input pl-11"
              />
            </div>

            <button
              type="button"
              onClick={searchLocation}
              className="btn btn-dark min-h-12 px-4 sm:px-5"
            >
              Search
            </button>
          </div>

          {(results.length > 0 || isSearching || error) && (
            <div className="absolute left-3 right-3 top-[4.25rem] z-[900] overflow-hidden rounded-xl border border-stone bg-parchment shadow-soft">
              {isSearching && (
                <p className="px-4 py-3 text-sm font-medium text-muted">
                  Searching the map...
                </p>
              )}

              {error && (
                <p className="px-4 py-3 text-sm font-medium text-blaze-dark">
                  {error}
                </p>
              )}

              {results.map((result) => (
                <button
                  key={result.place_id}
                  type="button"
                  onClick={() => chooseResult(result)}
                  className="flex w-full items-start gap-3 border-t border-stone px-4 py-3 text-left first:border-t-0 hover:bg-sand"
                >
                  <MapPin className="mt-0.5 shrink-0 text-blaze" size={18} />
                  <span className="font-medium">{result.display_name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <MapContainer
          center={selectedPosition ?? DEFAULT_CENTER}
          zoom={selectedPosition ? 10 : 5}
          scrollWheelZoom={false}
          className="travel-map h-72 w-full sm:h-[21.25rem]"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ClickToPick onPick={onPick} setQuery={setQuery} />

          {selectedPosition && (
            <>
              <MapFlyTo position={selectedPosition} />
              <Marker position={selectedPosition} icon={scrapbookPin} />
            </>
          )}
        </MapContainer>
      </div>

      {(location || latitude || longitude) && (
        <div className="mt-3 rounded-xl bg-sand px-4 py-3 font-mono text-xs leading-relaxed text-body">
          Picked: {location || 'Custom map point'}
          {state ? ` · ${state}` : ''}
          {country ? ` · ${country}` : ''}
          {typeof latitude === 'number' && typeof longitude === 'number'
            ? ` · ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
            : ''}
        </div>
      )}
    </section>
  )
}

function MapFlyTo({ position }: { position: LatLngExpression }) {
  const map = useMapEvents({})

  useEffect(() => {
    map.flyTo(position, 11)
  }, [map, position])

  return null
}

function ClickToPick({
  onPick,
  setQuery,
}: {
  onPick: (location: PickedLocation) => void
  setQuery: (query: string) => void
}) {
  useMapEvents({
    click: async (event) => {
      const picked = await reverseGeocode(event.latlng.lat, event.latlng.lng)
      onPick(picked)
      setQuery(picked.location)
    },
  })

  return null
}

async function reverseGeocode(
  latitude: number,
  longitude: number,
): Promise<PickedLocation> {
  const params = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
    format: 'jsonv2',
    addressdetails: '1',
  })

  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?${params}`,
  )

  if (!response.ok) {
    return {
      location: 'Custom map point',
      latitude,
      longitude,
    }
  }

  const data = (await response.json()) as {
    display_name?: string
    address?: {
      state?: string
      country?: string
    }
  }

  return {
    location: data.display_name ?? 'Custom map point',
    latitude,
    longitude,
    state: data.address?.state ?? '',
    country: data.address?.country ?? '',
  }
}