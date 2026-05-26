import type { Adventure } from '../types/adventure'

export const starterAdventures: Adventure[] = [
  {
    id: '1',
    title: 'Blue Ridge Mountain Hike',
    location: 'Blue Ridge, Georgia',
    state: 'Georgia',
    country: 'United States',
    latitude: 34.863971,
    longitude: -84.324089,
    date: '2026-05-18',
    category: 'hike',
    description: 'A foggy mountain trail with wildflowers, muddy boots, and overlook views.',
    journal:
      'The trail started quiet and misty, then opened up into a huge overlook. I packed snacks, took too many photos, and found the cutest little trail marker near the top.',
    miles: 6.2,
    rating: 5,
    mood: 'Peaceful',
    tags: ['mountains', 'trail', 'spring'],
    favoriteMoment: 'Watching the fog lift from the overlook.',
    isFavorite: true,
    isPark: true,
    coverPhoto:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    photos: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: '2',
    title: 'Savannah Weekend',
    location: 'Savannah, Georgia',
    state: 'Georgia',
    country: 'United States',
    latitude: 32.080898,
    longitude: -81.091202,
    date: '2026-04-12',
    category: 'city',
    description: 'Historic streets, Spanish moss, coffee shops, and river views.',
    journal:
      'This felt like walking through a postcard. I loved the squares, the old buildings, and the little shops tucked into every corner.',
    miles: 3.8,
    rating: 4,
    mood: 'Inspired',
    tags: ['city', 'weekend', 'photos'],
    favoriteMoment: 'Finding a tiny bookstore near the square.',
    isFavorite: false,
    isPark: false,
    coverPhoto:
      'https://images.unsplash.com/photo-1575380995422-3c5c2a3f3c23?auto=format&fit=crop&w=900&q=80',
    photos: [
      'https://images.unsplash.com/photo-1575380995422-3c5c2a3f3c23?auto=format&fit=crop&w=900&q=80',
    ],
  },
]
