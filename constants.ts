import { ItemData } from './types';

export const INITIAL_ITEMS: ItemData[] = [
  {
    id: '1',
    name: 'Welcoming Archway',
    description: 'A grand entrance featuring custom sustainable wood structures, draped with linen and adorned with native desert flora to set the tone for the oasis.',
    image: 'https://picsum.photos/800/600?random=1',
  },
  {
    id: '2',
    name: 'Boho Tents',
    description: 'Five luxurious relaxation units equipped with plush cushions, low tables, and ambient lighting, providing a serene escape for guests.',
    image: 'https://picsum.photos/800/600?random=2',
  },
  {
    id: '3',
    name: 'Site Decorations',
    description: 'Curated ambiance elements including woven lanterns, macramé art pieces, and warm string lighting to create a cohesive magical atmosphere.',
    image: 'https://picsum.photos/800/600?random=3',
  },
  {
    id: '4',
    name: 'Premium Harvest Feast',
    description: 'A culinary journey featuring live BBQ stations, fresh organic salads, and artisanal breads, celebrating the bounty of the season.',
    image: 'https://picsum.photos/800/600?random=4',
  },
  {
    id: '5',
    name: 'Ice Cream Cart',
    description: 'A charming vintage trike serving artisanal gelato and sorbets in custom branded cups, perfect for a refreshing treat.',
    image: 'https://picsum.photos/800/600?random=5',
  },
  {
    id: '6',
    name: 'Oasis Legacy Gift Bags',
    description: 'Premium tote bags containing a portable charger, cooling mist spray, scented soy candle, and a keepsake event guide.',
    image: 'https://picsum.photos/800/600?random=6',
  },
  {
    id: '7',
    name: 'Selfie Setup Area',
    description: 'A dedicated photogenic zone with a floral backdrop, ring lights, and fun thematic props to capture memories.',
    image: 'https://picsum.photos/800/600?random=7',
  },
  {
    id: '8',
    name: 'Games Area',
    description: 'Interactive entertainment zone featuring high-quality activities for everyone to enjoy. A variety of games are available to ensure guests of all ages are entertained throughout the event.',
    image: 'https://picsum.photos/800/600?random=8',
    subItems: [
      { id: '8-1', name: 'Table Football', image: 'https://picsum.photos/800/600?random=81' },
      { id: '8-2', name: 'Table Tennis', image: 'https://picsum.photos/800/600?random=82' },
      { id: '8-3', name: 'Giant Soccer', image: 'https://picsum.photos/800/600?random=83' },
      { id: '8-4', name: 'Carrom Board', image: 'https://picsum.photos/800/600?random=84' },
    ]
  },
  {
    id: '9',
    name: 'Fragrance Mixing Activity',
    description: 'An interactive station where guests can create their own signature scent using essential oils and botanical extracts.',
    image: 'https://picsum.photos/800/600?random=9',
  },
  {
    id: '10',
    name: 'Plant a Seed Station',
    description: 'A symbolic activity allowing guests to pot their own succulent or herb to take home, representing growth and the future.',
    image: 'https://picsum.photos/800/600?random=10',
  },
];