# Drexfy Logo and Favicon Assets

This directory contains the logo and favicon assets for the Drexfy Visa application.

## Logo Files

- `drexfy-logo-dark.svg` - Black logo for light backgrounds
- `drexfy-logo-light.svg` - White logo for dark backgrounds
- `drexfy-logo-color.svg` - Blue and orange colored logo

## Favicon Files

- `drexfy-favicon.svg` - SVG favicon (used as the primary favicon)

## Usage

### In the Logo Component

The Logo component (`src/templates/Logo.tsx`) automatically uses the appropriate logo based on the current theme:
- Dark theme: Uses `drexfy-logo-light.svg`
- Light theme: Uses `drexfy-logo-dark.svg`

### Favicon

The favicon is configured in the root layout file (`src/app/[locale]/layout.tsx`) and uses the SVG favicon as the primary icon, with fallbacks to the traditional PNG and ICO formats.

## Generating Favicon Files

If you need to generate PNG and ICO versions of the favicon (for better browser compatibility), you can:

1. Use an online tool like [Real Favicon Generator](https://realfavicongenerator.net/) and upload the `drexfy-favicon.svg` file
2. Or use the script provided in `scripts/generate-favicons.js` (requires installing the `sharp` package)

## Preview

You can preview all logos and the favicon by opening `/favicon-generator.html` in your browser.