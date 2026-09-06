const fs = require('fs');
const path = require('path');

const replacements = {
  // Hex Colors
  '#0B1F3A': 'TEMP_332E28',
  '#123B6D': 'TEMP_D6C4A8', // Map secondary deep blue to Secondary Beige
  '#1D4ED8': 'TEMP_E8DCC8', // Map bright blue to Primary Beige
  '#3B82F6': 'TEMP_6B5845', // Map light blue to Dark Brown
  '#FFFFFF': 'TEMP_FFFFFF',
  '#F8FAFC': 'TEMP_F7F3EC',
  '#EFF6FF': 'TEMP_F1E9DD',
  '#D9E2EC': 'TEMP_E5DDD1',
  '#475569': 'TEMP_6B6258',
  '#16A34A': 'TEMP_4F7A5A',
  '#15803D': 'TEMP_3C6146',
  '#F59E0B': 'TEMP_B8863B',
  '#D97706': 'TEMP_8A642B',
  '#DC2626': 'TEMP_A85448',
  '#B91C1C': 'TEMP_853D33',

  // RGB replacements
  '11, 31, 58': 'TEMP_RGB_51_46_40',
  '11,31,58': 'TEMP_RGB_51_46_40',
  '29, 78, 216': 'TEMP_RGB_232_220_200', // #E8DCC8
  '29,78,216': 'TEMP_RGB_232_220_200',
  '220, 38, 38': 'TEMP_RGB_168_84_72',
  '220,38,38': 'TEMP_RGB_168_84_72',
  '22, 163, 74': 'TEMP_RGB_79_122_90',
  '22,163,74': 'TEMP_RGB_79_122_90',
  '217, 226, 236': 'TEMP_RGB_229_221_209',
  '217,226,236': 'TEMP_RGB_229_221_209',
  '239, 246, 255': 'TEMP_RGB_241_233_221',
  '239,246,255': 'TEMP_RGB_241_233_221',
};

const finalReplacements = {
  'TEMP_332E28': '#332E28',
  'TEMP_E8DCC8': '#E8DCC8',
  'TEMP_D6C4A8': '#D6C4A8',
  'TEMP_6B5845': '#6B5845',
  'TEMP_FFFFFF': '#FFFFFF',
  'TEMP_F7F3EC': '#F7F3EC',
  'TEMP_F1E9DD': '#F1E9DD',
  'TEMP_E5DDD1': '#E5DDD1',
  'TEMP_6B6258': '#6B6258',
  'TEMP_4F7A5A': '#4F7A5A',
  'TEMP_3C6146': '#3C6146',
  'TEMP_B8863B': '#B8863B',
  'TEMP_8A642B': '#8A642B',
  'TEMP_A85448': '#A85448',
  'TEMP_853D33': '#853D33',

  'TEMP_RGB_51_46_40': '51, 46, 40',
  'TEMP_RGB_232_220_200': '232, 220, 200',
  'TEMP_RGB_168_84_72': '168, 84, 72',
  'TEMP_RGB_79_122_90': '79, 122, 90',
  'TEMP_RGB_229_221_209': '229, 221, 209',
  'TEMP_RGB_241_233_221': '241, 233, 221',
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  // Apply placeholders
  for (const [key, value] of Object.entries(replacements)) {
    const escapedKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escapedKey, 'gi');
    newContent = newContent.replace(regex, value);
  }

  // Apply final
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
console.log('Starting beige theme replacement in', srcDir);
traverse(srcDir);
console.log('Done.');
