const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync('sage-data.ts', 'utf8');
const lines = fileContent.split('\n');

function getSection(startStr, endStr) {
  const startIndex = lines.findIndex(l => l.startsWith(startStr));
  const endIndex = endStr ? lines.findIndex((l, idx) => idx > startIndex && l.startsWith(endStr)) : lines.length;
  if (startIndex === -1) throw new Error(`Could not find ${startStr}`);
  return lines.slice(startIndex, endIndex === -1 ? lines.length : endIndex).join('\n');
}

// Ensure data directory exists
if (!fs.existsSync('data')) {
  fs.mkdirSync('data');
}

// 1. site.data.ts (Lines 1 to before Mission)
const siteDataContent = lines.slice(0, lines.findIndex(l => l.startsWith('// ─── Mission'))).join('\n');
fs.writeFileSync('data/site.data.ts', siteDataContent + '\n');

// 2. about.data.ts (Mission to Services)
const aboutData1 = getSection('// ─── Mission', '// ─── Core Competencies');
const aboutData2 = getSection('// ─── Core Competencies', '// ─── Services');
const aboutData3 = getSection('// ─── Values', '// ─── Testimonials');
const aboutData4 = getSection('// ─── Heritage Timeline', null);
fs.writeFileSync('data/about.data.ts', [aboutData1, aboutData2, aboutData3, aboutData4].join('\n') + '\n');

// 3. home.data.ts (Services, Testimonials, Homepage Copy, Why SAGE)
const homeData1 = getSection('// ─── Services', '// ─── Course Categories');
const homeData2 = getSection('// ─── Testimonials', '// ─── Footer');
fs.writeFileSync('data/home.data.ts', [homeData1, homeData2].join('\n') + '\n');

// 4. courses.data.ts (Course Categories to Team)
const coursesData = getSection('// ─── Course Categories', '// ─── Team ');
fs.writeFileSync('data/courses.data.ts', coursesData + '\n');

// 5. team.data.ts (Team to Values, and Disciplines to Heritage)
const teamData1 = getSection('// ─── Team ', '// ─── Values');
const teamData2 = getSection('// ─── Disciplines', '// ─── Heritage Timeline');
fs.writeFileSync('data/team.data.ts', [teamData1, teamData2].join('\n') + '\n');

// 6. footer.data.ts
const footerData = getSection('// ─── Footer', '// ─── Disciplines');
fs.writeFileSync('data/footer.data.ts', footerData + '\n');

// Create the barrel file
const barrelContent = `/**
 * SAGE — Site Data Master File (Barrel)
 * Re-exports all modularized data files.
 */

export * from './data/site.data';
export * from './data/home.data';
export * from './data/courses.data';
export * from './data/team.data';
export * from './data/about.data';
export * from './data/footer.data';
`;
fs.writeFileSync('sage-data.ts', barrelContent);

console.log('Split completed successfully.');
