import { SkinConcern } from '../types';

export interface ConcernCategory {
  id: SkinConcern;
  name: string;
  subtitle: string;
  tagline: string;
  image: string;
  recommendedProductSlug: string;
  keyIngredient: string;
}

export const concernsData: ConcernCategory[] = [
  {
    id: 'Dryness',
    name: 'Dryness & Dehydration',
    subtitle: 'Restore vital cellular water reservoirs',
    tagline: 'Deep lipid replenishment to quench parched skin and restore supple bounce.',
    image: '/images/products/barrier-creme.jpg',
    recommendedProductSlug: 'barrier-creme',
    keyIngredient: 'Physiological Ceramides + Squalane'
  },
  {
    id: 'Dullness',
    name: 'Dullness & Fatigue',
    subtitle: 'Awaken luminous lit-from-within radiance',
    tagline: 'Combat oxidative stress, stress fatigue, and restore crystalline vitality.',
    image: '/images/products/renewal-serum.jpg',
    recommendedProductSlug: 'renewal-serum',
    keyIngredient: '5% Niacinamide + Bio-Peptides'
  },
  {
    id: 'Texture',
    name: 'Uneven Texture & Pores',
    subtitle: 'Micro-refinement without harsh abrasion',
    tagline: 'Gentle enzymatic balance and bio-ferments to polish and soften surface grain.',
    image: '/images/products/clarifying-essence.jpg',
    recommendedProductSlug: 'clarifying-essence',
    keyIngredient: 'Galactomyces + White Willow Bark'
  },
  {
    id: 'Sensitivity',
    name: 'Sensitivity & Reactivity',
    subtitle: 'Calm the barrier under acute stress',
    tagline: 'Soothe transient erythema, heat, and environmental reactivity with biomimetic calm.',
    image: '/images/products/cleansing-balm.jpg',
    recommendedProductSlug: 'gentle-cleansing-balm',
    keyIngredient: 'Centella Asiatica + Colloidal Oat'
  },
  {
    id: 'Fine Lines',
    name: 'Fine Lines & Firmness',
    subtitle: 'Support cellular architecture and density',
    tagline: 'Target expression lines and loss of cushion with messenger peptides and bakuchiol.',
    image: '/images/products/luminous-botanical-oil.jpg',
    recommendedProductSlug: 'luminous-botanical-oil',
    keyIngredient: 'Bio-Identical Hexapeptide-8'
  },
  {
    id: 'Uneven Tone',
    name: 'Uneven Tone & Spots',
    subtitle: 'Fade hyperpigmentation and sun damage',
    tagline: 'Stabilized lipid Vitamin C and ferulic acid clarify and unify complexions gracefully.',
    image: '/images/products/vitamin-c-elixir.jpg',
    recommendedProductSlug: 'vitamin-c-antioxidant-elixir',
    keyIngredient: '15% THD Ascorbate + Ferulic'
  }
];
