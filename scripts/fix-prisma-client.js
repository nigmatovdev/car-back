// Script to fix Prisma Client CommonJS compatibility
// Patches the compiled client.js to remove ESM-only syntax

const fs = require('fs');
const path = require('path');

const clientJsPath = path.join(__dirname, '../dist/generated/prisma/client.js');

if (fs.existsSync(clientJsPath)) {
  let content = fs.readFileSync(clientJsPath, 'utf8');
  
  // Replace import.meta.url with CommonJS-compatible __dirname
  // The problematic line uses import.meta.url which is ESM-only
  const originalContent = content;
  
  if (content.includes('import.meta.url')) {
    // Replace the specific line pattern - match the exact format
    // Pattern: globalThis['__dirname'] = path.dirname((0, node_url_1.fileURLToPath)(import.meta.url));
    content = content.replace(
      /globalThis\['__dirname'\]\s*=\s*path\.dirname\(\(0,\s*node_url_1\.fileURLToPath\)\(import\.meta\.url\)\);/g,
      "globalThis['__dirname'] = __dirname;"
    );
    
    // If still not replaced, try a more permissive pattern
    if (content.includes('import.meta.url')) {
      // Match any pattern that includes import.meta.url in the path.dirname call
      content = content.replace(
        /globalThis\[['"]__dirname['"]\]\s*=\s*path\.dirname\([^)]*import\.meta\.url[^)]*\);/g,
        "globalThis['__dirname'] = __dirname;"
      );
    }
    
    // Last resort: replace the entire line if it contains import.meta.url
    if (content.includes('import.meta.url')) {
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('import.meta.url') && lines[i].includes('__dirname')) {
          lines[i] = "globalThis['__dirname'] = __dirname;";
        }
      }
      content = lines.join('\n');
    }
    
    // Remove unused node_url_1 import
    if (!content.includes('node_url_1.')) {
      content = content.replace(/const node_url_1 = require\(['"]node:url['"]\);\s*\n/g, '');
    }
    
    if (content !== originalContent) {
      fs.writeFileSync(clientJsPath, content, 'utf8');
      console.log('✓ Fixed Prisma Client CommonJS compatibility');
    } else {
      console.log('⚠ Could not fix Prisma Client (pattern not matched)');
    }
  } else {
    console.log('ℹ Prisma Client already compatible (no import.meta.url found)');
  }
}

