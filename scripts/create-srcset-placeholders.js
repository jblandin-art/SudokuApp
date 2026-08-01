const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');
/*const images = [
  'sudoku.png',
  'photo-app-comments.png',
  'ig-metrics-onboarding.png',
  'nim.png',
  'webwork.png'
];
*/
const images = [
  'flappiestBird.png',
]
const widths = [320, 480, 640, 960, 1280, 1920];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

(async function main(){
  ensureDir(publicDir);
  images.forEach(img => {
    const src = path.join(publicDir, img);
    if (!fs.existsSync(src)) {
      console.error('Source missing:', src);
      return;
    }

    widths.forEach(w => {
      const dstName = img.replace(/\.png$/i, `-${w}w.png`);
      const dst = path.join(publicDir, dstName);
      if (!fs.existsSync(dst)) {
        fs.copyFileSync(src, dst);
        console.log('created placeholder', dstName);
      } else {
        console.log('exists', dstName);
      }
    });
  });
  console.log('Done. Replace placeholder files in /public with appropriately sized exports (keep the same filenames).');
})();
