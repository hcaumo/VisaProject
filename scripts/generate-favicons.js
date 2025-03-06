// This is a simple script to help generate PNG versions of the favicon
// You would need to install sharp: npm install sharp
// Then run: node scripts/generate-favicons.js

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svgPath = path.join(__dirname, '../public/assets/images/drexfy-favicon.svg');
const outputDir = path.join(__dirname, '../public');

// Sizes for different favicon versions
const sizes = [16, 32, 192, 512];

async function generateFavicons() {
  try {
    const svgBuffer = fs.readFileSync(svgPath);
    
    // Generate favicon.ico (multi-size ICO file)
    await sharp(svgBuffer)
      .resize(32, 32)
      .toFile(path.join(outputDir, 'favicon.ico'));
    
    // Generate favicon-16x16.png
    await sharp(svgBuffer)
      .resize(16, 16)
      .png()
      .toFile(path.join(outputDir, 'favicon-16x16.png'));
    
    // Generate favicon-32x32.png
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(outputDir, 'favicon-32x32.png'));
    
    // Generate apple-touch-icon.png
    await sharp(svgBuffer)
      .resize(180, 180)
      .png()
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    
    console.log('Favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

// Instructions for manual generation
console.log(`
To generate favicon files, you need to:

1. Install sharp: npm install sharp
2. Run this script: node scripts/generate-favicons.js

Alternatively, you can use an online tool like https://realfavicongenerator.net/
and upload the SVG file from public/assets/images/drexfy-favicon.svg
`);

// Uncomment to run the generation
// generateFavicons();