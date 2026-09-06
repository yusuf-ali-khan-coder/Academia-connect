const fs = require('fs');
const path = require('path');

const replacements = {
  // Brand swaps
  '#6366f1': '#1e3a8a', // old primary (indigo) -> deep navy
  '#4f46e5': '#172554', // old primary dark -> deep navy dark
  '#818cf8': '#3b82f6', // old primary light -> subtle blue
  '#06b6d4': '#6366f1', // old secondary (cyan) -> indigo/violet main accent
  '#0891b2': '#4f46e5', // old secondary dark -> indigo dark

  // Backgrounds & Text (Temporary Placeholders to avoid double-replacement)
  '#0f172a': 'TEMP_BG_PRIMARY', 
  '#1e293b': 'TEMP_BG_SECONDARY',
  '#334155': 'TEMP_BG_TERTIARY',
  '#475569': 'TEMP_BORDER_LIGHT',
  '#f8fafc': 'TEMP_TEXT_PRIMARY',
  '#94a3b8': 'TEMP_TEXT_SECONDARY',

  // RGB replacements for RGBA
  '99, 102, 241': '30, 58, 138',
  '99,102,241': '30,58,138',
  '6, 182, 212': '99, 102, 241',
  '6,182,212': '99,102,241',
  
  // Opacity overlays for old backgrounds
  '15, 23, 42': '255, 255, 255',
  '15,23,42': '255,255,255',
  '30, 41, 59': '241, 245, 249',
  '30,41,59': '241,245,249',
  '51, 65, 85': '226, 232, 240',
  '51,65,85': '226,232,240'
};

const finalReplacements = {
  'TEMP_BG_PRIMARY': '#f8fafc',
  'TEMP_BG_SECONDARY': '#ffffff',
  'TEMP_BG_TERTIARY': '#e2e8f0',
  'TEMP_BORDER_LIGHT': '#cbd5e1',
  'TEMP_TEXT_PRIMARY': '#0f172a',
  'TEMP_TEXT_SECONDARY': '#475569'
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  
  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(key, 'gi');
    newContent = newContent.replace(regex, value);
  }
  
  for (const [key, value] of Object.entries(finalReplacements)) {
    const regex = new RegExp(key, 'g');
    newContent = newContent.replace(regex, value);
  }
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Updated:', filePath);
  }
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (fullPath.endsWith('.css') || fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      processFile(fullPath);
    }
  }
}

const srcDir = path.join(__dirname, 'src');
console.log('Starting color replacement in', srcDir);
traverse(srcDir);
console.log('Done.');
