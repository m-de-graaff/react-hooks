# GitHub Pages Deployment

## Setup Instructions

1. **Enable GitHub Pages in Repository Settings:**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `(root)`
   - Click Save

2. **Verify the deployment:**
   - The site will be available at: `https://m-de-graaff.github.io/react-hooks/`
   - Note the trailing slash and `/react-hooks/` path (required for project sites)

3. **Troubleshooting:**
   - If you see a 404, wait a few minutes for GitHub Pages to build
   - Check the Actions tab to ensure the deployment workflow completed successfully
   - Verify that `gh-pages` branch contains `index.html` at the root
   - Ensure the repository is public (or you have GitHub Pro for private repos)

## Manual Deployment

If you need to deploy manually:

```bash
cd playground
pnpm install
pnpm build
npx gh-pages -d dist
```

## Build Output

The build creates:
- `dist/index.html` - Main entry point
- `dist/assets/` - JavaScript and CSS bundles
- `dist/.nojekyll` - Disables Jekyll processing

