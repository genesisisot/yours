# Creating PWA Icons for Android

You need to create two icon files for your PWA to work on Android:

## Required Icons:
1. `public/icon-192.png` (192x192 pixels)
2. `public/icon-512.png` (512x512 pixels)

## Option 1: Use an online tool (Easiest)
1. Go to https://www.pwabuilder.com/imageGenerator
2. Upload your cover image: `src/assets/d119b6386dc5275b9d90bef80965acd58bfbf8f7.png`
3. Download the generated icons
4. Copy `icon-192.png` and `icon-512.png` to the `public/` folder

## Option 2: Use an image editor
1. Open your cover image in an image editor (Photoshop, GIMP, Figma, etc.)
2. Resize to 512x512 pixels (square, crop as needed)
3. Save as `public/icon-512.png`
4. Resize to 192x192 pixels
5. Save as `public/icon-192.png`

## Option 3: Use ImageMagick (Command line)
If you have ImageMagick installed:
```bash
# Create 512x512 icon
magick convert src/assets/d119b6386dc5275b9d90bef80965acd58bfbf8f7.png -resize 512x512 -gravity center -extent 512x512 public/icon-512.png

# Create 192x192 icon
magick convert src/assets/d119b6386dc5275b9d90bef80965acd58bfbf8f7.png -resize 192x192 -gravity center -extent 192x192 public/icon-192.png
```

## Important Notes:
- Icons should be square (1:1 aspect ratio)
- Use PNG format
- The icons should look good on both light and dark backgrounds
- For maskable icons (Android adaptive icons), keep important content in the center 80% of the image
