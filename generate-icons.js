const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Ensure public directory exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const inputImage = path.join(__dirname, 'src/assets/d119b6386dc5275b9d90bef80965acd58bfbf8f7.png');

async function generateIcons() {
  try {
    console.log('Generating PWA icons from album cover...');

    // Generate 192x192 icon
    await sharp(inputImage)
      .resize(192, 192, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(path.join(publicDir, 'icon-192.png'));
    console.log('✓ Created icon-192.png');

    // Generate 512x512 icon
    await sharp(inputImage)
      .resize(512, 512, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(path.join(publicDir, 'icon-512.png'));
    console.log('✓ Created icon-512.png');

    console.log('\nPWA icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
