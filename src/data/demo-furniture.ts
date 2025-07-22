
export interface FurnitureItem {
  id: string;
  name: string;
  price: number;
  category: string;
  vendor: string;
  image?: string;
  rating: number;
  reviews: number;
  dimensions: string;
  material: string;
  inStock: boolean;
  deliveryTime: string;
}

export const demoFurniture: FurnitureItem[] = [
  {
    id: 'oak-study-table',
    name: 'Premium Oak Study Table',
    price: 7500,
    category: 'table',
    vendor: 'Local Store',
    rating: 4.8,
    reviews: 124,
    dimensions: '120 x 60 x 75 cm',
    material: 'Solid Oak Wood',
    inStock: true,
    deliveryTime: '3-5 days'
  },
  {
    id: 'ergonomic-chair',
    name: 'Ergonomic Office Chair',
    price: 4200,
    category: 'chair',
    vendor: 'Office Plus',
    rating: 4.6,
    reviews: 89,
    dimensions: '65 x 65 x 110 cm',
    material: 'Mesh & Steel',
    inStock: true,
    deliveryTime: '2-3 days'
  },
  {
    id: 'modern-bookshelf',
    name: 'Modern 5-Tier Bookshelf',
    price: 3800,
    category: 'storage',
    vendor: 'Decor Mart',
    rating: 4.7,
    reviews: 156,
    dimensions: '80 x 30 x 180 cm',
    material: 'Engineered Wood',
    inStock: true,
    deliveryTime: '4-6 days'
  },
  {
    id: 'led-desk-lamp',
    name: 'LED Desk Lamp with Wireless Charging',
    price: 1200,
    category: 'lighting',
    vendor: 'Tech Store',
    rating: 4.5,
    reviews: 67,
    dimensions: '20 x 20 x 45 cm',
    material: 'Aluminum & Plastic',
    inStock: false,
    deliveryTime: '7-10 days'
  },
  {
    id: 'storage-ottoman',
    name: 'Velvet Storage Ottoman',
    price: 2500,
    category: 'seating',
    vendor: 'Home Decor Co',
    rating: 4.4,
    reviews: 43,
    dimensions: '50 x 35 x 40 cm',
    material: 'Velvet & Wood',
    inStock: true,
    deliveryTime: '5-7 days'
  }
];

export const demoRoomPresets = [
  {
    id: 'bedroom',
    name: 'Modern Bedroom',
    description: 'Sleek and minimalist bedroom setup',
    suggestedBudget: { min: 25000, max: 50000 },
    essentialItems: ['bed', 'wardrobe', 'nightstand', 'lighting']
  },
  {
    id: 'living-room',
    name: 'Cozy Living Room',
    description: 'Comfortable family living space',
    suggestedBudget: { min: 35000, max: 75000 },
    essentialItems: ['sofa', 'coffee-table', 'tv-unit', 'lighting']
  },
  {
    id: 'home-office',
    name: 'Productive Home Office',
    description: 'Efficient workspace for remote work',
    suggestedBudget: { min: 15000, max: 35000 },
    essentialItems: ['desk', 'chair', 'storage', 'lighting']
  }
];
