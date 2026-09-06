const fs = require('fs');
const path = require('path');

const replacements = {
  // Hex Colors
  '#0f172a': 'TEMP_0B1F3A',
  '#1e3a8a': 'TEMP_0B1F3A',
  '#172554': 'TEMP_123B6D',
  '#3b82f6': 'TEMP_3B82F6',
  '#6366f1': 'TEMP_1D4ED8',
  '#4f46e5': 'TEMP_123B6D',
  '#f59e0b': 'TEMP_F59E0B',
  '#d97706': 'TEMP_D97706',
  '#10b981': 'TEMP_16A34A',
  '#059669': 'TEMP_15803D',
  '#ef4444': 'TEMP_DC2626',
  '#dc2626': 'TEMP_B91C1C',
  '#f8fafc': 'TEMP_F8FAFC',
  '#ffffff': 'TEMP_FFFFFF',
  '#e2e8f0': 'TEMP_D9E2EC',
  '#f1f5f9': 'TEMP_EFF6FF',
  '#475569': 'TEMP_475569',
  '#64748b': 'TEMP_475569',
  '#cbd5e1': 'TEMP_D9E2EC',

  // RGB
  '11, 31, 58': 'TEMP_RGB_11_31_58',
  '30, 58, 138': 'TEMP_RGB_11_31_58',
  '30,58,138': 'TEMP_RGB_11_31_58',
  '29, 78, 216': 'TEMP_RGB_29_78_216',
  '99, 102, 241': 'TEMP_RGB_29_78_216',
  '99,102,241': 'TEMP_RGB_29_78_216',
  '239, 68, 68': 'TEMP_RGB_220_38_38',
  '239,68,68': 'TEMP_RGB_220_38_38',
  '16, 185, 129': 'TEMP_RGB_22_163_74',
  '16,185,129': 'TEMP_RGB_22_163_74',
  '217, 226, 236': 'TEMP_RGB_217_226_236',
  '226, 232, 240': 'TEMP_RGB_217_226_236',
  '226,232,240': 'TEMP_RGB_217_226_236',
  '239, 246, 255': 'TEMP_RGB_239_246_255',
  '241, 245, 249': 'TEMP_RGB_239_246_255',
  '241,245,249': 'TEMP_RGB_239_246_255',
};

const finalReplacements = {
  'TEMP_0B1F3A': '#0B1F3A',
  'TEMP_123B6D': '#123B6D',
  'TEMP_3B82F6': '#3B82F6',
  'TEMP_1D4ED8': '#1D4ED8',
  'TEMP_F59E0B': '#F59E0B',
  'TEMP_D97706': '#D97706',
  'TEMP_16A34A': '#16A34A',
  'TEMP_15803D': '#15803D',
  'TEMP_DC2626': '#DC2626',
  'TEMP_B91C1C': '#B91C1C',
  'TEMP_F8FAFC': '#F8FAFC',
  'TEMP_FFFFFF': '#FFFFFF',
  'TEMP_D9E2EC': '#D9E2EC',
  'TEMP_EFF6FF': '#EFF6FF',
  'TEMP_475569': '#475569',
  
  'TEMP_RGB_11_31_58': '11, 31, 58',
  'TEMP_RGB_29_78_216': '29, 78, 216',
  'TEMP_RGB_220_38_38': '220, 38, 38',
  'TEMP_RGB_22_163_74': '22, 163, 74',
  'TEMP_RGB_217_226_236': '217, 226, 236',
  'TEMP_RGB_239_246_255': '239, 246, 255'
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  
  // Apply temporary placeholders
  for (const [key, value] of Object.entries(replacements)) {
    const escapedKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escapedKey, 'gi');
    newContent = newContent.replace(regex, value);
  }
  
  // Apply final values
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
console.log('Starting exact theme replacement in', srcDir);
traverse(srcDir);
console.log('Done.');
