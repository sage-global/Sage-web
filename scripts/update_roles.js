const fs = require('fs');
const path = require('path');

// Target the correct absolute path
const filePath = 'C:/Users/MOG/Documents/Projects/Sage-new/next-saas-starter/data/team.data.ts';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /role:\s*"[^"]+",\s*discipline:\s*"([^"]+)",\s*disciplineLabel:\s*"([^"]+)",/g;

content = content.replace(regex, (match, p1, p2) => {
  return `role: "${p2}",
    discipline: "${p1}",
    disciplineLabel: "${p2}",`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Roles updated successfully!');
