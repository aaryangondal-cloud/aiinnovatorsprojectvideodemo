# Contributing to GemCopy by Amipi

## Local development

```bash
npm install
cp .env.local.example .env.local   # add your GEMINI_API_KEY
npm run dev                         # starts on http://localhost:3000
```

## Branch and PR flow

1. Pull latest from main: `git pull origin main --rebase`
2. Branch: `git checkout -b feat/your-change`
3. Commit in logical atomic chunks
4. Push: `git push -u origin feat/your-change`
5. Open a PR targeting main
6. CI runs typecheck, lint, and build
7. Vercel creates a preview deployment automatically
8. Merge after review; production deploys on push to main

## House rules

- No ampersands in user-facing copy. Always "and".
- No em dashes. Use commas or regular hyphens.
- Tailwind utilities only; keep custom CSS in globals.css minimal.
- Keep AI prompts in `src/lib/prompts.ts` - never inline in route files.
- Every new route with content should include JSON-LD schema (Article, FAQPage, HowTo, or Product as appropriate).
- Add new routes to `src/app/sitemap.ts`.

## Brand tokens (never hardcode colors)

| Token | Hex | Use |
|---|---|---|
| `navy-600` | #2c3b5b | Primary brand color, body text, headers |
| `navy-900` | #0e1628 | Deep footer background |
| `gold-400` / `gold-500` | #FED700 | CTAs, accents, highlights |
| `gold-600` | #d4b300 | Gold hover state |
| `cream-50` | #fdfcf8 | Soft section backgrounds |

## Testing

No formal tests yet. Before merging:

1. Build passes: `npx next build`
2. Typecheck passes: `npx tsc --noEmit`
3. Manually test the changed flow on preview deploy

## Adding a new comparison page

Use `src/components/ComparisonTemplate.tsx`:

```ts
import ComparisonTemplate, { type ComparisonData } from "@/components/ComparisonTemplate";

const data: ComparisonData = {
  competitor: "SomeTool",
  slug: "gemcopy-vs-sometool",
  directAnswer: "...",
  tldr: "...",
  rows: [...],
  whyItMatters: [...],
  faqs: [...],
};

export default function Page() { return <ComparisonTemplate data={data} />; }
```

Then add the route to `sitemap.ts` and `llms-full.txt`.

## Adding a new blog post

1. Add metadata to `src/lib/resources.ts`
2. Create `src/app/resources/{slug}/page.tsx` using an existing post as a template
3. Include Article JSON-LD
4. Add to sitemap
