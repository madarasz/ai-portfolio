# AI Portfolio Static Site Design

Date: 2026-05-07

## Goal

Build a single-page portfolio website for István Madarász that showcases projects built with AI and coding agents. The page should feel fashionable, modern, sleek, simple, unique, and elegant while remaining a fast static website with strong SEO.

## Approved Direction

The site will be a single static HTML page with one stylesheet. There will be no React, no client-side framework, and no required build step. The design quality should come from semantic HTML, modern CSS, strong art direction, careful copy, and excellent metadata.

The visual anchor is Aurora Maximalism:

- Dark saturated gradient surface using violet, magenta, and cyan.
- Oversized display typography with tight letter spacing.
- Luminous project cards that feel like polished glass artifacts.
- Subtle CSS-only motion and depth, respecting `prefers-reduced-motion`.

The differentiator is a "constellation of builds": project cards are arranged and lit like artifacts orbiting the intro rather than ordinary portfolio tiles.

## Audience

The primary audience is people reviewing István's project work: collaborators, technical peers, hiring/recruiting viewers, and people curious about practical AI-assisted software development. The page should read first as a personal portfolio, with the AI/coding-agent angle as a clear connective thread.

## Content

Hero content:

- Name: István Madarász
- LinkedIn: https://www.linkedin.com/in/istvanmadarasz/
- Positioning: a concise personal intro explaining that this page collects practical projects built with AI and coding agents.

Initial projects:

- Kill Team Rules Bot: https://github.com/madarasz/kt-rules-bot
- Sector Hungaricus v2: https://github.com/madarasz/sectorhungaricus-v2
- Datacard Manager: https://github.com/madarasz/datacard-manager
- Always Be Running: https://github.com/madarasz/always-be-running
- Tournament Tables: https://github.com/madarasz/tournament-tables

Project cards will include:

- Screenshot area using stylized placeholders for the first version.
- Project name.
- GitHub repository link.
- Description covering purpose, concept, and practical use.
- Technology/framework/tool tags.

The page should avoid lorem ipsum in shipped copy. Where complete project details are unavailable, use concise honest draft copy based on repository names and available public repo context, not fabricated metrics or fake product claims.

## Information From Public Repositories

Public repository context may be used to improve draft copy:

- `kt-rules-bot` is a Discord bot for Warhammer 40k: Kill Team rules lookup using RAG, semantic plus BM25 search, Pydantic structured output, ChromaDB, Python 3.12, discord.py, and multiple LLM providers.
- `always-be-running` is the AlwaysBeRunning.net web app, with a Laravel/PHP, Blade, JavaScript, MySQL, Composer, npm/gulp, and Cypress-era stack.

For the other repositories, copy should remain conservative until the user provides final descriptions or screenshots.

## Architecture

Files:

- `index.html`: semantic page content, SEO metadata, Open Graph tags, JSON-LD structured data, project cards, and accessible links.
- `styles.css`: all layout, typography, color tokens, responsive behavior, and CSS-only motion.
- `robots.txt`: crawler guidance.
- `sitemap.xml`: single-page sitemap. Use `https://madarasz.github.io/ai-portfolio/` as the first deploy URL unless the user provides a custom domain before implementation.
- Optional placeholder image assets can be added later if desired, but the first version can draw screenshot placeholders in CSS to avoid asset overhead.

No JavaScript is required for the first version. If added later, JavaScript should only support progressive enhancement and must not be needed for content, navigation, or SEO.

## SEO And Semantics

The page will include:

- Descriptive `title` and `meta name="description"`.
- Canonical URL using `https://madarasz.github.io/ai-portfolio/` unless the user provides a custom domain before implementation.
- Open Graph and Twitter card metadata.
- Semantic landmarks: `header`, `main`, `section`, `article`, `footer`.
- One clear `h1`, structured `h2` headings, and descriptive project link text.
- Meaningful `alt` text for screenshot placeholders or future screenshots.
- JSON-LD for `Person` and project entries using `SoftwareSourceCode` or `CreativeWork`.
- `robots.txt` and `sitemap.xml`.

## Visual System

CSS tokens:

- Surface: deep navy-black / violet-black base.
- Accent gradient: violet to magenta to cyan.
- Text: high-contrast white with controlled translucent secondary text.
- Cards: glass-like translucent panels with border highlights and gradient image wells.
- Typography: expressive display face via system-safe fallback unless an external font is intentionally added. No dependency on remote fonts for core rendering.

Modern CSS should be used where it improves quality without fragility:

- CSS custom properties.
- Cascade layers.
- Responsive `clamp()`.
- CSS grid.
- Container queries where useful.
- `@supports` fallbacks.
- `prefers-reduced-motion`.
- `color-mix()` only with fallback values.

## Responsive Behavior

Desktop:

- Large editorial hero with compact intro text and clear LinkedIn call-to-action.
- Project cards arranged in a visually distinctive responsive grid.

Tablet:

- Preserve card hierarchy and readable descriptions.
- Reduce hero scale while retaining the aurora atmosphere.

Mobile:

- Single-column flow.
- Cards remain tappable and scannable.
- Motion and decorative layers must not interfere with readability.

## Accessibility

Requirements:

- Links must be keyboard-focusable with visible focus states.
- Color contrast must remain readable over gradients.
- Motion must respect `prefers-reduced-motion`.
- Project cards should not rely on hover-only affordances.
- Decorative visual layers should be hidden from assistive technology.

## Testing And Verification

Verification will include:

- Validate that `index.html`, `styles.css`, `robots.txt`, and `sitemap.xml` exist.
- Open the page locally in a browser and visually inspect desktop and mobile widths.
- Check that content is readable without JavaScript.
- Check metadata and JSON-LD for obvious syntax mistakes.
- Check links point to the provided GitHub and LinkedIn URLs.

## Out Of Scope For First Version

- React or any client-side app framework.
- CMS or project editing UI.
- Live GitHub API calls.
- Real screenshots unless the user provides assets.
- Analytics, contact forms, or backend services.
