import { spawnSync } from 'child_process';
import ffmpeg from 'ffmpeg-static';

const input = 'public/images/0602.mp4';
const output = 'public/images/0602-compressed.mp4';

console.log(`Compressing ${input} -> ${output}`);
console.log(`ffmpeg: ${ffmpeg}`);

const result = spawnSync(ffmpeg, [
  '-i', input,
  '-c:v', 'libx264',
  '-crf', '28',
  '-preset', 'slow',
  '-an',
  '-movflags', '+faststart',
  output
], { stdio: 'inherit', timeout: 300000 });

if (result.error) {
  console.error('Error:', result.error);
} else if (result.status !== 0) {
  console.error(`ffmpeg exited with code ${result.status}`);
} else {
  console.log('Done!');
}
