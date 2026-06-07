const fs = require('fs');
const path = require('path');

const directory = '.';

const replacements = [
  { regex: /\+17205303933/g, replacement: '+1 603-481-6710' },
  { regex: /17205303933/g, replacement: '16034816710' },
  { regex: /Central Westminster, East Aurora, and surrounding areas/gi, replacement: 'all of New Hampshire' },
  { regex: /Westminster, CO/g, replacement: 'New Hampshire' },
  { regex: /Aurora, CO/g, replacement: 'New Hampshire' },
  { regex: /Thornton, CO/g, replacement: 'New Hampshire' },
  { regex: /Westminster/gi, replacement: 'New Hampshire' },
  { regex: /Aurora/gi, replacement: 'New Hampshire' },
  { regex: /Thornton/gi, replacement: 'New Hampshire' },
  { regex: /New Hampshirelorado/gi, replacement: 'New Hampshire' },
  { regex: /Martin Luther King Jr\.? Blvd/gi, replacement: 'Main St' },
  { regex: /80205/g, replacement: '03301' },
  { regex: /Lujan Landscaping/gi, replacement: 'Tenney Mountain Landscaping & Construction LLC' },
  { regex: /Lujan/gi, replacement: 'Tenney Mountain' },
  { regex: /New Hampshirencrete/g, replacement: 'concrete' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'dist') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.html') || file.endsWith('.json')) {
      if (file === 'package-lock.json') continue;
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      for (const { regex, replacement } of replacements) {
        content = content.replace(regex, replacement);
      }
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(directory);
console.log('Done replacing.');
