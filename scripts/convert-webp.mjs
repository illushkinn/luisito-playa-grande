import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

async function main() {
  const base = path.resolve('public/images/hero-image(1)');
  const pngPath = base + '.png';
  const jpgPath = base + '.jpg';
  const outputPath = base + '.webp';

  let inputPath;
  let inputFormat;
  try {
    await fs.access(pngPath);
    inputPath = pngPath;
    inputFormat = 'PNG';
  } catch {
    try {
      await fs.access(jpgPath);
      inputPath = jpgPath;
      inputFormat = 'JPG';
    } catch {
      console.log('hero-image(1).png/.jpg not found, skipping WebP conversion');
      return;
    }
  }

  const metadata = await sharp(inputPath).metadata();
  console.log(`Converting ${metadata.width}x${metadata.height} ${inputFormat} to WebP...`);

  await sharp(inputPath)
    .webp({ quality: 82, effort: 4 })
    .toFile(outputPath);

  const orig = (await fs.stat(inputPath)).size;
  const webp = (await fs.stat(outputPath)).size;
  console.log(`${inputFormat}: ${(orig / 1024).toFixed(0)}KB → WebP: ${(webp / 1024).toFixed(0)}KB (${Math.round((1 - webp/orig) * 100)}% smaller)`);
}

main().catch((err) => {
  console.error('WebP conversion failed:', err.message);
  process.exit(0);
});
