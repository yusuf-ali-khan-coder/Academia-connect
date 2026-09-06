const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'styles', 'index.css');
let css = fs.readFileSync(cssPath, 'utf8');

const newRoot = `:root {
  --primary: #E8DCC8;
  --primary-dark: #D6C4A8;
  --primary-light: #F1E9DD;
  --secondary: #6B5845;
  --secondary-dark: #332E28;
  --accent: #B8863B;
  --accent-dark: #8A642B;
  --success: #4F7A5A;
  --success-dark: #3C6146;
  --warning: #B8863B;
  --danger: #A85448;
  --danger-dark: #853D33;
  --bg-primary: #F7F3EC;
  --bg-secondary: #FFFFFF;
  --bg-tertiary: #F1E9DD;
  --bg-card: #FFFFFF;
  --bg-card-hover: #F1E9DD;
  --text-primary: #332E28;
  --text-secondary: #6B6258;
  --text-muted: #6B6258;
  --border: #E5DDD1;
  --border-light: #E5DDD1;
  --shadow-sm: 0 1px 2px 0 rgb(107 88 69 / 0.05);
  --shadow: 0 4px 6px -1px rgb(107 88 69 / 0.08), 0 2px 4px -2px rgb(107 88 69 / 0.04);
  --shadow-lg: 0 10px 15px -3px rgb(107 88 69 / 0.08), 0 4px 6px -4px rgb(107 88 69 / 0.04);
  --shadow-xl: 0 20px 25px -5px rgb(107 88 69 / 0.08), 0 8px 10px -6px rgb(107 88 69 / 0.04);
  --radius-sm: 0.375rem;
  --radius: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;
  --transition: all 0.2s ease;
}`;

css = css.replace(/:root\s*{[\s\S]*?--transition:\s*all\s*0\.2s\s*ease;\s*}/, newRoot);

// Also fix button text color since background is now beige
css = css.replace(/\.btn-primary\s*{\s*background:\s*var\(--primary\);\s*color:\s*white;/g, '.btn-primary {\n  background: var(--primary);\n  color: var(--text-primary);');

// And badge text color
css = css.replace(/background:\s*var\(--primary\);\s*color:\s*white;\s*font-size:\s*0\.6875rem;/g, 'background: var(--primary);\n  color: var(--text-primary);\n  font-size: 0.6875rem;');

fs.writeFileSync(cssPath, css);
console.log('Fixed index.css variables and button text color.');
