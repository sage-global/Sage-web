const fs = require('fs');
const path = require('path');

// 1. Scan all files in public directory
function getPublicFiles(dir, base = '') {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const relPath = path.join(base, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getPublicFiles(fullPath, relPath));
    } else {
      results.push('/' + relPath.replace(/\\/g, '/'));
    }
  }
  return results;
}

const imgExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif', '.ico'];
const allPublicFiles = getPublicFiles('public').filter(f => imgExtensions.includes(path.extname(f).toLowerCase()));

// 2. Scan entire project code for all image links
function scanSourceFiles(dir) {
  let files = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    if (['node_modules', '.next', '.git', '.husky'].includes(item)) continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      files = files.concat(scanSourceFiles(full));
    } else if (/\.(tsx|ts|js|jsx|json|md|mdx)$/.test(item)) {
      files.push(full);
    }
  }
  return files;
}

const sourceFiles = scanSourceFiles('.');
const externalUrls = new Set();
const internalReferenced = new Set();

const httpRegex = /(https?:\/\/[^\s'"\`<>]+\.(?:png|jpg|jpeg|svg|webp|gif)(?:\?[^\s'"\`<>]*)?)/gi;
const unsplashRegex = /(https:\/\/images\.unsplash\.com\/[^\s'"\`<>]+)/gi;
const cloudinaryRegex = /(https:\/\/res\.cloudinary\.com\/[^\s'"\`<>]+)/gi;
const localRegex = /['"](\/(?:events|pages|partners|testimonials|posts|grid-icons|[a-zA-Z0-9_\-\(\)]+)[^'"]*\.(?:png|jpg|jpeg|svg|webp|gif|ico))['"]/gi;

sourceFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = httpRegex.exec(content)) !== null) externalUrls.add(m[1].replace(/[,;]+$/, ''));
  while ((m = unsplashRegex.exec(content)) !== null) externalUrls.add(m[1].replace(/[,;]+$/, ''));
  while ((m = cloudinaryRegex.exec(content)) !== null) externalUrls.add(m[1].replace(/[,;]+$/, ''));
  while ((m = localRegex.exec(content)) !== null) internalReferenced.add(m[1].replace(/[,;]+$/, ''));
});

// Group categorized report
const finalReport = {
  summary: {
    totalPublicAssets: allPublicFiles.length,
    totalExternalUrls: externalUrls.size,
    totalInternalReferencedInCode: internalReferenced.size
  },
  publicLocalAssets: {
    eventGallery: allPublicFiles.filter(f => f.startsWith('/events/')),
    pageHeroes: allPublicFiles.filter(f => f.startsWith('/pages/')),
    brandAndLogo: allPublicFiles.filter(f => ['/Shastryhexagon(Orange).png', '/sage-text.png', '/sage-og-card.png', '/sage-og-card.svg', '/favicon.ico'].includes(f)),
    partners: allPublicFiles.filter(f => f.startsWith('/partners/')),
    testimonials: allPublicFiles.filter(f => f.startsWith('/testimonials/')),
    illustrationsAndIcons: allPublicFiles.filter(f => f.startsWith('/grid-icons/') || f.startsWith('/demo-illustration') || f === '/play-icon.svg' || f === '/vercel.svg'),
    blogPosts: allPublicFiles.filter(f => f.startsWith('/posts/'))
  },
  externalUrls: {
    facultyWordpressUploads: Array.from(externalUrls).filter(u => u.includes('shastryassociates.com/wp-content')),
    unsplashStockPhotos: Array.from(externalUrls).filter(u => u.includes('images.unsplash.com')),
    placeholdersAndTemplates: Array.from(externalUrls).filter(u => !u.includes('shastryassociates.com/wp-content') && !u.includes('images.unsplash.com'))
  }
};

fs.writeFileSync('scripts/master_image_list.json', JSON.stringify(finalReport, null, 2));
console.log('Master image list generated successfully!');
