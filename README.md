# elvissierra.github.io

Personal software engineering portfolio for Elvis Sierra. Astro + Tailwind, built to
static files and served as Cloudflare Workers static assets (Worker `elvis-portfolio`).
Studio work (CAD, 3D printing, product design) lives on refinery.st, not here.

## Structure

- `src/layouts/Layout.astro` — page shell, meta, JSON-LD, nav and footer.
- `src/components/` — one component per home page section: `Hero`, `About`,
  `Experience`, `Projects`, `OutsideWork`, `Contact`, plus `Nav` and `Footer`.
- `src/data/experience.ts` — roles and bullets, most recent first.
- `src/content/projects/*.md` — one case study per file. The filename is the URL
  (`/projects/<slug>`); frontmatter holds the card summary, tags, cover, and gallery.
  Images go in `public/images/projects/<slug>/`.
- `src/pages/resume.astro` — standalone, print-tuned resume. Keep it in sync with
  `public/Elvis-Sierra-Resume.pdf`.
- `src/styles/global.css` — color tokens (light default, dark via OS setting).

## Adding a project

Add `src/content/projects/<slug>.md` (copy an existing one), drop its images in
`public/images/projects/<slug>/`, and set `order`. Nothing else needs updating.

## Commands

| Command           | Action                                     |
| :---------------- | :----------------------------------------- |
| `npm install`     | Install dependencies                       |
| `npm run dev`     | Start local dev server                     |
| `npm run build`   | Build the static site to `./dist/`         |
| `npm run preview` | Preview the production build locally       |

## Deployment

Workers Builds runs `npm run build` and `npx wrangler deploy` on push to `main`.
Until cutover, the old GitHub Pages site is still served from `main`; this rebuild
lives on the `astro-rebuild` branch.
