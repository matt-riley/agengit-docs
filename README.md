# mysite

> An Astro site deployed to Cloudflare Pages.

<!-- Uncomment badges after pushing to GitHub:
[![CI](https://github.com/YOUR_USERNAME/mysite/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/mysite/actions/workflows/ci.yml)
[![Deploy](https://github.com/YOUR_USERNAME/mysite/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/mysite/actions/workflows/deploy.yml)
-->

## Stack

- [Astro](https://astro.build/) — SSR via Cloudflare Workers
- [Tailwind CSS](https://tailwindcss.com/) v4
- [oxlint](https://oxc.rs/) — linting
- [oxfmt](https://oxc.rs/) — formatting
- [vitest](https://vitest.dev/) — testing
- [Cloudflare Pages](https://pages.cloudflare.com/) — hosting

## Getting Started from Template

1. Click "Use this template" on GitHub to create your repo
2. Clone your new repo
3. Replace placeholders:
   ```bash
   # Update wrangler.toml — change "mysite" to your project name
   # Update package.json — change "astro-site-template" to your project name
   # Update README.md — replace YOUR_USERNAME, write your own description
   ```
4. Set up Cloudflare Pages secrets in GitHub repo settings:
   - `CLOUDFLARE_API_TOKEN` — API token with Pages edit permission
   - `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account ID
5. Install dependencies and start developing:
   ```bash
   pnpm install
   pnpm dev
   ```

## Development

```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm preview      # Preview production build locally
```

## Testing

```bash
pnpm test         # Run tests once
pnpm test:watch   # Run tests in watch mode
```

## Linting & Formatting

```bash
pnpm lint         # Lint with oxlint
pnpm format       # Format with oxfmt
pnpm format:check # Check formatting (CI uses this)
```

## Deployment

Deployment happens automatically on push to `main` via the [Cloudflare Pages deploy workflow](.github/workflows/deploy.yml).

To deploy manually:

```bash
pnpm build
pnpm wrangler pages deploy dist --project-name=mysite
```

## License

[MIT](LICENSE)
