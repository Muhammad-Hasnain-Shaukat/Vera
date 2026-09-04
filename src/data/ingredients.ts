export interface IngredientDetail {
  id: string;
  name: string;
  chemicalName: string;
  category: string;
  description: string;
  mechanism: string;
  clinicalBenefit: string;
  concentrationUsed: string;
  source: string;
  idealFor: string[];
}

export const ingredientsData: IngredientDetail[] = [
  {
    id: 'niacinamide',
    name: 'Niacinamide',
    chemicalName: 'Nicotinamide / Vitamin B3',
    category: 'Cellular Communication & Barrier',
    description: 'A powerhouse water-soluble vitamin that works with natural substances in the skin to visibly minimize enlarged pores, tighten lax pores, and improve uneven skin tone.',
    mechanism: 'Precursor to coenzymes NAD+/NADH, which fuel cellular energy production and stimulate ceramide synthesis in the stratum corneum.',
    clinicalBenefit: 'Reinforces lipid barrier, reduces sebum overproduction, and visibly fades post-blemish discoloration.',
    concentrationUsed: '3% – 5% Optimal Clinical Window',
    source: 'High-purity bio-synthesis with minimal residual nicotinic acid to eliminate flushing.',
    idealFor: ['Enlarged Pores', 'Uneven Tone', 'Compromised Barrier', 'Redness']
  },
  {
    id: 'hyaluronic-acid',
    name: 'Tri-Molecular Hyaluronic Acid',
    chemicalName: 'Multi-Weight Sodium Hyaluronate',
    category: 'Intensive Cellular Hydration',
    description: 'A synergistic tri-molecular blend engineered to hydrate across distinct cellular strata: high weight for surface shield, medium for barrier retention, and low weight for deep matrix cushion.',
    mechanism: 'Binds up to 1,000 times its molecular weight in water, creating a non-occlusive viscoelastic reservoir in the epidermis.',
    clinicalBenefit: 'Instant epidermal plumping, softens micro-creases, and restores youthful spring and resilience.',
    concentrationUsed: '2.5% Balanced Multi-Fraction',
    source: 'Natural bio-fermentation of non-GMO plant glucose.',
    idealFor: ['Dehydration', 'Fine Lines', 'Loss of Elasticity', 'Dull Skin']
  },
  {
    id: 'ceramides',
    name: 'Physiological Ceramides',
    chemicalName: 'Ceramides NP, AP, EOP + Phytosphingosine',
    category: 'Lipid Architecture & Defense',
    description: 'Identical to the essential lipids naturally found in human skin cells, ceramides form over 50% of the skin’s composition and hold the skin cells together.',
    mechanism: 'Replaces intercellular mortar in the brick-and-mortar stratum corneum, halting trans-epidermal water loss (TEWL).',
    clinicalBenefit: 'Rapid relief from sensitization, restores dry/cracked surfaces, and fortifies defenses against urban environmental stress.',
    concentrationUsed: '3% Physiological 3:1:1 Ratio',
    source: 'Plant-derived bio-fermented lipids matching human molecular geometry.',
    idealFor: ['Dryness', 'Barrier Damage', 'Eczema-Prone', 'Post-Treatment']
  },
  {
    id: 'vitamin-c',
    name: 'Lipid-Soluble Vitamin C',
    chemicalName: 'Tetrahexyldecyl (THD) Ascorbate',
    category: 'Antioxidant & Collagen Catalyst',
    description: 'An exceptionally stable, oil-soluble form of Vitamin C that penetrates up to 50 times better than traditional L-ascorbic acid without triggering acidity-based inflammation.',
    mechanism: 'Neutralizes reactive oxygen species (ROS), suppresses melanogenesis, and serves as an indispensable enzymatic cofactor for collagen synthesis.',
    clinicalBenefit: 'Illuminates dull skin, dramatically fades stubborn sun spots, and shields dermal fibers from photo-aging.',
    concentrationUsed: '15% Stabilized Pure Ester',
    source: 'Advanced esterification ensuring zero oxidation or color change.',
    idealFor: ['Hyperpigmentation', 'Photo-Damage', 'Dullness', 'Loss of Firmness']
  },
  {
    id: 'ectoin',
    name: 'Ectoin Extremolyte',
    chemicalName: '1,4,5,6-Tetrahydro-2-methyl-4-pyrimidinecarboxylic acid',
    category: 'Extreme Osmoprotection',
    description: 'A natural extremolyte discovered in microorganisms thriving in the Earth’s most inhospitable salt lakes and thermal deserts.',
    mechanism: 'Forms hydro-complexes around proteins and cell membranes, creating an invisible cellular water jacket that shields against high UV, HEV blue light, and airborne particulate toxins.',
    clinicalBenefit: 'Prevents cellular stress damage, mitigates inflammation, and maintains hydration under dry air conditions.',
    concentrationUsed: '1% – 1.5%',
    source: 'Microbial bio-fermentation under strict laboratory controls.',
    idealFor: ['Urban Pollution', 'Screen Fatigue', 'Sensitized Skin', 'Travel']
  },
  {
    id: 'peptides',
    name: 'Bio-Identical Peptides',
    chemicalName: 'Acetyl Hexapeptide-8 + Palmitoyl Tripeptide-38',
    category: 'Structural Remodeling',
    description: 'Specific messenger peptide sequences designed to signal skin cells to synthesize new structural collagen, elastin, and hyaluronic acid.',
    mechanism: 'Relaxes facial tension-induced micro-creasing while accelerating extracellular matrix rebuilding.',
    clinicalBenefit: 'Noticeable smoothing of forehead furrows, crow’s feet, and smile lines with sustained bounce.',
    concentrationUsed: '3% Active Peptide Complex',
    source: 'Precision laboratory peptide synthesis.',
    idealFor: ['Fine Lines', 'Expression Wrinkles', 'Loss of Tone']
  }
];
