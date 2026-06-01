import * as tf from '@tensorflow/tfjs';
import { PNG } from 'pngjs';
import fs from 'fs/promises';
import path from 'path';

async function main() {
  const inputPath = path.resolve('public/images/hero-image.png');
  const outputPath = path.resolve('public/images/hero-image-upscaled.png');

  try {
    await fs.access(inputPath);
  } catch {
    console.log('hero-image.png not found, skipping');
    return;
  }

  const inputBuffer = await fs.readFile(inputPath);
  const png = PNG.sync.read(inputBuffer);
  const { width, height } = png;
  console.log(`Original: ${width}x${height}`);

  const rgbData = new Float32Array(width * height * 3);
  for (let i = 0; i < width * height; i++) {
    rgbData[i * 3] = png.data[i * 4] / 255;
    rgbData[i * 3 + 1] = png.data[i * 4 + 1] / 255;
    rgbData[i * 3 + 2] = png.data[i * 4 + 2] / 255;
  }

  const inputTensor = tf.tensor3d(rgbData, [height, width, 3]);

  const upscaledTensor = tf.image.resizeBilinear(
    inputTensor, [height * 2, width * 2], true
  );

  const outHeight = upscaledTensor.shape[0];
  const outWidth = upscaledTensor.shape[1];
  const upscaledData = await upscaledTensor.mul(255).clipByValue(0, 255).cast('int32').data();

  const outputPng = new PNG({ width: outWidth, height: outHeight });
  for (let i = 0; i < outHeight * outWidth; i++) {
    outputPng.data[i * 4] = upscaledData[i * 3];
    outputPng.data[i * 4 + 1] = upscaledData[i * 3 + 1];
    outputPng.data[i * 4 + 2] = upscaledData[i * 3 + 2];
    outputPng.data[i * 4 + 3] = 255;
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, PNG.sync.write(outputPng));

  inputTensor.dispose();
  upscaledTensor.dispose();

  console.log(`Upscaled: ${outWidth}x${outHeight}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(0);
});
