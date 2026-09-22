const http = require('http');

const BASE_URL = 'http://localhost:3001';

async function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    const req = http.get(BASE_URL + urlPath, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });
    req.on('error', (err) => reject(err));
  });
}

function extractLinks(html) {
  const links = new Set();
  const regex = /href=["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    links.add(match[1]);
  }
  return Array.from(links);
}

function normalizeInternalPath(href) {
  if (!href) return null;
  if (href.startsWith('http://localhost:3001')) {
    href = href.replace('http://localhost:3001', '');
  }
  if (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#')
  ) {
    return null; // External or in-page anchor
  }
  // Strip anchor for route testing
  const routeOnly = href.split('#')[0] || '/';
  return routeOnly;
}

async function runCrawler() {
  console.log('Starting full internal link crawl on ' + BASE_URL + '...');

  const queue = ['/'];
  const visitedPages = new Set();
  const checkedLinks = new Map(); // path -> statusCode
  const brokenLinks = []; // { sourcePage, targetLink, statusCode }

  while (queue.length > 0) {
    const currentPath = queue.shift();
    if (visitedPages.has(currentPath)) continue;
    visitedPages.add(currentPath);

    try {
      const response = await fetchUrl(currentPath);
      checkedLinks.set(currentPath, response.statusCode);

      if (response.statusCode === 404) {
        console.error(`404 on page: ${currentPath}`);
        continue;
      }

      const foundHrefs = extractLinks(response.body);

      for (const rawHref of foundHrefs) {
        const routePath = normalizeInternalPath(rawHref);
        if (!routePath) continue;

        if (!checkedLinks.has(routePath)) {
          try {
            const checkRes = await fetchUrl(routePath);
            checkedLinks.set(routePath, checkRes.statusCode);

            if (checkRes.statusCode === 404) {
              brokenLinks.push({
                sourcePage: currentPath,
                rawHref,
                routePath,
                statusCode: 404,
              });
              console.error(`BROKEN LINK (404) on ${currentPath} -> ${rawHref}`);
            } else {
              console.log(`[${checkRes.statusCode}] ${rawHref}`);
            }

            // If it's a 200 HTML page and not yet queued/visited, enqueue it
            const contentType = checkRes.headers['content-type'] || '';
            if (
              checkRes.statusCode === 200 &&
              contentType.includes('text/html') &&
              !visitedPages.has(routePath) &&
              !queue.includes(routePath)
            ) {
              queue.push(routePath);
            }
          } catch (err) {
            console.error(`Error checking ${routePath}:`, err.message);
          }
        } else if (checkedLinks.get(routePath) === 404) {
          brokenLinks.push({
            sourcePage: currentPath,
            rawHref,
            routePath,
            statusCode: 404,
          });
        }
      }
    } catch (err) {
      console.error(`Failed to crawl ${currentPath}:`, err.message);
    }
  }

  console.log('\n--- CRAWL SUMMARY ---');
  console.log(`Total unique internal pages crawled: ${visitedPages.size}`);
  console.log(`Total unique internal link routes verified: ${checkedLinks.size}`);
  console.log(`Total broken links (404): ${brokenLinks.length}`);

  if (brokenLinks.length > 0) {
    console.log('\nBroken Links Details:');
    brokenLinks.forEach((item) => {
      console.log(`  Source: ${item.sourcePage} | Link: ${item.rawHref} (status ${item.statusCode})`);
    });
    process.exit(1);
  } else {
    console.log('\nALL internal links verified successfully with ZERO 404s!');
    process.exit(0);
  }
}

runCrawler();
