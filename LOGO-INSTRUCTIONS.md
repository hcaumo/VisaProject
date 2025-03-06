# Drexfy Logo and Favicon Instructions

## Current Implementation

I've updated the application to use PNG images for the Drexfy logo and favicon:

1. The Logo component in `src/templates/Logo.tsx` now uses PNG images that switch between dark and light versions based on the theme.
2. The favicon configuration has been updated to use favicon.ico.

## How to Use Your Actual Logo Images

To use the actual logo images you provided:

1. Save the black logo image as `public/assets/images/drexfy/logo-black.png`
2. Save the white logo image as `public/assets/images/drexfy/logo-white.png`
3. Save the favicon image as `public/favicon.ico` (replacing the existing one)

I've created empty placeholder files at these locations, but you need to replace them with the actual images.

## Using the Script

I've created a script to help you save the images:

```bash
# Run this to see instructions
node scripts/save-logo-images.js
```

## Favicon

For the favicon, you should:

1. Replace the existing favicon files in the public directory with your actual favicon files:
   - `/favicon.ico` - Main favicon file
   - `/favicon-16x16.png` - 16x16 PNG version
   - `/favicon-32x32.png` - 32x32 PNG version
   - `/apple-touch-icon.png` - 180x180 PNG for Apple devices

2. You can use an online tool like [Real Favicon Generator](https://realfavicongenerator.net/) to create all the necessary favicon files from your original image.

## Cleanup

Once you've added your actual image files, you can remove the temporary SVG files:
- `/public/favicon.svg`
- `/public/assets/images/drexfy-logo-dark.svg`
- `/public/assets/images/drexfy-logo-light.svg`
- `/public/assets/images/drexfy-logo-color.svg`
- `/public/assets/images/drexfy-favicon.svg`