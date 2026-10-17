const fs = require('fs');
const path = require('path');

function scanDir(dir) {
  let files = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    if (['node_modules', '.next', '.git', '.husky'].includes(item)) continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      files = files.concat(scanDir(full));
    } else if (/\.(tsx|ts|js|jsx|json|md|mdx)$/.test(item)) {
      files.push(full);
    }
  }
  return files;
}

const allFiles = scanDir('.');
const remoteUrls = new Set();
const localUrls = new Set();

const httpPattern = /(https?:\/\/[^\s'"\`<>]+\.(?:png|jpg|jpeg|svg|webp|gif)(?:\?[^\s'"\`<>]*)?)/gi;
const unsplashPattern = /(https:\/\/images\.unsplash\.com\/[^\s'"\`<>]+)/gi;
const cloudinaryPattern = /(https:\/\/res\.cloudinary\.com\/[^\s'"\`<>]+)/gi;
const localPattern = /['"](\/(?:events|pages|partners|testimonials|posts|grid-icons|[a-zA-Z0-9_\-\(\)]+)[^'"]*\.(?:png|jpg|jpeg|svg|webp|gif|ico))['"]/gi;

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = httpPattern.exec(content)) !== null) {
    remoteUrls.add(m[1].replace(/[,;]+$/, ''));
  }
  while ((m = unsplashPattern.exec(content)) !== null) {
    remoteUrls.add(m[1].replace(/[,;]+$/, ''));
  }
  while ((m = cloudinaryPattern.exec(content)) !== null) {
    remoteUrls.add(m[1].replace(/[,;]+$/, ''));
  }
  while ((m = localPattern.exec(content)) !== null) {
    localUrls.add(m[1].replace(/[,;]+$/, ''));
  }
});

// Also read sage-data.ts / site.data.ts directly for faculty & courses image paths
const result = {
  remote: Array.from(remoteUrls).sort(),
  localReferenced: Array.from(localUrls).sort(),
};

fs.writeFileSync('scripts/extracted_images.json', JSON.stringify(result, null, 2));
console.log('Remote count:', result.remote.length);
console.log('Local referenced count:', result.localReferenced.length);
