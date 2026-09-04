import { Product } from '../types';

export const initialProducts: Product[] = [
  // ==========================================
  // SKIN FORMULATIONS
  // ==========================================
  {
    id: 'vera-renewal-serum',
    name: 'Renewal Serum',
    subtitle: 'Intelligent Cellular Restorative Complex',
    slug: 'renewal-serum',
    category: 'Skin',
    price: 88,
    rating: 4.95,
    reviewsCount: 142,
    size: '30 ml / 1.0 fl. oz.',
    inStock: true,
    stockCount: 65,
    bestseller: true,
    featured: true,
    isNew: false,
    shortDescription: 'A biomimetic restorative serum formulated with multi-weight hyaluronic acid, 5% niacinamide, and bioactive peptides to restore barrier density and radiant vitality.',
    description: 'The definitive cornerstone of the VERA philosophy. Renewal Serum operates at the intersection of cellular hydration and structural barrier resilience. Featuring our proprietary Bio-Adapt™ peptide network suspended in a weightless botanical infusion, it visibly refines micro-texture, neutralizes oxidative fatigue, and delivers a lasting lit-from-within clarity.',
    images: ['/images/products/renewal-serum.jpg'],
    keyActives: [
      { name: 'Niacinamide (Vitamin B3)', percentage: '5%', purpose: 'Strengthens lipid barrier, refines pore diameter, and balances sebum' },
      { name: 'Tri-Molecular Hyaluronic Acid', percentage: '2.5%', purpose: 'Multi-depth epidermal hydration and plumping cushion' },
      { name: 'Bio-Identical Hexapeptide-8', percentage: '3%', purpose: 'Smooths the appearance of mechanical expression lines' },
      { name: 'Ectoin & Snow Mushroom', percentage: '1.5%', purpose: 'Extreme environmental osmoprotection against blue light and pollution' }
    ],
    fullIngredients: 'Aqua (Purified Water), Niacinamide, Glycerin, Sodium Hyaluronate (Tri-Molecular), Acetyl Hexapeptide-8, Ectoin, Tremella Fuciformis (Mushroom) Extract, Camellia Sinensis (White Tea) Leaf Extract, Allantoin, Panthenol, Hydroxyethylcellulose, Phenoxyethanol, Ethylhexylglycerin, Citric Acid.',
    skinTypes: ['Balanced', 'Dry', 'Sensitive', 'Combination', 'Oily', 'All'],
    concerns: ['Dullness', 'Fine Lines', 'Texture', 'Dryness'],
    ritual: {
      step: '02 — Treat',
      timing: 'Both',
      howToUse: 'Dispense 4 to 5 drops into palm. Gently press onto cleansed face, neck, and décolletage using upward sweeping motions before creams.',
      texture: 'Weightless micro-emulsion with immediate silky absorption',
      scent: 'Natural whisper of wild white tea and mountain moss (free of synthetic fragrance)'
    },
    clinicalResults: [
      '98% reported immediate boost in epidermal moisture retention',
      '94% observed visible reduction in surface redness within 14 days',
      '91% noted a firmer, more resilient skin bounce after 4 weeks'
    ],
    pairsWith: ['barrier-creme', 'gentle-cleansing-balm']
  },
  {
    id: 'vera-barrier-creme',
    name: 'Barrier Recovery Crème',
    subtitle: 'Lipid-Replenishing Moisture Veil',
    slug: 'barrier-creme',
    category: 'Skin',
    price: 94,
    rating: 4.92,
    reviewsCount: 98,
    size: '50 ml / 1.7 oz.',
    inStock: true,
    stockCount: 42,
    bestseller: true,
    featured: true,
    isNew: false,
    shortDescription: 'A rich yet velvety barrier repair moisturizer infused with physiological ceramides (1, 3, 6-II), phytosterols, and pure sugarcane squalane.',
    description: 'Formulated to reconstruct compromised lipid matrices. Barrier Recovery Crème wraps sensitized or stressed skin in a breathable cocoon of deep nourishment without heaviness. Calms visible reactivity, locks in cellular water, and seals active serums underneath for round-the-clock defense.',
    images: ['/images/products/barrier-creme.jpg'],
    keyActives: [
      { name: 'Ceramide Complex (EOP, NP, AP)', percentage: '3%', purpose: 'Mimics natural stratum corneum lipids to halt trans-epidermal water loss' },
      { name: 'Bio-Fermented Squalane', percentage: '10%', purpose: 'Biomimetic emollience that restores elasticity and softness' },
      { name: 'Centella Asiatica (Madecassoside)', percentage: '1%', purpose: 'Soothes inflammation, redness, and reactive barrier flare-ups' }
    ],
    fullIngredients: 'Water/Aqua, Squalane, Caprylic/Capric Triglyceride, Glycerin, Cetearyl Alcohol, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Madecassoside, Butyrospermum Parkii (Shea) Butter, Sodium Lauroyl Lactylate, Xanthan Gum, Tocopherol, Carbomer, Phenoxyethanol.',
    skinTypes: ['Dry', 'Sensitive', 'Balanced', 'Combination'],
    concerns: ['Dryness', 'Sensitivity', 'Fine Lines'],
    ritual: {
      step: '03 — Hydrate',
      timing: 'Both',
      howToUse: 'Warm a pea-sized amount between fingertips to activate botanicals, then press evenly into face and neck.',
      texture: 'Cashmere-soft cream that leaves a subtle dewy cushion',
      scent: 'Subtle notes of cold-pressed German chamomile and sweet almond'
    },
    clinicalResults: [
      '100% measured marked reduction in trans-epidermal water loss (TEWL) at 8 hours',
      '96% agreed dry patches and tightness were instantly alleviated',
      '93% noted prolonged barrier comfort under extreme climate stress'
    ],
    pairsWith: ['renewal-serum', 'luminous-botanical-oil']
  },
  {
    id: 'vera-gentle-cleansing-balm',
    name: 'Gentle Cleansing Balm',
    subtitle: 'Micro-Emulsifying Botanical Nectar',
    slug: 'gentle-cleansing-balm',
    category: 'Skin',
    price: 62,
    rating: 4.88,
    reviewsCount: 76,
    size: '100 ml / 3.4 fl. oz.',
    inStock: true,
    stockCount: 50,
    bestseller: false,
    featured: true,
    isNew: false,
    shortDescription: 'A transformative balm-to-milk cleanser that effortlessly melts SPF, waterproof pigment, and daily urban pollutants while preserving essential moisture.',
    description: 'An indulgent evening ritual start. Powered by Japanese camellia seed oil, evening primrose, and soothing oat kernel lipids, this velvety balm dissolves the day without stripping the acid mantle. Rinses clean with zero residue, leaving skin supple, serene, and primed.',
    images: ['/images/products/cleansing-balm.jpg'],
    keyActives: [
      { name: 'Camellia Japonica Seed Oil', percentage: '20%', purpose: 'Rich in oleic fatty acids and antioxidants to soften and melt makeup' },
      { name: 'Colloidal Oat Lipid', percentage: '2%', purpose: 'Protects the microbiome and calms post-wash tightness' },
      { name: 'Sunflower Polyglyceryl-4 Oleate', purpose: 'Plant-derived gentle emulsifier for a residue-free milky rinse' }
    ],
    fullIngredients: 'Caprylic/Capric Triglyceride, Camellia Japonica Seed Oil, Polyglyceryl-4 Oleate, Avena Sativa (Oat) Kernel Oil, Euphorbia Cerifera (Candelilla) Wax, Oenothera Biennis (Evening Primrose) Oil, Tocopherol, Pelargonium Graveolens (Geranium) Flower Extract.',
    skinTypes: ['All', 'Dry', 'Sensitive', 'Combination', 'Balanced', 'Oily'],
    concerns: ['Dryness', 'Sensitivity', 'Texture'],
    ritual: {
      step: '01 — Cleanse',
      timing: 'Evening',
      howToUse: 'Massage a coin-sized scoop onto dry skin. Inhale aromatic botanicals. Add warm water to emulsify into silky milk, then rinse thoroughly.',
      texture: 'Sorbet-soft balm melting into velvety milk upon water contact',
      scent: 'Restorative botanical blend of wild geranium, bergamot, and sweet orange peel'
    },
    clinicalResults: [
      '99% removed long-wear sunscreen and makeup without stinging eyes',
      '97% reported zero tight or stripped sensation after cleansing'
    ],
    pairsWith: ['renewal-serum', 'radiance-cleanser']
  },
  {
    id: 'vera-radiance-cleanser',
    name: 'Radiance Cleanser',
    subtitle: 'Gentle • Hydrating • Brightening Bio-Wash',
    slug: 'radiance-cleanser',
    category: 'Skin',
    price: 54,
    rating: 4.93,
    reviewsCount: 89,
    size: '150 ml / 5.1 fl. oz.',
    inStock: true,
    stockCount: 55,
    bestseller: true,
    featured: true,
    isNew: false,
    shortDescription: 'A silky non-foaming purifying gel cleanser with gentle botanical fruit enzymes, squalane, and white tea extract for luminous clarity.',
    description: 'The signature daily cleanser of the VERA regimen. Gentle, hydrating, and brightening, it respects the dermal microbiome while washing away impurities, excess sebum, and micro-pollutants without disrupting pH balance.',
    images: ['/images/products/radiance-cleanser.jpg'],
    keyActives: [
      { name: 'Papaya & Pumpkin Bio-Enzymes', percentage: '2%', purpose: 'Micro-exfoliates dead surface cells without physical friction' },
      { name: 'Sugarcane Squalane', percentage: '4%', purpose: 'Restores lipid mantle during washing' },
      { name: 'White Tea Hydrosol', percentage: '10%', purpose: 'Soothes reactive skin and delivers polyphenols' }
    ],
    fullIngredients: 'Camellia Sinensis (White Tea) Leaf Water, Aqua, Glycerin, Disodium Cocoyl Glutamate, Squalane, Lactobacillus/Papaya Fruit Ferment Extract, Allantoin, Panthenol, Xanthan Gum, Phenoxyethanol.',
    skinTypes: ['All', 'Sensitive', 'Balanced', 'Combination'],
    concerns: ['Dullness', 'Texture', 'Sensitivity'],
    ritual: {
      step: '01 — Cleanse',
      timing: 'Both',
      howToUse: 'Dispense 2 pumps onto damp palms. Massage in circular sweeps over face for 60 seconds, then rinse with lukewarm water.',
      texture: 'Lush non-stripping gel that rinses cleanly with a velvety afterfeel',
      scent: 'Subtle uplifting notes of white tea and clean botanicals'
    },
    clinicalResults: [
      '98% measured zero moisture barrier degradation post-cleansing',
      '95% agreed skin looked visibly refreshed and clearer'
    ],
    pairsWith: ['renewal-serum', 'barrier-creme']
  },
  {
    id: 'vera-cellular-spf',
    name: 'Mineral Veil SPF 50+',
    subtitle: 'Weightless Photoprotection + Ectoin Shield',
    slug: 'mineral-veil-spf',
    category: 'Skin',
    price: 58,
    rating: 4.96,
    reviewsCount: 114,
    size: '50 ml / 1.7 fl. oz.',
    inStock: true,
    stockCount: 80,
    bestseller: true,
    featured: true,
    isNew: true,
    shortDescription: 'An ultra-sheer, 100% non-nano zinc oxide mineral shield that deflects UVA/UVB rays, HEV blue light, and airborne particulates with an imperceptible skin finish.',
    description: 'Sun protection redefined for modern light exposure. Non-whitening and seamlessly blendable across all Fitzpatrick skin tones, Mineral Veil combines clinical mineral defense with soothing bisabolol and potent ectoin. Dries to a soft-focus velvet veil that wears effortlessly alone or beneath beauty routines.',
    images: ['/images/products/mineral-veil-spf.jpg'],
    keyActives: [
      { name: 'Non-Nano Zinc Oxide (USP Grade)', percentage: '18.5%', purpose: 'Broad-spectrum physical shielding without white cast or pore clogging' },
      { name: 'Ectoin Extreme Shield', percentage: '1%', purpose: 'Cellular protection against infrared, blue light, and particulate pollution' },
      { name: 'Alpha-Bisabolol', percentage: '0.5%', purpose: 'Derived from chamomile to soothe UV-induced heat and redness' }
    ],
    fullIngredients: 'Zinc Oxide 18.5%, Water/Aqua, Isododecane, Caprylic/Capric Triglyceride, Butyloctyl Salicylate, Propanediol, Glycerin, Ectoin, Bisabolol, Tocopheryl Acetate, Silica, Polyglyceryl-4 Diisostearate/Polyhydroxystearate/Sebacate, Magnesium Sulfate, Ethylhexylglycerin.',
    skinTypes: ['All', 'Sensitive', 'Combination', 'Balanced', 'Oily', 'Dry'],
    concerns: ['Uneven Tone', 'Fine Lines', 'Sensitivity'],
    ritual: {
      step: '04 — Protect',
      timing: 'Morning',
      howToUse: 'Apply generously 15 minutes before sun exposure as the final step of your morning ritual. Reapply every two hours when outdoors.',
      texture: 'Fluid cream that dries to a natural velvet finish with zero tackiness',
      scent: 'Clean and unscented'
    },
    clinicalResults: [
      '100% mineral formulation with zero chemical filters',
      '96% confirmed undetectable finish under photography and makeup',
      'Broad spectrum PA++++ UVA / UVB verified'
    ],
    pairsWith: ['renewal-serum', 'barrier-creme']
  },
  {
    id: 'vera-vitamin-c-antioxidant-elixir',
    name: '15% Vitamin C Antioxidant Elixir',
    subtitle: 'Stabilized THD Ascorbate + Ferulic Acid',
    slug: 'vitamin-c-antioxidant-elixir',
    category: 'Skin',
    price: 92,
    rating: 4.89,
    reviewsCount: 88,
    size: '30 ml / 1.0 fl. oz.',
    inStock: true,
    stockCount: 35,
    bestseller: false,
    featured: true,
    isNew: true,
    shortDescription: 'A clinical-grade, lipid-soluble Vitamin C concentrate paired with ferulic acid and Kakadu plum for unparalleled brightness and free-radical defense.',
    description: 'Unlike fragile aqueous L-ascorbic acids that oxidize rapidly, our formula utilizes 15% Tetrahexyldecyl (THD) Ascorbate—a stable, lipid-soluble derivative capable of penetrating deeper into the skin matrix with zero irritation. Targets hyperpigmentation, supports collagen architecture, and restores luminous clarity.',
    images: ['/images/products/renewal-serum.jpg'],
    keyActives: [
      { name: 'THD Ascorbate (Lipid Vitamin C)', percentage: '15%', purpose: 'Deep cellular absorption to fade discolorations and boost brightness' },
      { name: 'Ferulic Acid', percentage: '0.8%', purpose: 'Multiplies antioxidant efficacy and stabilizes the matrix against photolytic stress' },
      { name: 'Australian Kakadu Plum', percentage: '2%', purpose: 'Nature’s densest source of bio-available botanical Vitamin C' }
    ],
    fullIngredients: 'Squalane, Tetrahexyldecyl Ascorbate, Terminalia Ferdinandiana (Kakadu Plum) Seed Oil, Ferulic Acid, Tocopherol (Vitamin E), Rosa Canina (Rosehip) Fruit Oil, Helianthus Annuus Seed Oil, Boswellia Carterii (Frankincense) Oil.',
    skinTypes: ['Balanced', 'Combination', 'Dry', 'Oily'],
    concerns: ['Dullness', 'Uneven Tone', 'Fine Lines'],
    ritual: {
      step: '02 — Treat',
      timing: 'Morning',
      howToUse: 'Smooth 3 to 4 drops over clean skin each morning prior to moisturizer and SPF for maximum antioxidant shield.',
      texture: 'Dry golden oil that absorbs within seconds, leaving a satin sheen',
      scent: 'Natural uplifting warmth of frankincense and cold-pressed citrus zest'
    },
    clinicalResults: [
      '89% visible improvement in hyperpigmentation and sun spots over 8 weeks',
      '95% agreed skin tone appeared brighter and more uniform'
    ],
    pairsWith: ['mineral-veil-spf', 'barrier-creme']
  },
  {
    id: 'vera-clarifying-essence',
    name: 'Balancing Micro-Essence',
    subtitle: 'Fermented Galactomyces & Willow Bark Treatment',
    slug: 'clarifying-essence',
    category: 'Skin',
    price: 68,
    rating: 4.87,
    reviewsCount: 52,
    size: '150 ml / 5.1 fl. oz.',
    inStock: true,
    stockCount: 45,
    bestseller: false,
    featured: false,
    isNew: false,
    shortDescription: 'A weightless conditioning liquid formulated with bio-fermented galactomyces and natural willow bark to gently sweep away micro-congestion and optimize absorption.',
    description: 'The vital bridge between cleansing and treatment. Balancing Micro-Essence delivers immediate hydration while refining pore texture through gentle enzymatic exfoliation. Restores ideal epidermal pH and ensures subsequent serums penetrate with maximum bio-availability.',
    images: ['/images/products/radiance-cleanser.jpg'],
    keyActives: [
      { name: 'Galactomyces Ferment Filtrate', percentage: '85%', purpose: 'Refines uneven texture, supports luminosity, and balances sebum' },
      { name: 'White Willow Bark Extract', percentage: '2%', purpose: 'Natural bio-salicylate that clarifies clogged pores gently' },
      { name: 'Centella Leaf Hydrosol', percentage: '5%', purpose: 'Calms transient redness and bolsters resilience' }
    ],
    fullIngredients: 'Galactomyces Ferment Filtrate, Centella Asiatica Water, Salix Alba (Willow) Bark Extract, Glycerin, 1,2-Hexanediol, Betaine, Allantoin, Hydroxyacetophenone, Sodium Hyaluronate.',
    skinTypes: ['All', 'Combination', 'Oily', 'Sensitive', 'Balanced'],
    concerns: ['Texture', 'Dullness', 'Uneven Tone'],
    ritual: {
      step: '01.5 — Prep',
      timing: 'Both',
      howToUse: 'Pour a generous splash into palms. Press gently over face and neck until absorbed. No cotton pads required.',
      texture: 'Water-light essence with instant slip and quenching finish',
      scent: 'Crisp, botanical, unfragranced clean essence'
    },
    pairsWith: ['renewal-serum', 'gentle-cleansing-balm']
  },
  {
    id: 'vera-luminous-botanical-oil',
    name: 'Luminous Botanical Nectar',
    subtitle: 'Overnight Lipid Infusion with Bakuchiol',
    slug: 'luminous-botanical-oil',
    category: 'Skin',
    price: 84,
    rating: 4.94,
    reviewsCount: 64,
    size: '30 ml / 1.0 fl. oz.',
    inStock: true,
    stockCount: 30,
    bestseller: false,
    featured: false,
    isNew: false,
    shortDescription: 'A concentrated elixir of 12 cold-pressed organic botanicals synergized with 1% natural bakuchiol to nourish dry skin and smooth fine lines overnight.',
    description: 'Retinol results without irritation. VERA Luminous Botanical Nectar pairs restorative bakuchiol with cold-pressed marula, sea buckthorn, and prickly pear seed oils. Seals moisture within the epidermal barrier overnight so you awaken to plump, cushion-soft skin.',
    images: ['/images/products/renewal-serum.jpg'],
    keyActives: [
      { name: 'Phyto-Bakuchiol', percentage: '1%', purpose: 'Plant-derived retinol alternative that refines lines and stimulates firmness' },
      { name: 'Organic Prickly Pear Seed Oil', percentage: '15%', purpose: 'Unrivaled concentration of Vitamin E and essential linoleic acids' },
      { name: 'CO2 Seabuckthorn Berry Oil', percentage: '2%', purpose: 'Imparts golden radiant glow and speeds cellular repair' }
    ],
    fullIngredients: 'Opuntia Ficus-Indica (Prickly Pear) Seed Oil, Sclerocarya Birrea (Marula) Seed Oil, Bakuchiol, Hippophae Rhamnoides (Sea Buckthorn) Fruit Extract, Simmondsia Chinensis Seed Oil, Tocopherol, Lavandula Angustifolia Oil.',
    skinTypes: ['Dry', 'Sensitive', 'Balanced', 'Combination'],
    concerns: ['Dryness', 'Fine Lines', 'Dullness'],
    ritual: {
      step: '04 — Seal',
      timing: 'Evening',
      howToUse: 'Warm 3 drops in palms and press over moisturizer at bedtime as the ultimate sealing step.',
      texture: 'Golden, luxurious cushion oil that leaves no greasy residue',
      scent: 'Soothing night notes of French lavender and wild chamomile'
    },
    pairsWith: ['barrier-creme', 'renewal-serum']
  },

  // ==========================================
  // BODY CARE FORMULATIONS
  // ==========================================
  {
    id: 'vera-body-sculpt-serum',
    name: 'Firming Botanical Body Serum',
    subtitle: 'Niacinamide & Caffeine Silhouette Elixir',
    slug: 'body-sculpt-serum',
    category: 'Body',
    price: 74,
    rating: 4.86,
    reviewsCount: 41,
    size: '200 ml / 6.8 fl. oz.',
    inStock: true,
    stockCount: 38,
    bestseller: false,
    featured: true,
    isNew: true,
    shortDescription: 'High-performance facial-grade skincare formulated for the body. Firms, smooths crepey texture, and deeply conditions with caffeine and bio-lipids.',
    description: 'Elevate your body ritual to the level of advanced facial skincare. Combining botanical caffeine, 3% niacinamide, and cold-pressed squalane, this rapid-absorbing serum restores toned resilience across the neck, décolleté, arms, and legs.',
    images: ['/images/products/body-sculpt-serum.jpg'],
    keyActives: [
      { name: 'Green Coffee Bean Caffeine', percentage: '2%', purpose: 'Decongests micro-circulation and visibly tightens skin contour' },
      { name: 'Niacinamide (Vitamin B3)', percentage: '3%', purpose: 'Evens tone and smooths rough keratosis pilaris bumpiness' },
      { name: 'Pure Sugarcane Squalane', percentage: '5%', purpose: 'Restores silky lipid cushion without surface tackiness' }
    ],
    fullIngredients: 'Aqua, Caprylic/Capric Triglyceride, Squalane, Niacinamide, Caffeine, Glyceryl Stearate, Butyrospermum Parkii, Helianthus Annuus Seed Oil, Cetearyl Alcohol, Phenoxyethanol, Ethylhexylglycerin.',
    skinTypes: ['All', 'Dry', 'Balanced', 'Sensitive'],
    concerns: ['Texture', 'Dryness', 'Uneven Tone'],
    ritual: {
      step: 'Body Ritual',
      timing: 'Both',
      howToUse: 'Smooth generously over damp skin immediately following bath or shower using long upward strokes toward the heart.',
      texture: 'Silky lotion-serum hybrid with fast dry-down',
      scent: 'Subtle green cedarwood, petitgrain, and coastal citrus'
    },
    clinicalResults: [
      '94% observed smoother, more toned skin surface within 3 weeks',
      '98% noted zero sticky residue before dressing'
    ],
    pairsWith: ['body-nourish-creme', 'barrier-creme']
  },
  {
    id: 'vera-body-nourish-creme',
    name: 'Replenishing Body Crème Veil',
    subtitle: 'Cellular Lipid Butter with Bio-Fermented Squalane',
    slug: 'body-nourish-creme',
    category: 'Body',
    price: 82,
    rating: 4.91,
    reviewsCount: 56,
    size: '250 ml / 8.5 oz.',
    inStock: true,
    stockCount: 45,
    bestseller: true,
    featured: true,
    isNew: false,
    shortDescription: 'An ultra-plush restorative body butter infused with multi-ceramides, cold-pressed shea, and colloidal oat to heal winter dryness and persistent flaking.',
    description: 'A luxurious envelopment for thirsty skin. Replenishing Body Crème Veil melts upon skin contact, infusing trans-epidermal moisture deep into the stratum corneum. Leaves a luminous satin sheen with prolonged 24-hour hydration.',
    images: ['/images/products/body-nourish-creme.jpg'],
    keyActives: [
      { name: 'Ceramides (NP, AP, EOP)', percentage: '2.5%', purpose: 'Rebuilds epidermal barrier along dry limbs and elbows' },
      { name: 'Unrefined African Shea Butter', percentage: '8%', purpose: 'Intense nutritive emollience and fatty acid replenishment' },
      { name: 'Bio-Fermented Jojoba Oil', percentage: '4%', purpose: 'Softens keratinized texture and locks in cellular water' }
    ],
    fullIngredients: 'Aqua, Butyrospermum Parkii (Shea) Butter, Caprylic/Capric Triglyceride, Squalane, Glycerin, Simmondsia Chinensis Seed Oil, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Tocopherol, Carbomer, Phenoxyethanol.',
    skinTypes: ['Dry', 'Sensitive', 'Balanced', 'All'],
    concerns: ['Dryness', 'Sensitivity', 'Texture'],
    ritual: {
      step: 'Body Seal',
      timing: 'Both',
      howToUse: 'Warm a generous scoop between palms and massage into warm skin post-cleansing, focusing on dry zones.',
      texture: 'Velvety whipped crème that absorbs into a cashmere-soft veil',
      scent: 'Warm vanilla bean, amber moss, and sacred benzoin'
    },
    clinicalResults: [
      '100% measured marked surge in hydration lasting past 24 hours',
      '96% reported immediate relief from tightness and flakiness'
    ],
    pairsWith: ['body-sculpt-serum', 'body-polish-scrub']
  },
  {
    id: 'vera-body-polish-scrub',
    name: 'Exfoliating Bamboo Body Polish',
    subtitle: 'Micro-Buffing Botanical Gommage + Hibiscus Flower Acids',
    slug: 'body-polish-scrub',
    category: 'Body',
    price: 64,
    rating: 4.89,
    reviewsCount: 38,
    size: '200 ml / 6.8 oz.',
    inStock: true,
    stockCount: 32,
    bestseller: false,
    featured: false,
    isNew: true,
    shortDescription: 'A dual-action enzymatic and physical polishing balm that polishes dull surface cells with ultra-fine bamboo particles and hibiscus flower AHAs.',
    description: 'The ultimate body renewal step. Bamboo Body Polish buffs away rough buildup and keratosis pilaris, revealing velvety, luminous skin beneath. Emulsifies into a skin-softening botanical milk on contact with water.',
    images: ['/images/products/core-trio-jar.jpg'],
    keyActives: [
      { name: 'Ultra-Fine Micronized Bamboo Stem', percentage: '12%', purpose: 'Non-abrasive mechanical micro-buffing' },
      { name: 'Wild Hibiscus Flower Acids', percentage: '3%', purpose: 'Chemical enzymatic peeling that breaks down dead cell bonds' },
      { name: 'Cold-Pressed Sweet Almond Oil', percentage: '15%', purpose: 'Nourishes the skin barrier during exfoliation' }
    ],
    fullIngredients: 'Prunus Amygdalus Dulcis (Sweet Almond) Oil, Glycerin, Bambusa Arundinacea Stem Powder, Aqua, Sucrose Laurate, Hibiscus Sabdariffa Flower Extract, Tocopherol, Pelargonium Graveolens Oil, Phenoxyethanol.',
    skinTypes: ['All', 'Dry', 'Balanced'],
    concerns: ['Texture', 'Dullness', 'Uneven Tone'],
    ritual: {
      step: 'Weekly Renewal',
      timing: 'Evening',
      howToUse: 'Massage onto damp skin 2 to 3 times weekly in firm circular motions before rinsing with warm water.',
      texture: 'Dense polishing balm transforming into conditioning milk',
      scent: 'Crushed pink peppercorn, botanical geranium, and citrus peel'
    },
    clinicalResults: [
      '97% noticed immediate velvety softness after single use',
      '92% agreed rough patches were noticeably refined in 14 days'
    ],
    pairsWith: ['body-nourish-creme', 'body-sculpt-serum']
  },
  {
    id: 'vera-body-botanical-nectar',
    name: 'Nourishing Botanical Body Nectar',
    subtitle: 'Restorative Cold-Pressed Silhouette Oil',
    slug: 'body-botanical-nectar',
    category: 'Body',
    price: 78,
    rating: 4.92,
    reviewsCount: 47,
    size: '150 ml / 5.1 fl. oz.',
    inStock: true,
    stockCount: 28,
    bestseller: false,
    featured: false,
    isNew: false,
    shortDescription: 'A featherlight dry body oil composed of 9 precious cold-pressed seed oils to seal moisture, restore elasticity, and impart an all-over golden glow.',
    description: 'Pure lipid decadence. Infused with wild marula, golden jojoba, and rosehip seed oils, this dry elixir sinks immediately into skin, locking in post-bath moisture with a subtle dewy gleam and zero residue on fine fabrics.',
    images: ['/images/products/cleansing-balm.jpg'],
    keyActives: [
      { name: 'Cold-Pressed Marula Oil', percentage: '25%', purpose: 'Abundant in omegas 6 and 9 to amplify skin elasticity' },
      { name: 'Organic Rosehip Fruit Oil', percentage: '10%', purpose: 'Promotes cellular renewal and softens appearance of stretch marks' },
      { name: 'Vitamin E (Tocopherol)', percentage: '2%', purpose: 'Powerful lipid antioxidant protection' }
    ],
    fullIngredients: 'Sclerocarya Birrea Seed Oil, Simmondsia Chinensis Seed Oil, Rosa Canina Fruit Oil, Caprylic/Capric Triglyceride, Helianthus Annuus Seed Oil, Tocopherol, Citrus Aurantium Bergamia Peel Oil, Boswellia Carterii Oil.',
    skinTypes: ['Dry', 'Sensitive', 'Balanced', 'All'],
    concerns: ['Dryness', 'Dullness', 'Texture'],
    ritual: {
      step: 'Luminous Glow',
      timing: 'Both',
      howToUse: 'Mist or pump directly over damp skin. Smooth over body until absorbed for a healthy golden luster.',
      texture: 'Silky dry oil with weightless dry-down',
      scent: 'Sun-drenched bergamot, frankincense, and warm sandalwood'
    },
    clinicalResults: [
      '99% reported immediate radiant sheen without greasy residue',
      '94% experienced sustained softness throughout the day'
    ],
    pairsWith: ['body-nourish-creme']
  },

  // ==========================================
  // CURATED RITUAL SETS
  // ==========================================
  {
    id: 'vera-the-complete-ritual-set',
    name: 'The Architectural Ritual Set',
    subtitle: 'The 4-Piece Core Daily System',
    slug: 'the-architectural-ritual-set',
    category: 'Sets',
    price: 260,
    originalPrice: 302,
    rating: 4.98,
    reviewsCount: 185,
    size: 'Full Size 4-Piece Collection',
    inStock: true,
    stockCount: 22,
    bestseller: true,
    featured: true,
    isNew: false,
    shortDescription: 'The comprehensive daily regimen formulated to cleanse, treat, hydrate, and protect. Includes Cleansing Balm, Renewal Serum, Barrier Crème, and Mineral Veil SPF.',
    description: 'The pinnacle of the VERA philosophy. Curated to address every facet of modern skin resilience in four synergistic steps. Experience visibly transformed texture, amplified hydration, and unwavering clinical protection with savings on the complete ritual.',
    images: ['/images/products/ritual-set.jpg'],
    keyActives: [
      { name: 'Tri-Molecular Hyaluronic Acid', purpose: 'Multi-layer plumping' },
      { name: 'Ceramides 1, 3, 6-II', purpose: 'Complete barrier repair' },
      { name: 'Non-Nano Zinc SPF 50+', purpose: 'Broad-spectrum mineral shield' },
      { name: 'Japanese Camellia Oil', purpose: 'Gentle restorative cleansing' }
    ],
    fullIngredients: 'Please refer to individual product cartons inside the set for full clinical component disclosures.',
    skinTypes: ['All', 'Dry', 'Sensitive', 'Combination', 'Balanced'],
    concerns: ['Dryness', 'Dullness', 'Texture', 'Fine Lines', 'Sensitivity'],
    ritual: {
      step: 'Complete System',
      timing: 'Both',
      howToUse: 'Morning: Cleanse (optional) -> Renewal Serum -> Barrier Crème -> Mineral Veil SPF. Evening: Cleansing Balm -> Renewal Serum -> Barrier Crème.',
      texture: 'Complete harmonious sensory progression',
      scent: 'Pure understated botanical symphony'
    },
    pairsWith: ['vitamin-c-antioxidant-elixir', 'body-sculpt-serum']
  },
  {
    id: 'vera-the-body-renewal-duo',
    name: 'The Body Renewal Duo',
    subtitle: 'Sculpting Serum + Replenishing Crème Pair',
    slug: 'the-body-renewal-duo',
    category: 'Sets',
    price: 138,
    originalPrice: 156,
    rating: 4.95,
    reviewsCount: 62,
    size: 'Full Size 2-Piece Body Collection',
    inStock: true,
    stockCount: 20,
    bestseller: false,
    featured: true,
    isNew: true,
    shortDescription: 'A complete facial-grade regimen for the body. Features Firming Botanical Body Serum and Replenishing Body Crème Veil for all-over firming, smoothing, and 24-hour hydration.',
    description: 'The ultimate body ritual. First, smooth on the caffeine and niacinamide silhouette serum to refine crepey texture and tone. Follow with the rich ceramide butter veil to seal in deep cellular hydration.',
    images: ['/images/products/body-sculpt-serum.jpg'],
    keyActives: [
      { name: 'Botanical Caffeine & Niacinamide', purpose: 'Toning & crepey texture refinement' },
      { name: 'Multi-Ceramides & Shea Butter', purpose: 'Deep lipid restoration & 24h barrier seal' }
    ],
    fullIngredients: 'Please refer to individual product cartons inside the set for full clinical component disclosures.',
    skinTypes: ['All', 'Dry', 'Balanced', 'Sensitive'],
    concerns: ['Texture', 'Dryness', 'Uneven Tone'],
    ritual: {
      step: 'Complete Body Ritual',
      timing: 'Both',
      howToUse: 'Apply Firming Body Serum to damp skin post-bath. Follow immediately with Replenishing Body Crème Veil for complete seal.',
      texture: 'Layered serum-to-butter luxury finish',
      scent: 'Green cedarwood, petitgrain, and warm vanilla moss'
    },
    pairsWith: ['body-polish-scrub']
  }
];
