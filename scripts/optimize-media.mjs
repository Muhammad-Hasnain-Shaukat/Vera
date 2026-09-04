import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import ffmpegPkg from '@ffmpeg-installer/ffmpeg';

const ffmpegPath = ffmpegPkg.path;

console.log('=== VERA Media Optimization Engine ===');
console.log('Using ffmpeg:', ffmpegPath);

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 1. Optimize Videos
async function optimizeVideos() {
  const videoDir = path.resolve('public/videos');
  if (!fs.existsSync(videoDir)) return;

  const files = fs.readdirSync(videoDir).filter(f => f.endsWith('.mp4'));
  console.log('\n--- Optimizing Videos ---');

  for (const file of files) {
    const inputPath = path.join(videoDir, file);
    const tempPath = path.join(videoDir, `temp_${file}`);

    const origSize = fs.statSync(inputPath).size;

    console.log(`Processing video: ${file} (Original: ${formatBytes(origSize)})`);

    // -crf 23 provides visually lossless compression for web
    // -preset medium / slow gives great compression ratio
    // -movflags +faststart places moov atom at beginning for instant web streaming
    // -an strips unnecessary silent audio stream
    const cmd = `"${ffmpegPath}" -y -i "${inputPath}" -c:v libx264 -crf 23 -preset medium -pix_fmt yuv420p -movflags +faststart -an "${tempPath}"`;

    try {
      execSync(cmd, { stdio: 'ignore' });
      const newSize = fs.statSync(tempPath).size;

      if (newSize < origSize) {
        fs.unlinkSync(inputPath);
        fs.renameSync(tempPath, inputPath);
        const saved = ((1 - newSize / origSize) * 100).toFixed(1);
        console.log(`  ✓ ${file}: ${formatBytes(origSize)} -> ${formatBytes(newSize)} (Saved ${saved}%)`);
      } else {
        fs.unlinkSync(tempPath);
        console.log(`  - Kept original (already optimal): ${formatBytes(origSize)}`);
      }
    } catch (err) {
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      console.error(`  ✗ Error optimizing ${file}:`, err.message);
    }
  }
}

// 2. Optimize Images
async function optimizeImages() {
  console.log('\n--- Optimizing Images ---');
  const imageDirs = [
    path.resolve('public/images'),
    path.resolve('public/images/products'),
    path.resolve('public/images/about'),
  ];

  let totalOrig = 0;
  let totalNew = 0;

  for (const dir of imageDirs) {
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter(f => f.match(/\.(jpg|jpeg|png)$/i));

    for (const file of files) {
      const filePath = path.join(dir, file);
      const origSize = fs.statSync(filePath).size;
      totalOrig += origSize;

      const tempPath = path.join(dir, `temp_${file}`);

      try {
        const metadata = await sharp(filePath).metadata();

        let pipeline = sharp(filePath);

        // Limit dimensions to maximum useful web size (e.g. 1600px width/height)
        if (metadata.width > 1600 || metadata.height > 1600) {
          pipeline = pipeline.resize({
            width: metadata.width > metadata.height ? 1600 : undefined,
            height: metadata.height >= metadata.width ? 1600 : undefined,
            withoutEnlargement: true,
          });
        }

        if (file.match(/\.png$/i)) {
          await pipeline
            .png({ quality: 90, compressionLevel: 9 })
            .toFile(tempPath);
        } else {
          await pipeline
            .jpeg({ quality: 84, mozjpeg: true, progressive: true })
            .toFile(tempPath);
        }

        const newSize = fs.statSync(tempPath).size;

        if (newSize < origSize) {
          fs.unlinkSync(filePath);
          fs.renameSync(tempPath, filePath);
          totalNew += newSize;
          const saved = ((1 - newSize / origSize) * 100).toFixed(1);
          console.log(`  ✓ ${file}: ${formatBytes(origSize)} -> ${formatBytes(newSize)} (Saved ${saved}%)`);
        } else {
          fs.unlinkSync(tempPath);
          totalNew += origSize;
          console.log(`  - ${file}: Kept original (${formatBytes(origSize)})`);
        }
      } catch (err) {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        totalNew += origSize;
        console.error(`  ✗ Error optimizing ${file}:`, err.message);
      }
    }
  }

  const totalSaved = ((1 - totalNew / totalOrig) * 100).toFixed(1);
  console.log(`\nImage Total: ${formatBytes(totalOrig)} -> ${formatBytes(totalNew)} (Total saved ${totalSaved}%)`);
}

async function main() {
  await optimizeVideos();
  await optimizeImages();
  console.log('\nAll media optimization complete!');
}

main().catch(console.error);
