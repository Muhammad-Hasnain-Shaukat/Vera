import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const brainDir = 'C:\\Users\\Doctor Computers\\.gemini\\antigravity-ide\\brain\\f6428ef0-0497-468d-b9e9-51b2e509f8c2';
const targetDir = path.resolve('public/images/products');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. Process and save the 3 AI-generated VERA products
const aiProducts = [
  {
    src: path.join(brainDir, 'vera_product_bottle_1788530676147.jpg'),
    dest: 'renewal-serum.jpg'
  },
  {
    src: path.join(brainDir, 'vera_barrier_creme_1788530716074.jpg'),
    dest: 'barrier-creme.jpg'
  },
  {
    src: path.join(brainDir, 'vera_cleansing_balm_1788530756323.jpg'),
    dest: 'cleansing-balm.jpg'
  }
];

for (const p of aiProducts) {
  if (fs.existsSync(p.src)) {
    await sharp(p.src)
      .resize(1200, 1200, { fit: 'cover' })
      .jpeg({ quality: 90 })
      .toFile(path.join(targetDir, p.dest));
    console.log(`Saved AI-generated product: ${p.dest}`);
  } else {
    console.error(`Missing AI product file: ${p.src}`);
  }
}
