
export interface FurnitureItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  vendor: string;
  image?: string;
  rating: number;
  reviews: number;
  dimensions: string;
  material: string;
  inStock: boolean;
  deliveryTime: string;
  isLocalVendor?: boolean;
  isBestFit?: boolean;
  colors?: string[];
  discount?: number;
  roomCompatibility: string[];
}

export interface VendorProfile {
  id: string;
  name: string;
  type: 'local' | 'online' | 'premium';
  rating: number;
  reviews: number;
  deliveryTime: string;
  returnPolicy: string;
  paymentOptions: string[];
  specialties: string[];
  image?: string;
  verified: boolean;
  portfolio: {
    projectCount: number;
    averageBudget: string;
    successRate: number;
  };
}

export const demoFurniture: FurnitureItem[] = [
  {
    id: 'oak-study-table',
    name: 'Premium Oak Study Table',
    price: 7500,
    originalPrice: 9000,
    category: 'table',
    vendor: 'Hyderabad Home Store',
    rating: 4.8,
    reviews: 124,
    dimensions: '120 x 60 x 75 cm',
    material: 'Solid Oak Wood',
    inStock: true,
    deliveryTime: '3-5 days',
    isLocalVendor: true,
    isBestFit: true,
    colors: ['Natural Oak', 'Dark Walnut', 'White'],
    discount: 17,
    roomCompatibility: ['bedroom', 'home-office', 'living-room']
  },
  {
    id: 'ergonomic-chair',
    name: 'Ergonomic Executive Chair',
    price: 4200,
    originalPrice: 5500,
    category: 'chair',
    vendor: 'Office Plus Hyderabad',
    rating: 4.6,
    reviews: 89,
    dimensions: '65 x 65 x 110 cm',
    material: 'Mesh & Steel Frame',
    inStock: true,
    deliveryTime: '2-3 days',
    isLocalVendor: true,
    isBestFit: false,
    colors: ['Black', 'Grey', 'Navy Blue'],
    discount: 24,
    roomCompatibility: ['home-office', 'bedroom']
  },
  {
    id: 'modern-bookshelf',
    name: 'Modern 5-Tier Bookshelf',
    price: 3800,
    originalPrice: 4500,
    category: 'storage',
    vendor: 'Decor Mart',
    rating: 4.7,
    reviews: 156,
    dimensions: '80 x 30 x 180 cm',
    material: 'Engineered Wood',
    inStock: true,
    deliveryTime: '4-6 days',
    isLocalVendor: false,
    isBestFit: true,
    colors: ['Wenge', 'White', 'Natural'],
    discount: 16,
    roomCompatibility: ['living-room', 'bedroom', 'home-office']
  },
  {
    id: 'led-desk-lamp',
    name: 'LED Desk Lamp with Wireless Charging',
    price: 1200,
    originalPrice: 1500,
    category: 'lighting',
    vendor: 'Tech Store',
    rating: 4.5,
    reviews: 67,
    dimensions: '20 x 20 x 45 cm',
    material: 'Aluminum & Plastic',
    inStock: false,
    deliveryTime: '7-10 days',
    isLocalVendor: false,
    isBestFit: false,
    colors: ['Silver', 'Black', 'White'],
    discount: 20,
    roomCompatibility: ['home-office', 'bedroom']
  },
  {
    id: 'storage-ottoman',
    name: 'Velvet Storage Ottoman',
    price: 2500,
    originalPrice: 3200,
    category: 'seating',
    vendor: 'Home Decor Co',
    rating: 4.4,
    reviews: 43,
    dimensions: '50 x 35 x 40 cm',
    material: 'Velvet & Wood Frame',
    inStock: true,
    deliveryTime: '5-7 days',
    isLocalVendor: true,
    isBestFit: false,
    colors: ['Navy', 'Emerald', 'Burgundy', 'Grey'],
    discount: 22,
    roomCompatibility: ['living-room', 'bedroom']
  },
  {
    id: 'modern-sofa',
    name: '3-Seater Fabric Sofa',
    price: 25000,
    originalPrice: 32000,
    category: 'seating',
    vendor: 'Premium Furniture',
    rating: 4.9,
    reviews: 201,
    dimensions: '200 x 90 x 85 cm',
    material: 'Premium Fabric & Hardwood',
    inStock: true,
    deliveryTime: '7-10 days',
    isLocalVendor: true,
    isBestFit: true,
    colors: ['Charcoal', 'Beige', 'Navy'],
    discount: 22,
    roomCompatibility: ['living-room']
  },
  {
    id: 'coffee-table',
    name: 'Glass Coffee Table',
    price: 8500,
    originalPrice: 11000,
    category: 'table',
    vendor: 'Glass World',
    rating: 4.3,
    reviews: 78,
    dimensions: '110 x 60 x 45 cm',
    material: 'Tempered Glass & Steel',
    inStock: true,
    deliveryTime: '4-6 days',
    isLocalVendor: false,
    isBestFit: false,
    colors: ['Clear', 'Tinted', 'Frosted'],
    discount: 23,
    roomCompatibility: ['living-room']
  },
  {
    id: 'wardrobe',
    name: '4-Door Sliding Wardrobe',
    price: 35000,
    originalPrice: 45000,
    category: 'storage',
    vendor: 'Closet King',
    rating: 4.6,
    reviews: 134,
    dimensions: '240 x 60 x 220 cm',
    material: 'Engineered Wood & Mirror',
    inStock: true,
    deliveryTime: '10-14 days',
    isLocalVendor: true,
    isBestFit: true,
    colors: ['White', 'Walnut', 'Grey'],
    discount: 22,
    roomCompatibility: ['bedroom']
  }
];

export const demoVendors: VendorProfile[] = [
  {
    id: 'hyderabad-home',
    name: 'Hyderabad Home Store',
    type: 'local',
    rating: 4.8,
    reviews: 1240,
    deliveryTime: '2-5 days',
    returnPolicy: '30 days easy return',
    paymentOptions: ['Cash', 'Card', 'UPI', 'EMI'],
    specialties: ['Wooden Furniture', 'Custom Design', 'Budget Solutions'],
    verified: true,
    portfolio: {
      projectCount: 450,
      averageBudget: '₹25,000 - ₹50,000',
      successRate: 96
    }
  },
  {
    id: 'premium-furniture',
    name: 'Premium Furniture',
    type: 'premium',
    rating: 4.9,
    reviews: 890,
    deliveryTime: '5-10 days',
    returnPolicy: '45 days return with warranty',
    paymentOptions: ['Card', 'EMI', 'Bank Transfer'],
    specialties: ['Luxury Furniture', 'Italian Design', 'Premium Materials'],
    verified: true,
    portfolio: {
      projectCount: 320,
      averageBudget: '₹75,000 - ₹1,50,000',
      successRate: 98
    }
  },
  {
    id: 'office-plus',
    name: 'Office Plus Hyderabad',
    type: 'local',
    rating: 4.6,
    reviews: 567,
    deliveryTime: '1-3 days',
    returnPolicy: '15 days return',
    paymentOptions: ['Cash', 'Card', 'UPI'],
    specialties: ['Office Furniture', 'Ergonomic Solutions', 'Bulk Orders'],
    verified: true,
    portfolio: {
      projectCount: 780,
      averageBudget: '₹10,000 - ₹30,000',
      successRate: 94
    }
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
