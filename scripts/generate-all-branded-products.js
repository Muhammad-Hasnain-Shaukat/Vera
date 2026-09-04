import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const targetDir = path.resolve('public/images/products');

async function downloadBuffer(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText} (${res.status})`);
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// Function to composite crisp VERA branding label onto a product bottle/surface
async function createBrandedProduct({
  sourceUrl,
  outputFilename,
  labelConfig,
  crop = null
}) {
  console.log(`Processing ${outputFilename}...`);
  let imageBuffer = await downloadBuffer(sourceUrl);

  let image = sharp(imageBuffer);
  const metadata = await image.metadata();

  // If crop is specified
  if (crop) {
    image = image.extract(crop);
  }

  // Resize to 1200x1200 for clean high definition square aspect ratio
  const resizedBuffer = await image
    .resize(1200, 1200, { fit: 'cover', position: 'center' })
    .toBuffer();

  // Create SVG label overlay with luxury VERA typography
  const {
    top = 500,
    left = 600,
    brandSize = 48,
    titleSize = 16,
    subSize = 12,
    brandText = 'VERA',
    titleText = 'MINERAL VEIL SPF 50+',
    subText = 'BROAD SPECTRUM • NON-NANO ZINC',
    color = '#1C1917',
    opacity = 0.88,
    bgPill = false
  } = labelConfig;

  const svgOverlay = Buffer.from(`
    <svg width="1200" height="1200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="rgba(0,0,0,0.15)"/>
        </filter>
      </defs>
      <g opacity="${opacity}">
        ${bgPill ? `
          <rect x="${left - 180}" y="${top - 35}" width="360" height="150" rx="6" fill="rgba(250, 247, 242, 0.75)" filter="url(#softShadow)"/>
        ` : ''}
        <!-- VERA Brandmark -->
        <text 
          x="${left}" 
          y="${top}" 
          text-anchor="middle" 
          font-family="Playfair Display, Didot, Bodoni MT, Georgia, serif" 
          font-size="${brandSize}" 
          font-weight="400" 
          letter-spacing="0.32em" 
          fill="${color}"
          filter="url(#softShadow)"
        >
          ${brandText}
        </text>

        <!-- Product Name -->
        <text 
          x="${left}" 
          y="${top + 38}" 
          text-anchor="middle" 
          font-family="Montserrat, Helvetica Neue, Arial, sans-serif" 
          font-size="${titleSize}" 
          font-weight="600" 
          letter-spacing="0.22em" 
          fill="${color}"
        >
          ${titleText}
        </text>

        <!-- Subtitle Details -->
        <text 
          x="${left}" 
          y="${top + 64}" 
          text-anchor="middle" 
          font-family="Montserrat, Helvetica Neue, Arial, sans-serif" 
          font-size="${subSize}" 
          font-weight="500" 
          letter-spacing="0.18em" 
          fill="${color}"
          opacity="0.8"
        >
          ${subText}
        </text>
      </g>
    </svg>
  `);

  await sharp(resizedBuffer)
    .composite([{ input: svgOverlay, top: 0, left: 0 }])
    .jpeg({ quality: 92 })
    .toFile(path.join(targetDir, outputFilename));

  console.log(`Successfully generated: ${outputFilename}`);
}

async function run() {
  try {
  const products = [
    {
      sourceUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=85',
      outputFilename: 'mineral-veil-spf.jpg',
      labelConfig: {
        top: 590,
        left: 600,
        brandSize: 44,
        titleSize: 15,
        subSize: 11,
        brandText: 'VERA',
        titleText: 'MINERAL VEIL SPF 50+',
        subText: 'BROAD SPECTRUM • NON-NANO ZINC',
        color: '#1C1917',
        opacity: 0.92
      }
    },
    {
      sourceUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85',
      outputFilename: 'vitamin-c-elixir.jpg',
      labelConfig: {
        top: 570,
        left: 600,
        brandSize: 44,
        titleSize: 15,
        subSize: 11,
        brandText: 'VERA',
        titleText: '15% VITAMIN C ELIXIR',
        subText: 'THD ASCORBATE • FERULIC ACID',
        color: '#1C1917',
        opacity: 0.92
      }
    },
    {
      sourceUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85',
      outputFilename: 'clarifying-essence.jpg',
      labelConfig: {
        top: 610,
        left: 590,
        brandSize: 44,
        titleSize: 14,
        subSize: 11,
        brandText: 'VERA',
        titleText: 'BALANCING MICRO-ESSENCE',
        subText: 'FERMENTED GALACTOMYCES • 150 ML',
        color: '#1C1917',
        opacity: 0.92
      }
    },
    {
      sourceUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85',
      outputFilename: 'luminous-botanical-oil.jpg',
      labelConfig: {
        top: 580,
        left: 600,
        brandSize: 44,
        titleSize: 14,
        subSize: 11,
        brandText: 'VERA',
        titleText: 'LUMINOUS BOTANICAL NECTAR',
        subText: 'COLD EXTRACTED • PHYTO-BAKUCHIOL',
        color: '#1C1917',
        opacity: 0.92
      }
    },
    {
      sourceUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=1200&q=85',
      outputFilename: 'body-sculpt-serum.jpg',
      labelConfig: {
        top: 600,
        left: 600,
        brandSize: 44,
        titleSize: 15,
        subSize: 11,
        brandText: 'VERA',
        titleText: 'FIRMING BOTANICAL BODY SERUM',
        subText: 'NIACINAMIDE • CAFFEINE • 200 ML',
        color: '#1C1917',
        opacity: 0.92
      }
    }
  ];

  for (const prod of products) {
    try {
      await createBrandedProduct(prod);
    } catch (err) {
      console.error(`Failed ${prod.outputFilename}:`, err.message);
    }
  }

  // Generate ritual-set.jpg
  const heroBgPath = path.resolve('public/images/hero-bg.jpg');
  if (fs.existsSync(heroBgPath)) {
    console.log('Generating ritual-set.jpg from hero multi-product photo...');
    const heroSetOverlay = Buffer.from(`
      <svg width="1200" height="1200" xmlns="http://www.w3.org/2000/svg">
        <text 
          x="600" 
          y="280" 
          text-anchor="middle" 
          font-family="Playfair Display, Didot, Georgia, serif" 
          font-size="46" 
          font-weight="400" 
          letter-spacing="0.3em" 
          fill="#1C1917"
          opacity="0.9"
        >
          VERA
        </text>
        <text 
          x="600" 
          y="325" 
          text-anchor="middle" 
          font-family="Montserrat, Helvetica Neue, sans-serif" 
          font-size="16" 
          font-weight="600" 
          letter-spacing="0.25em" 
          fill="#1C1917"
          opacity="0.85"
        >
          THE ARCHITECTURAL RITUAL SET
        </text>
      </svg>
    `);

    await sharp(heroBgPath)
      .resize(1200, 1200, { fit: 'cover', position: 'right' })
      .composite([{ input: heroSetOverlay, top: 0, left: 0 }])
      .jpeg({ quality: 92 })
      .toFile(path.join(targetDir, 'ritual-set.jpg'));
    console.log('Successfully generated: ritual-set.jpg');
  }
  } catch (err) {
    console.error('Error during generation:', err);
  }
}

run();
