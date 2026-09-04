export type SkinType = 'Dry' | 'Oily' | 'Sensitive' | 'Combination' | 'Balanced' | 'All';

export type SkinConcern = 
  | 'Dryness'
  | 'Dullness'
  | 'Texture'
  | 'Sensitivity'
  | 'Fine Lines'
  | 'Uneven Tone';

export type ProductCategory = 'Skin' | 'Body' | 'Rituals' | 'Sets';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  slug: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  size: string;
  inStock: boolean;
  stockCount: number;
  bestseller?: boolean;
  featured?: boolean;
  isNew?: boolean;
  shortDescription: string;
  description: string;
  images: string[];
  keyActives: { name: string; percentage?: string; purpose: string }[];
  fullIngredients: string;
  skinTypes: SkinType[];
  concerns: SkinConcern[];
  ritual: {
    step: string;
    timing: 'Morning' | 'Evening' | 'Both';
    howToUse: string;
    texture: string;
    scent: string;
  };
  clinicalResults?: string[];
  pairsWith?: string[]; // product slugs
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  skinType: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  approved: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Skin Science' | 'Rituals' | 'Ingredients' | 'Beauty' | 'Wellness';
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  coverImage: string;
  excerpt: string;
  content: {
    lead: string;
    sections: {
      heading: string;
      body: string;
      quote?: string;
    }[];
  };
}

export interface RoutineSlot {
  stepNumber: string;
  stepName: string;
  category: string;
  timeOfDay: 'Morning' | 'Evening';
  product: Product;
  rationale: string;
}

export interface QuizAnswer {
  skinType?: SkinType;
  primaryConcern?: SkinConcern;
  skinFeeling?: string;
  currentRoutine?: string;
  preferredFinish?: string;
}

export interface Order {
  id: string;
  date: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  paymentMethod: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  skinType?: SkinType;
  concerns?: SkinConcern[];
  savedRoutine?: {
    morning: Product[];
    evening: Product[];
  };
}
