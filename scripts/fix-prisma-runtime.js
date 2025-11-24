// Script to fix Prisma 7 runtime issue with __internal
const fs = require('fs');
const path = require('path');

const runtimePath = path.join(__dirname, '../node_modules/.prisma/client/runtime/client.js');

if (fs.existsSync(runtimePath)) {
  let content = fs.readFileSync(runtimePath, 'utf8');
  
  // The issue is that the constructor tries to access n.__internal when n is undefined
  // We need to add a check: if n is undefined, set it to an empty object
  // Look for the constructor pattern and add a guard
  
  // Pattern: constructor(n){e=n.__internal?.configOverride?.(e)??e
  // We want: constructor(n){n=n??{};e=n.__internal?.configOverride?.(e)??e
  
  if (content.includes('constructor(n){e=n.__internal')) {
    content = content.replace(
      /constructor\(n\)\{e=n\.__internal/g,
      'constructor(n){n=n??{};e=n.__internal'
    );
    
    fs.writeFileSync(runtimePath, content, 'utf8');
    console.log('✓ Fixed Prisma runtime __internal issue');
  } else {
    console.log('ℹ Prisma runtime already fixed or pattern not found');
  }
} else {
  console.log('⚠ Prisma runtime file not found');
}

