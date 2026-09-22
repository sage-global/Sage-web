const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'views/TeamPage/FilterableTeamGrid.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const colorVars = [
  'background', 'secondBackground', 'text', 'textSecondary', 
  'primary', 'brandBlue', 'skyBlue', 'secondary', 'tertiary', 
  'cardBackground', 'inputBackground', 'navbarBackground', 
  'modalBackground', 'errorColor', 'lineColor', 'mutedColor'
];

const regex = new RegExp(`(?<!rgb\\()var\\(--(${colorVars.join('|')})\\)`, 'g');

content = content.replace(regex, 'rgb(var(--$1))');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed colors in FilterableTeamGrid');
