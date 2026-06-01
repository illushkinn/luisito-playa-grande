import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

async function main() {
  const inputPath = path.resolve('public/images/hero-image(1).png');
  const outputPath = path.resolve('public/images/hero-image(1).webp');
  const outputPath2x = path.resolve('public/images/hero-image(1)@2x.webp');

  try {
    await fs.access(inputPath);
  } catch {
    console.log('hero-image(1).png not found, skipping WebP conversion');
    return;
  }

  const metadata = await sharp(inputPath).metadata();
  console.log(`Converting ${metadata.width}x${metadata.height} to WebP...`);

  await sharp(inputPath)
    .webp({ quality: 82, effort: 4 })
    .toFile(outputPath);

  await sharp(inputPath)
    .resize(Math.round(metadata.width * 0.5), Math.round(metadata.height * 0.5))
    .webp({ quality: 82, effort: 4 })
    .toFile(outputPath2x);

  const orig = (await fs.stat(inputPath)).size;
  const webp = (await fs.stat(outputPath)).size;
  console.log(`PNG: ${(orig / 1024).toFixed(0)}KB → WebP: ${(webp / 1024).toFixed(0)}KB (${Math.round((1 - webp/orig) * 100)}% smaller)`);
}

main().catch((err) => {
  console.error('WebP conversion failed:', err.message);
  process.exit(0);
});
