const fs = require('fs');
const path = require('path');
const readline = require('readline');

const XML_PATH = path.resolve(__dirname, '../data/archive/shastryassociates.WordPress.2026-07-30.xml');
const OUTPUT_DIR = path.resolve(__dirname, '../scratch/wp_extracted');
const ATTACHMENTS_CSV_PATH = path.resolve(OUTPUT_DIR, 'attachments.csv');

const TARGET_SLUGS = [
  'news',
  'current-news',
  'news-letter',
  'sage-inauguration',
  'sage-symposium',
  'sage-x-rvce',
  'sage-rvce-2',
  'sage-bmsit-symposium',
  'sage-vit',
  'sage-dinner-get-together',
  'sage-lunch-get-together'
];

// Academic and approved domains
const APPROVED_DOMAINS = [
  'shastryassociates.com',
  'ieee.org',
  'rvce.edu.in',
  'bmsit.ac.in',
  'vit.ac.in',
  'iisc.ac.in'
];

// Spam keywords (case-insensitive)
const SPAM_KEYWORDS = [
  'casino',
  'казино',
  'slot',
  'slots',
  'слот',
  'слоты',
  'ставки',
  '1win',
  'pin-up',
  'pinup',
  'vulkan',
  'vulcan',
  'gambling',
  'betting',
  'poker',
  'roulette',
  'baccarat',
  'viagra',
  'cialis',
  'porn'
];

function isApprovedLink(href) {
  if (!href) return false;
  const trimmed = href.trim();
  if (trimmed.startsWith('#') || trimmed.startsWith('/') || trimmed.startsWith('mailto:')) {
    return true;
  }
  try {
    const parsed = new URL(trimmed);
    const hostname = parsed.hostname.toLowerCase();
    if (APPROVED_DOMAINS.some(d => hostname === d || hostname.endsWith('.' + d))) {
      return true;
    }
    if (
      hostname.endsWith('.edu') ||
      hostname.endsWith('.edu.in') ||
      hostname.endsWith('.ac.in') ||
      hostname.endsWith('.ac.uk') ||
      hostname.endsWith('.edu.au')
    ) {
      return true;
    }
  } catch (e) {
    // If relative or anchor
    if (!trimmed.includes('://')) return true;
  }
  return false;
}

function containsSpam(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  for (const kw of SPAM_KEYWORDS) {
    if (lower.includes(kw)) {
      return kw;
    }
  }
  // Check for suspicious Cyrillic blocks (often injected casino strings)
  const cyrillicMatch = text.match(/[\u0400-\u04FF]{4,}/);
  if (cyrillicMatch) {
    return `cyrillic: ${cyrillicMatch[0]}`;
  }
  return false;
}

function cleanHtml(html) {
  if (!html) return '';

  let text = html;

  // 1. Remove script, style, and link tags
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<link[^>]*>/gi, '');

  // 2. Remove base64 image blobs
  text = text.replace(/data:image\/[^;]+;base64,[A-Za-z0-9+/=]+/gi, '[image_data_removed]');

  // 3. Strip all <a href> tags pointing outside approved domains (keep inner text)
  text = text.replace(/<a\s+([^>]*?)href=["']([^"']+)["']([^>]*)>([\s\S]*?)<\/a>/gi, (match, before, href, after, innerText) => {
    if (isApprovedLink(href)) {
      return `<a href="${href}">${innerText}</a>`;
    } else {
      // Strip tag, keep readable text
      return innerText;
    }
  });

  // Also catch <a href=...> without quotes or variations
  text = text.replace(/<a\s+[^>]*>([\s\S]*?)<\/a>/gi, (match, innerText) => {
    return innerText;
  });

  // 4. Remove inline styles, IDs, class names, and attributes
  text = text.replace(/\s+(style|class|id|data-[a-z0-9_-]+|aria-[a-z0-9_-]+|width|height|loading|decoding|crossorigin|referrerpolicy|integrity)=["'][^"']*["']/gi, '');

  // 5. Remove builder markup and shortcodes: [mfn...], [/mfn...], etc.
  text = text.replace(/\[\/?mfn[^\]]*\]/gi, '');
  text = text.replace(/\[\/?column[^\]]*\]/gi, '');
  text = text.replace(/\[\/?section[^\]]*\]/gi, '');

  // 6. Remove font-awesome icon tags
  text = text.replace(/<i[^>]*><\/i>/gi, '');
  text = text.replace(/<i[^>]*>/gi, '');

  // 7. Clean up structure tags into clean prose/markdown
  text = text.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n\n# $1\n\n');
  text = text.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n\n## $1\n\n');
  text = text.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n\n### $1\n\n');
  text = text.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n\n#### $1\n\n');
  text = text.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '\n- $1');
  text = text.replace(/<\/(p|div|section|article|header|footer)>/gi, '\n\n');
  text = text.replace(/<(br|hr)\s*\/?>/gi, '\n');

  // Strip remaining HTML tags
  text = text.replace(/<[^>]+>/g, ' ');

  // Decode common HTML entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”');

  // Clean lines and whitespace
  const lines = text
    .split('\n')
    .map(line => line.replace(/[ \t]+/g, ' ').trim())
    .filter(line => line.length > 0);

  return lines.join('\n');
}

function extractProseFromMfnObject(mfnObjectStr) {
  if (!mfnObjectStr) return [];
  const textBlocks = [];

  try {
    const obj = JSON.parse(mfnObjectStr);
    if (!Array.isArray(obj)) return textBlocks;

    for (const item of obj) {
      if (!item) continue;
      if (item.attr) {
        if (item.attr.title && item.attr.title.trim()) {
          textBlocks.push(`## ${item.attr.title.trim()}`);
        }
        if (item.attr.subtitle && item.attr.subtitle.trim()) {
          textBlocks.push(`_${item.attr.subtitle.trim()}_`);
        }
        if (item.attr.content && item.attr.content.trim()) {
          const cleaned = cleanHtml(item.attr.content);
          if (cleaned) textBlocks.push(cleaned);
        }
      }
    }
  } catch (e) {
    // If not direct JSON
  }

  return textBlocks;
}

function extractProseFromMfnItems(mfnItemsStr) {
  if (!mfnItemsStr) return [];
  const textBlocks = [];

  let decoded = '';
  try {
    decoded = Buffer.from(mfnItemsStr, 'base64').toString('utf8');
  } catch (e) {
    decoded = mfnItemsStr;
  }

  if (!decoded) return textBlocks;

  // Extract string values of sufficient length from PHP serialized data
  const matches = [...decoded.matchAll(/s:\d+:"([\s\S]*?)";/g)];
  for (const m of matches) {
    const rawVal = m[1];
    if (
      rawVal.length > 30 &&
      !rawVal.startsWith('http') &&
      !rawVal.includes('mcb-section') &&
      !rawVal.includes('mfn-page-local-style') &&
      !rawVal.startsWith('{') &&
      !rawVal.startsWith('[')
    ) {
      const cleaned = cleanHtml(rawVal);
      if (cleaned.length > 30) {
        textBlocks.push(cleaned);
      }
    }
  }

  return textBlocks;
}

async function parseWp() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Starting WordPress WXR parser on ${XML_PATH}...`);
  const fileStream = fs.createReadStream(XML_PATH, { encoding: 'utf8' });
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let inItem = false;
  let itemLines = [];
  const attachments = [];
  const pagesBySlug = {};

  for await (const line of rl) {
    if (line.includes('<item>')) {
      inItem = true;
      itemLines = [line];
    } else if (line.includes('</item>') && inItem) {
      itemLines.push(line);
      inItem = false;
      const itemContent = itemLines.join('\n');

      const postTypeMatch =
        itemContent.match(/<wp:post_type><!\[CDATA\[(.*?)\]\]><\/wp:post_type>/) ||
        itemContent.match(/<wp:post_type>(.*?)<\/wp:post_type>/);
      const postType = postTypeMatch ? postTypeMatch[1].trim() : '';

      if (postType === 'attachment') {
        const urlMatch =
          itemContent.match(/<wp:attachment_url><!\[CDATA\[(.*?)\]\]><\/wp:attachment_url>/) ||
          itemContent.match(/<wp:attachment_url>(.*?)<\/wp:attachment_url>/);
        const dateMatch =
          itemContent.match(/<wp:post_date><!\[CDATA\[(.*?)\]\]><\/wp:post_date>/) ||
          itemContent.match(/<wp:post_date>(.*?)<\/wp:post_date>/);

        const url = urlMatch ? urlMatch[1].trim() : '';
        const postDate = dateMatch ? dateMatch[1].trim() : '';
        let uploadYear = '';
        if (postDate) {
          uploadYear = postDate.split('-')[0];
        } else if (url) {
          const yearInUrl = url.match(/\/uploads\/(\d{4})\//);
          if (yearInUrl) uploadYear = yearInUrl[1];
        }

        const filename = url ? path.basename(url) : '';
        attachments.push({ url, filename, uploadYear });
      } else if (postType === 'page') {
        const slugMatch =
          itemContent.match(/<wp:post_name><!\[CDATA\[(.*?)\]\]><\/wp:post_name>/) ||
          itemContent.match(/<wp:post_name>(.*?)<\/wp:post_name>/);
        const titleMatch =
          itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
          itemContent.match(/<title>(.*?)<\/title>/);
        const statusMatch =
          itemContent.match(/<wp:status><!\[CDATA\[(.*?)\]\]><\/wp:status>/) ||
          itemContent.match(/<wp:status>(.*?)<\/wp:status>/);

        const slug = slugMatch ? slugMatch[1].trim() : '';
        const title = titleMatch ? titleMatch[1].trim() : '';
        const status = statusMatch ? statusMatch[1].trim() : '';

        // Extract mfn-page-object and mfn-page-items
        const metaMatches = [...itemContent.matchAll(/<wp:postmeta>([\s\S]*?)<\/wp:postmeta>/g)];
        let mfnObject = '';
        let mfnItems = '';
        for (const m of metaMatches) {
          const key = (m[1].match(/<wp:meta_key><!\[CDATA\[(.*?)\]\]><\/wp:meta_key>/) || m[1].match(/<wp:meta_key>(.*?)<\/wp:meta_key>/) || [])[1];
          const val = (m[1].match(/<wp:meta_value><!\[CDATA\[([\s\S]*?)\]\]><\/wp:meta_value>/) || m[1].match(/<wp:meta_value>([\s\S]*?)<\/wp:meta_value>/) || [])[1];
          if (key === 'mfn-page-object') mfnObject = val;
          if (key === 'mfn-page-items') mfnItems = val;
        }

        const contentMatch = itemContent.match(/<content:encoded><!\[CDATA\[(.*?)\]\]><\/content:encoded>/s);
        const standardContent = contentMatch ? contentMatch[1].trim() : '';

        if (slug) {
          pagesBySlug[slug] = {
            slug,
            title,
            status,
            standardContent,
            mfnObject,
            mfnItems
          };
        }
      }
    } else if (inItem) {
      itemLines.push(line);
    }
  }

  // 1. Emit Attachments CSV
  console.log(`\nFound ${attachments.length} attachments. Emitting CSV to ${ATTACHMENTS_CSV_PATH}...`);
  const csvRows = ['URL,Filename,UploadYear'];
  for (const att of attachments) {
    const escapedUrl = `"${att.url.replace(/"/g, '""')}"`;
    const escapedFilename = `"${att.filename.replace(/"/g, '""')}"`;
    csvRows.push(`${escapedUrl},${escapedFilename},${att.uploadYear}`);
  }
  fs.writeFileSync(ATTACHMENTS_CSV_PATH, csvRows.join('\n'), 'utf8');
  console.log(`CSV written successfully with ${attachments.length} records.`);

  // 2. Process Target Slugs
  console.log(`\nProcessing ${TARGET_SLUGS.length} target slugs...`);
  const summaryResults = [];

  for (const slug of TARGET_SLUGS) {
    const pageData = pagesBySlug[slug];
    if (!pageData) {
      console.log(`[!] Target slug "${slug}" NOT found in XML pages.`);
      summaryResults.push({ slug, status: 'NOT FOUND', blocks: 0, textLength: 0, spamFlagged: false });
      continue;
    }

    // Extract blocks from mfn-page-object
    let extractedBlocks = extractProseFromMfnObject(pageData.mfnObject);

    // If empty, fallback to mfn-page-items
    if (extractedBlocks.length === 0) {
      extractedBlocks = extractProseFromMfnItems(pageData.mfnItems);
    }

    // If still empty, check standard content
    if (extractedBlocks.length === 0 && pageData.standardContent) {
      const cleaned = cleanHtml(pageData.standardContent);
      if (cleaned) extractedBlocks.push(cleaned);
    }

    // Check for spam in extracted prose
    const safeBlocks = [];
    const spamIssues = [];

    for (const block of extractedBlocks) {
      const spamReason = containsSpam(block);
      if (spamReason) {
        spamIssues.push({ reason: spamReason, snippet: block.substring(0, 120) });
      } else {
        safeBlocks.push(block);
      }
    }

    const totalText = safeBlocks.join('\n\n---\n\n');
    const outFile = path.resolve(OUTPUT_DIR, `${slug}.md`);

    const header = [
      `# WP Recovered Content: ${pageData.title} (${slug})`,
      `* WordPress Status: ${pageData.status}`,
      `* Recovered Blocks: ${safeBlocks.length}`,
      `* Spam Flags: ${spamIssues.length > 0 ? 'YES' : 'NONE'}`
    ];

    if (spamIssues.length > 0) {
      header.push(`\n> [!WARNING]\n> Spam detected and excluded from output:`);
      for (const issue of spamIssues) {
        header.push(`> - Flagged for "${issue.reason}": ${issue.snippet.replace(/\n/g, ' ')}...`);
      }
    }

    header.push('\n---\n');

    const fileContent = header.join('\n') + '\n' + (totalText || '_No readable prose recovered (under construction or empty page)._') + '\n';
    fs.writeFileSync(outFile, fileContent, 'utf8');

    summaryResults.push({
      slug,
      title: pageData.title,
      blocks: safeBlocks.length,
      textLength: totalText.length,
      spamCount: spamIssues.length,
      hasContent: totalText.length > 0,
      outFile: path.relative(path.resolve(__dirname, '..'), outFile)
    });
  }

  console.log('\n=== RECOVERED PROSE SUMMARY TABLE ===');
  console.table(summaryResults);
}

parseWp().catch(console.error);
