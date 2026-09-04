import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const targetDir = path.resolve('public/images/products');
const heroBgPath = path.resolve('public/images/hero-bg.jpg');

async function downloadBuffer(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  return Buffer.from(await res.arrayBuffer());
}

async function run() {
  console.log('Generating pristine luxury VERA product assets...');

  // 1. Crop authentic VERA Radiance Cleanser bottle directly from user photo
  if (fs.existsSync(heroBgPath)) {
    const meta = await sharp(heroBgPath).metadata();
    console.log(`hero-bg dimensions: ${meta.width}x${meta.height}`);
    
    // The VERA bottle is on the right side of hero-bg.jpg
    // Let's create an authentic VERA Radiance Cleanser asset from the photo:
    await sharp(heroBgPath)
      .extract({ left: Math.round(meta.width * 0.65), top: 0, width: Math.round(meta.width * 0.35), height: meta.height })
      .resize(1200, 1200, { fit: 'cover' })
      .jpeg({ quality: 92 })
      .toFile(path.join(targetDir, 'radiance-cleanser.jpg'));
    console.log('Created radiance-cleanser.jpg from authentic VERA photo');

    // Also extract the luxury gold cream jar
    await sharp(heroBgPath)
      .extract({ left: Math.round(meta.width * 0.45), top: 0, width: Math.round(meta.width * 0.35), height: meta.height })
      .resize(1200, 1200, { fit: 'cover' })
      .jpeg({ quality: 92 })
      .toFile(path.join(targetDir, 'core-trio-jar.jpg'));
    console.log('Created core-trio-jar.jpg from authentic photo');
  }

  // Curated clean unbranded luxury cosmetic images (NO text, NO pre-existing labels, NO third-party brands):
  const cleanProducts = [
    {
      // Minimalist unbranded amber dropper bottle on marble/limestone
      url: 'https://images.unsplash.com/photo-1608248597359-54bc75390978?auto=format&fit=crop&w=1200&q=85',
      name: 'vitamin-c-elixir.jpg',
      label: '15% VITAMIN C ELIXIR'
    },
    {
      // Minimalist unbranded white ceramic pump bottle on travertine
      url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=85',
      name: 'mineral-veil-spf.jpg',
      label: 'MINERAL VEIL SPF 50+'
    },
    {
      // Minimalist luxury body oil bottle on linen & stone
      url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85',
      name: 'body-sculpt-serum.jpg',
      label: 'BOTANICAL BODY SERUM'
    },
    {
      // Minimalist unbranded luxury body crème container
      url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85',
      name: 'body-nourish-creme.jpg',
      label: 'REPLENISHING BODY VEIL'
    },
    {
      // Minimalist unbranded clear essence bottle
      url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85',
      name: 'clarifying-essence.jpg',
      label: 'BALANCING MICRO-ESSENCE'
    },
    {
      // Minimalist luxury botanical face oil
      url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=1200&q=85',
      name: 'luminous-botanical-oil.jpg',
      label: 'LUMINOUS BOTANICAL NECTAR'
    }
  ];

  for (const item of cleanProducts) {
    try {
      console.log(`Processing ${item.name}...`);
      const buf = await downloadBuffer(item.url);
      
      // We will place a clean, elegant minimal embossed badge on the image that looks 100% natural,
      // NOT a giant text plastered across pre-existing labels.
      const overlay = Buffer.from(`
        <svg width="1200" height="1200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="rgba(0,0,0,0.25)"/>
            </filter>
          </defs>
          <!-- Subtle Luxury Editorial Brand Plaque at bottom of image -->
          <rect x="250" y="1040" width="700" height="96" rx="4" fill="rgba(250, 247, 242, 0.92)" stroke="#E8E2D8" stroke-width="1.5" filter="url(#softGlow)"/>
          <text 
            x="600" 
            y="1078" 
            text-anchor="middle" 
            font-family="Playfair Display, Georgia, serif" 
            font-size="24" 
            font-weight="400" 
            letter-spacing="0.32em" 
            fill="#1C1917"
          >
            VERA
          </text>
          <text 
            x="600" 
            y="1112" 
            text-anchor="middle" 
            font-family="Montserrat, Arial, sans-serif" 
            font-size="11" 
            font-weight="600" 
            letter-spacing="0.22em" 
            fill="#78716C"
          >
            ${item.label}
          </text>
        </svg>
      `);

      await sharp(buf)
        .resize(1200, 1200, { fit: 'cover' })
        .composite([{ input: overlay, top: 0, left: 0 }])
        .jpeg({ quality: 92 })
        .toFile(path.join(targetDir, item.name));
      console.log(`Successfully generated clean branded product: ${item.name}`);
    } catch (e) {
      console.error(`Error on ${item.name}:`, e.message);
    }
  }
}

run();
