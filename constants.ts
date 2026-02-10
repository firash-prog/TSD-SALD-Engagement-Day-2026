import { ItemData } from './types';

export const INITIAL_ITEMS: ItemData[] = [
  {
    id: 'entrance',
    name: 'Welcoming Archway',
    description: 'Grand rustic wooden archway at the entrance, featuring intricate Arabic calligraphy and warm Moroccan lanterns.',
    image: 'https://images.unsplash.com/photo-1540932296481-d448c26bb8e1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'accommodation',
    name: 'Accommodation & Lounge',
    description: 'Five premium canvas tents with warm lighting, rugs, and pillows set against the sunset for a cozy glamping atmosphere.',
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'venue',
    name: 'Venue Styling',
    description: 'Desert-themed decor with vintage walkways, rustic furniture, and pampas grass arrangements under warm ambient lighting.',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dining',
    name: 'Premium Harvest Feast',
    description: 'A lavish outdoor banquet featuring live BBQ stations and a harvest table with gourmet food.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gifting',
    name: 'Oasis Legacy Gift Bags',
    description: 'Curated gift set including a tote bag, charger, mister, and scented candle.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'refreshments',
    name: 'Cool-Down Cruiser',
    description: 'Vintage tricycle ice cream cart serving unlimited popsicles to keep guests refreshed.',
    image: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'social',
    name: 'Selfie Setup Area',
    description: 'Themed photo backdrop with a large wooden frame, dried palm leaves, and macrame hangings.',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'games',
    name: 'Games Area',
    description: 'Recreational zone with Table Football, Table Tennis, and Giant Soccer for team building fun.',
    image: 'https://images.unsplash.com/photo-1529156069893-b208dcba8207?auto=format&fit=crop&w=800&q=80',
    subItems: [
      { id: 'game-1', name: 'Table Football', image: 'https://images.unsplash.com/photo-1551972873-b7e8754e8e26?auto=format&fit=crop&w=800&q=80' },
      { id: 'game-2', name: 'Table Tennis', image: 'https://images.unsplash.com/photo-1534158914592-062992bbe900?auto=format&fit=crop&w=800&q=80' },
    ]
  },
  {
    id: 'workshop-scent',
    name: 'Aromatherapy Blends',
    description: 'Interactive perfume lab where guests create custom scents using essential oils and fresh herbs.',
    image: 'https://images.unsplash.com/photo-1629198721535-64906f23ca32?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'workshop-plant',
    name: 'Plant a Seed',
    description: 'Potting station activity where guests plant succulents in terracotta pots to take home.',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80',
  },
];