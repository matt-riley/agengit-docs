# agengit-docs

Documentation site for **[agengit](https://github.com/matt-riley/agengit)** — the CLI that records AI-agent coding activity so you can inspect what happened between commits.

**Live site:** [https://agengit.mattriley.tools](https://agengit.mattriley.tools)

## What is this?

This Astro site hosts the official documentation for `agit` (agengit). It covers:

- Installation and quick start
- All CLI commands (setup, inspection, search, analysis, maintenance, remotes, advanced)
- Architecture and design decisions
- Data formats

See the [main agengit repository](https://github.com/matt-riley/agengit) for the CLI source, releases, and full feature details.

## Stack

- [Astro](https://astro.build/) — SSR via Cloudflare Workers
- [Tailwind CSS](https://tailwindcss.com/) v4
- [oxlint](https://oxc.rs/) — linting
- [oxfmt](https://oxc.rs/) — formatting
- [vitest](https://vitest.dev/) — testing
- [Cloudflare Pages](https://pages.cloudflare.com/) — hosting

## Development

```bash
pnpm install
pnpm dev          # Start dev server (http://localhost:4321)
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

CI runs the build for validation (see [.github/workflows/ci.yml](.github/workflows/ci.yml)), but the site is deployed manually.

```bash
pnpm build
pnpm wrangler pages deploy dist --project-name=agengit-docs
```

The production site is served at `https://agengit.mattriley.tools`.

## License

[MIT](LICENSE)
