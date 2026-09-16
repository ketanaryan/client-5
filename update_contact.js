const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Replacements
  content = content.replace(/contact@shantanuassociates\.com/g, "shantanus.associates@gmail.com");
  content = content.replace(/101, Alpha Financial Center, Indiranagar, Bangalore, Karnataka, India - 560001\./g, "No 1, 2nd Floor, 18th Cross Road, 23rd Main Road, JP Nagar 5th Phase, Bangalore - 560078");
  content = content.replace(/123 Business Park, Mumbai/g, "No 1, 2nd Floor, 18th Cross Road, 23rd Main Road, JP Nagar 5th Phase, Bangalore - 560078");
  
  // Phone numbers
  content = content.replace(/\+91\s*98765\s*43210/g, "8668555246");
  content = content.replace(/\+919876543210/g, "8668555246");
  
  content = content.replace(/\+91\s*93229\s*49820/g, "7219308077");
  content = content.replace(/\+919322949820/g, "7219308077");

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

walk('./src');
