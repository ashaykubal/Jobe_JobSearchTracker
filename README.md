Jobe_JobSearchTracker

# Jobe - Your AI Powered Career Co-Pilot

A modern job search tracking application built with Vite, React, and TypeScript.

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages. 

### Setup Instructions

1. **Enable GitHub Pages**: Go to repository Settings → Pages → Source → "GitHub Actions"
2. **Make Repository Public**: GitHub Pages requires a public repository (for free accounts)
3. **Automatic Deployment**: The app will automatically deploy when you push to the `main` branch

### Manual Deployment

You can also deploy manually using:

```bash
npm run deploy
```

### Deployment Configuration

- **Workflow**: `.github/workflows/deploy.yml`
- **Base Path**: `/Jobe_JobSearchTracker/` (configured in `vite.config.ts`)
- **Build Output**: `dist/` folder
- **Triggers**: Push to main branch or manual dispatch

The live application will be available at: `https://yourusername.github.io/Jobe_JobSearchTracker/`
