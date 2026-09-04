export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  skinType: string;
  productPurchased: string;
  rating: number;
  duration: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: 't-1',
    quote: "My routine finally feels intentional. For the first time in years, my sensitive reactive skin is completely calm through winter heating and international travel.",
    author: "Genevieve M.",
    location: "Zurich, Switzerland",
    skinType: "Sensitive / Reactive",
    productPurchased: "The Architectural Ritual Set",
    rating: 5,
    duration: "Using VERA for 6 months"
  },
  {
    id: 't-2',
    quote: "Renewal Serum is the rarest kind of product—it produces an unmistakable textural bounce within 48 hours without any tackiness or breakout rebound.",
    author: "Soren L.",
    location: "Copenhagen, Denmark",
    skinType: "Combination / Prone to Congestion",
    productPurchased: "Renewal Serum",
    rating: 5,
    duration: "Using VERA for 4 months"
  },
  {
    id: 't-3',
    quote: "The Mineral Veil SPF 50+ is an absolute masterpiece. No white cast, zero eye stinging, and it leaves the most refined velvet finish under makeup.",
    author: "Aria K.",
    location: "New York, USA",
    skinType: "Dry / Hyperpigmentation",
    productPurchased: "Mineral Veil SPF 50+",
    rating: 5,
    duration: "Using VERA for 3 months"
  },
  {
    id: 't-4',
    quote: "The texture of Barrier Crème is like cashmere. It immediately halted trans-epidermal water loss after a harsh laser treatment when nothing else worked.",
    author: "Dr. Maya P.",
    location: "London, UK",
    skinType: "Dehydrated / Post-Clinical",
    productPurchased: "Barrier Recovery Crème",
    rating: 5,
    duration: "Using VERA for 8 months"
  }
];
