const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');
const images = [
  'sudoku.png',
  'photo-app-comments.png',
  'ig-metrics-onboarding.png',
  'nim.png',
  'webwork.png'
];
const widths = [320, 480, 640, 960, 1280, 1920];

async function resizeImage(srcPath, dstPath, width) {
  try {
    await sharp(srcPath)
      .resize({ width, withoutEnlargement: true })
      .toFile(dstPath);
    console.log(`wrote ${dstPath}`);
  } catch (err) {
    console.error(`failed ${dstPath}:`, err.message);
  }
}

(async function main(){
  for (const img of images) {
    const src = path.join(publicDir, img);
    if (!fs.existsSync(src)) {
      console.error('missing source', src);
      continue;
    }

    for (const w of widths) {
      const dstName = img.replace(/\.png$/i, `-${w}w.png`);
      const dst = path.join(publicDir, dstName);
      await resizeImage(src, dst, w);
    }
  }
  console.log('done');
})();
