# AI Portfolio Static Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, SEO-focused one-page portfolio for István Madarász showcasing AI/coding-agent-built projects.

**Architecture:** The site is plain `index.html` plus `styles.css`, with crawler files and a local-only verification script. All project content is visible in semantic HTML with CSS-drawn screenshot placeholders, so the page is deployable as static files and readable without JavaScript.

**Tech Stack:** HTML5, modern CSS, JSON-LD, `robots.txt`, `sitemap.xml`, and Node.js standard library for local verification only.

---

## File Structure

- Create `index.html`: semantic content, metadata, Open Graph/Twitter tags, JSON-LD, hero, project cards, and footer.
- Create `styles.css`: Aurora Maximalism art direction, responsive layout, CSS-only placeholders, focus states, and reduced-motion support.
- Create `robots.txt`: allow crawlers and point to the sitemap.
- Create `sitemap.xml`: single URL for `https://madarasz.github.io/ai-portfolio/`.
- Create `scripts/verify-site.mjs`: local static checks for required files, links, metadata, JSON-LD validity, and absence of accidental runtime scripts.

## Content Model

Use these five project records directly in `index.html`:

| Project | URL | Draft Copy | Tags |
| --- | --- | --- | --- |
| Kill Team Rules Bot | `https://github.com/madarasz/kt-rules-bot` | Discord rules assistant for Warhammer 40k: Kill Team, using retrieval-augmented generation to answer rules questions from structured sources. | Python 3.12, discord.py, RAG, ChromaDB, BM25, Pydantic, LLMs |
| Sector Hungaricus v2 | `https://github.com/madarasz/sectorhungaricus-v2` | A refreshed web presence for Sector Hungaricus, kept intentionally conservative until final project details are supplied. | Static/Web, HTML, CSS, AI-assisted development |
| Datacard Manager | `https://github.com/madarasz/datacard-manager` | Tooling for managing tabletop datacards and related game reference material, with first-version copy ready to refine when screenshots are available. | Web app, Data management, UX, AI-assisted development |
| Always Be Running | `https://github.com/madarasz/always-be-running` | AlwaysBeRunning.net, a community web app with a PHP/Laravel-era stack and tournament/event tooling roots. | PHP, Laravel, Blade, JavaScript, MySQL, Composer, Cypress |
| Tournament Tables | `https://github.com/madarasz/tournament-tables` | A tournament table utility for organizing event data into clearer, more usable views. | Web app, Tournament tooling, HTML, CSS, AI-assisted development |

## Task 1: Add Local Static Verification

**Files:**
- Create: `scripts/verify-site.mjs`

- [ ] **Step 1: Create the verification script**

Create `scripts/verify-site.mjs`:

```js
import { readFile, access } from "node:fs/promises";

const requiredFiles = ["index.html", "styles.css", "robots.txt", "sitemap.xml"];
const requiredLinks = [
  "https://www.linkedin.com/in/istvanmadarasz/",
  "https://github.com/madarasz/kt-rules-bot",
  "https://github.com/madarasz/sectorhungaricus-v2",
  "https://github.com/madarasz/datacard-manager",
  "https://github.com/madarasz/always-be-running",
  "https://github.com/madarasz/tournament-tables"
];

const requiredSnippets = [
  "<title>",
  "name=\"description\"",
  "rel=\"canonical\"",
  "property=\"og:title\"",
  "name=\"twitter:card\"",
  "application/ld+json",
  "<header",
  "<main",
  "<article",
  "<footer"
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

for (const file of requiredFiles) {
  await access(file);
}

const html = await readFile("index.html", "utf8");
const css = await readFile("styles.css", "utf8");
const robots = await readFile("robots.txt", "utf8");
const sitemap = await readFile("sitemap.xml", "utf8");

for (const snippet of requiredSnippets) {
  assert(html.includes(snippet), `Missing required HTML snippet: ${snippet}`);
}

for (const link of requiredLinks) {
  assert(html.includes(link), `Missing required link: ${link}`);
}

assert(!html.includes("<script src="), "Static page should not load runtime JavaScript");
assert(html.includes("István Madarász"), "Name should preserve accents");
assert(css.includes("@media (prefers-reduced-motion: reduce)"), "CSS must respect reduced motion");
assert(css.includes("@container"), "CSS should include at least one container query");
assert(robots.includes("Sitemap: https://madarasz.github.io/ai-portfolio/sitemap.xml"), "robots.txt should reference sitemap");
assert(sitemap.includes("<loc>https://madarasz.github.io/ai-portfolio/</loc>"), "sitemap should include canonical page URL");

const jsonLdMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) ?? [];
assert(jsonLdMatches.length > 0, "Missing JSON-LD block");

for (const block of jsonLdMatches) {
  const json = block
    .replace('<script type="application/ld+json">', "")
    .replace("</script>", "")
    .trim();
  JSON.parse(json);
}

console.log("Static site verification passed.");
```

- [ ] **Step 2: Run verification and confirm it fails before site files exist**

Run: `node scripts/verify-site.mjs`

Expected: FAIL with a missing file error for `index.html` or another required file.

- [ ] **Step 3: Commit the verification script**

Run:

```bash
git add scripts/verify-site.mjs
git commit -m "Add static site verification script"
```

Expected: commit succeeds.

## Task 2: Create Semantic HTML And SEO Metadata

**Files:**
- Create: `index.html`
- Test: `scripts/verify-site.mjs`

- [ ] **Step 1: Create `index.html` with semantic content**

Create `index.html` using this structure:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>István Madarász | AI-Built Project Portfolio</title>
  <meta name="description" content="A portfolio of practical software projects by István Madarász, built with AI and coding agents.">
  <link rel="canonical" href="https://madarasz.github.io/ai-portfolio/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="István Madarász | AI-Built Project Portfolio">
  <meta property="og:description" content="Practical software projects built with AI and coding agents.">
  <meta property="og:url" content="https://madarasz.github.io/ai-portfolio/">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="István Madarász | AI-Built Project Portfolio">
  <meta name="twitter:description" content="Practical software projects built with AI and coding agents.">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="ambient ambient-one" aria-hidden="true"></div>
  <div class="ambient ambient-two" aria-hidden="true"></div>

  <header class="site-header">
    <a class="skip-link" href="#projects">Skip to projects</a>
    <nav class="topline" aria-label="Primary">
      <a href="https://www.linkedin.com/in/istvanmadarasz/">LinkedIn</a>
      <a href="#projects">Projects</a>
    </nav>
    <section class="hero" aria-labelledby="page-title">
      <p class="eyebrow">Portfolio of AI-assisted software work</p>
      <h1 id="page-title">István Madarász builds practical software with coding agents.</h1>
      <p class="hero-copy">A focused collection of projects shaped with AI-assisted development: rules assistants, community web apps, tabletop tools, and experiments in making software faster to explore and easier to ship.</p>
      <a class="primary-link" href="https://www.linkedin.com/in/istvanmadarasz/">Connect on LinkedIn</a>
    </section>
  </header>

  <main id="projects" class="projects" aria-labelledby="projects-title">
    <div class="section-heading">
      <p class="eyebrow">Selected builds</p>
      <h2 id="projects-title">Projects built with AI and coding agents</h2>
    </div>
    <!-- Add five article.project-card entries in Task 3. -->
  </main>

  <footer class="site-footer">
    <p>Static portfolio for István Madarász. Built to keep the projects visible, fast, and easy to update.</p>
  </footer>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://madarasz.github.io/ai-portfolio/#person",
        "name": "István Madarász",
        "url": "https://madarasz.github.io/ai-portfolio/",
        "sameAs": ["https://www.linkedin.com/in/istvanmadarasz/"],
        "knowsAbout": ["AI-assisted software development", "coding agents", "web applications", "tabletop gaming tools"]
      }
    ]
  }
  </script>
</body>
</html>
```

- [ ] **Step 2: Run verification and confirm expected remaining failures**

Run: `node scripts/verify-site.mjs`

Expected: FAIL because `styles.css`, `robots.txt`, and `sitemap.xml` do not exist yet, or because project links are not all present yet.

- [ ] **Step 3: Commit semantic HTML baseline**

Run:

```bash
git add index.html
git commit -m "Add semantic portfolio HTML baseline"
```

Expected: commit succeeds.

## Task 3: Add Project Cards And Structured Data

**Files:**
- Modify: `index.html`
- Test: `scripts/verify-site.mjs`

- [ ] **Step 1: Replace the Task 2 project placeholder comment with five cards**

Use `article` elements with this pattern for each project:

```html
<article class="project-card featured">
  <div class="project-shot shot-rules" role="img" aria-label="Stylized placeholder screenshot for Kill Team Rules Bot"></div>
  <div class="project-body">
    <p class="project-index">01</p>
    <h3>Kill Team Rules Bot</h3>
    <p>Discord rules assistant for Warhammer 40k: Kill Team, using retrieval-augmented generation to answer rules questions from structured sources.</p>
    <ul class="tags" aria-label="Technologies used">
      <li>Python 3.12</li>
      <li>discord.py</li>
      <li>RAG</li>
      <li>ChromaDB</li>
      <li>BM25</li>
      <li>Pydantic</li>
      <li>LLMs</li>
    </ul>
    <a class="repo-link" href="https://github.com/madarasz/kt-rules-bot">View Kill Team Rules Bot on GitHub</a>
  </div>
</article>
```

Use these exact additional project cards:

```html
<article class="project-card">
  <div class="project-shot shot-sector" role="img" aria-label="Stylized placeholder screenshot for Sector Hungaricus v2"></div>
  <div class="project-body">
    <p class="project-index">02</p>
    <h3>Sector Hungaricus v2</h3>
    <p>A refreshed web presence for Sector Hungaricus, kept intentionally conservative until final project details are supplied.</p>
    <ul class="tags" aria-label="Technologies used">
      <li>Static/Web</li>
      <li>HTML</li>
      <li>CSS</li>
      <li>AI-assisted development</li>
    </ul>
    <a class="repo-link" href="https://github.com/madarasz/sectorhungaricus-v2">View Sector Hungaricus v2 on GitHub</a>
  </div>
</article>

<article class="project-card">
  <div class="project-shot shot-datacard" role="img" aria-label="Stylized placeholder screenshot for Datacard Manager"></div>
  <div class="project-body">
    <p class="project-index">03</p>
    <h3>Datacard Manager</h3>
    <p>Tooling for managing tabletop datacards and related game reference material, with first-version copy ready to refine when screenshots are available.</p>
    <ul class="tags" aria-label="Technologies used">
      <li>Web app</li>
      <li>Data management</li>
      <li>UX</li>
      <li>AI-assisted development</li>
    </ul>
    <a class="repo-link" href="https://github.com/madarasz/datacard-manager">View Datacard Manager on GitHub</a>
  </div>
</article>

<article class="project-card">
  <div class="project-shot shot-abr" role="img" aria-label="Stylized placeholder screenshot for Always Be Running"></div>
  <div class="project-body">
    <p class="project-index">04</p>
    <h3>Always Be Running</h3>
    <p>AlwaysBeRunning.net, a community web app with a PHP/Laravel-era stack and tournament/event tooling roots.</p>
    <ul class="tags" aria-label="Technologies used">
      <li>PHP</li>
      <li>Laravel</li>
      <li>Blade</li>
      <li>JavaScript</li>
      <li>MySQL</li>
      <li>Composer</li>
      <li>Cypress</li>
    </ul>
    <a class="repo-link" href="https://github.com/madarasz/always-be-running">View Always Be Running on GitHub</a>
  </div>
</article>

<article class="project-card">
  <div class="project-shot shot-tables" role="img" aria-label="Stylized placeholder screenshot for Tournament Tables"></div>
  <div class="project-body">
    <p class="project-index">05</p>
    <h3>Tournament Tables</h3>
    <p>A tournament table utility for organizing event data into clearer, more usable views.</p>
    <ul class="tags" aria-label="Technologies used">
      <li>Web app</li>
      <li>Tournament tooling</li>
      <li>HTML</li>
      <li>CSS</li>
      <li>AI-assisted development</li>
    </ul>
    <a class="repo-link" href="https://github.com/madarasz/tournament-tables">View Tournament Tables on GitHub</a>
  </div>
</article>
```

- [ ] **Step 2: Expand JSON-LD graph with project entries**

Add these five `SoftwareSourceCode` objects inside the existing `@graph` array, after the `Person` object:

```json
{
  "@type": "SoftwareSourceCode",
  "name": "Kill Team Rules Bot",
  "codeRepository": "https://github.com/madarasz/kt-rules-bot",
  "programmingLanguage": ["Python"],
  "creator": {
    "@id": "https://madarasz.github.io/ai-portfolio/#person"
  },
  "description": "Discord rules assistant for Warhammer 40k: Kill Team, using retrieval-augmented generation to answer rules questions from structured sources."
},
{
  "@type": "SoftwareSourceCode",
  "name": "Sector Hungaricus v2",
  "codeRepository": "https://github.com/madarasz/sectorhungaricus-v2",
  "programmingLanguage": ["HTML", "CSS"],
  "creator": {
    "@id": "https://madarasz.github.io/ai-portfolio/#person"
  },
  "description": "A refreshed web presence for Sector Hungaricus, kept intentionally conservative until final project details are supplied."
},
{
  "@type": "SoftwareSourceCode",
  "name": "Datacard Manager",
  "codeRepository": "https://github.com/madarasz/datacard-manager",
  "programmingLanguage": ["HTML", "CSS"],
  "creator": {
    "@id": "https://madarasz.github.io/ai-portfolio/#person"
  },
  "description": "Tooling for managing tabletop datacards and related game reference material, with first-version copy ready to refine when screenshots are available."
},
{
  "@type": "SoftwareSourceCode",
  "name": "Always Be Running",
  "codeRepository": "https://github.com/madarasz/always-be-running",
  "programmingLanguage": ["PHP", "JavaScript"],
  "creator": {
    "@id": "https://madarasz.github.io/ai-portfolio/#person"
  },
  "description": "AlwaysBeRunning.net, a community web app with a PHP/Laravel-era stack and tournament/event tooling roots."
},
{
  "@type": "SoftwareSourceCode",
  "name": "Tournament Tables",
  "codeRepository": "https://github.com/madarasz/tournament-tables",
  "programmingLanguage": ["HTML", "CSS"],
  "creator": {
    "@id": "https://madarasz.github.io/ai-portfolio/#person"
  },
  "description": "A tournament table utility for organizing event data into clearer, more usable views."
}
```

- [ ] **Step 3: Run verification and confirm expected remaining failures**

Run: `node scripts/verify-site.mjs`

Expected: FAIL only because `styles.css`, `robots.txt`, or `sitemap.xml` are still missing.

- [ ] **Step 4: Commit project content**

Run:

```bash
git add index.html
git commit -m "Add portfolio project content"
```

Expected: commit succeeds.

## Task 4: Implement Aurora CSS

**Files:**
- Create: `styles.css`
- Test: `scripts/verify-site.mjs`

- [ ] **Step 1: Create `styles.css`**

Create a stylesheet with these required sections:

```css
@layer reset, base, layout, components, motion;

@layer reset {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body,
  h1,
  h2,
  h3,
  p {
    margin: 0;
  }
}

@layer base {
  :root {
    --surface: #0a0014;
    --surface-2: #130425;
    --text: #ffffff;
    --muted: rgba(255, 255, 255, 0.72);
    --line: rgba(255, 255, 255, 0.2);
    --violet: #5d34d0;
    --magenta: #ff006e;
    --cyan: #00f0ff;
    --radius-xl: 34px;
    --radius-lg: 24px;
    --shadow-glow: 0 30px 120px rgba(0, 240, 255, 0.18);
    color-scheme: dark;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    min-height: 100vh;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    color: var(--text);
    background:
      radial-gradient(circle at 14% 8%, rgba(0, 240, 255, 0.28), transparent 28rem),
      radial-gradient(circle at 86% 18%, rgba(255, 0, 110, 0.22), transparent 30rem),
      linear-gradient(135deg, var(--surface), var(--surface-2) 52%, #02030a);
    line-height: 1.5;
  }

  a {
    color: inherit;
  }

  a:focus-visible {
    outline: 3px solid var(--cyan);
    outline-offset: 5px;
  }
}

@layer layout {
  .site-header,
  .projects,
  .site-footer {
    width: min(1180px, calc(100% - 32px));
    margin-inline: auto;
  }

  .hero {
    min-height: 78vh;
    display: grid;
    align-content: center;
    gap: 24px;
    padding-block: 88px;
  }

  .hero h1 {
    max-width: 980px;
    font-size: clamp(3.6rem, 11vw, 10.5rem);
    line-height: 0.82;
    letter-spacing: -0.09em;
    text-wrap: balance;
    text-shadow: 0 0 36px rgba(0, 240, 255, 0.2);
  }

  .projects {
    container-type: inline-size;
    padding-block: 32px 88px;
  }

  .projects::after {
    content: "";
    display: block;
    clear: both;
  }
}

@layer components {
  .skip-link {
    position: absolute;
    inset: 12px auto auto 12px;
    transform: translateY(-140%);
  }

  .skip-link:focus {
    transform: translateY(0);
  }

  .topline {
    display: flex;
    justify-content: flex-end;
    gap: 18px;
    padding-block: 22px;
  }

  .eyebrow,
  .project-index {
    color: var(--cyan);
    font-size: 0.78rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .hero-copy {
    max-width: 720px;
    color: var(--muted);
    font-size: clamp(1.1rem, 2vw, 1.45rem);
  }

  .primary-link,
  .repo-link {
    width: fit-content;
    border: 1px solid var(--line);
    border-radius: 999px;
    padding: 0.78rem 1rem;
    text-decoration: none;
    background: rgba(255, 255, 255, 0.08);
  }

  .section-heading {
    margin-bottom: 24px;
  }

  .section-heading h2 {
    max-width: 860px;
    font-size: clamp(2.4rem, 7vw, 6rem);
    line-height: 0.9;
    letter-spacing: -0.07em;
  }

  .project-card {
    display: grid;
    grid-template-columns: minmax(220px, 0.9fr) minmax(260px, 1.1fr);
    gap: 22px;
    min-height: 420px;
    margin-block: 18px;
    padding: 18px;
    border: 1px solid var(--line);
    border-radius: var(--radius-xl);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.04));
    box-shadow: var(--shadow-glow);
    backdrop-filter: blur(22px);
  }

  .project-card:nth-of-type(even) {
    transform: translateX(5%);
  }

  .project-shot {
    min-height: 280px;
    border-radius: var(--radius-lg);
    border: 1px solid rgba(255, 255, 255, 0.22);
    background:
      linear-gradient(120deg, rgba(255, 255, 255, 0.24), transparent 32%),
      radial-gradient(circle at 30% 20%, var(--cyan), transparent 30%),
      radial-gradient(circle at 75% 70%, var(--magenta), transparent 34%),
      var(--violet);
  }

  .project-body {
    display: grid;
    align-content: space-between;
    gap: 16px;
    padding: 10px;
  }

  .project-body h3 {
    font-size: clamp(2rem, 5vw, 4.7rem);
    line-height: 0.9;
    letter-spacing: -0.07em;
  }

  .project-body p {
    color: var(--muted);
    font-size: 1.05rem;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .tags li {
    border: 1px solid var(--line);
    border-radius: 999px;
    padding: 0.42rem 0.64rem;
    color: rgba(255, 255, 255, 0.78);
  }

  .site-footer {
    padding-block: 24px 44px;
    color: var(--muted);
  }
}

@layer motion {
  .ambient {
    position: fixed;
    inset: auto;
    z-index: -1;
    width: 44vw;
    aspect-ratio: 1;
    border-radius: 999px;
    filter: blur(80px);
    opacity: 0.35;
    animation: drift 16s ease-in-out infinite alternate;
  }

  .ambient-one {
    top: 6vh;
    left: -10vw;
    background: var(--cyan);
  }

  .ambient-two {
    right: -12vw;
    bottom: 12vh;
    background: var(--magenta);
    animation-delay: -5s;
  }

  @keyframes drift {
    from {
      transform: translate3d(0, 0, 0) scale(1);
    }

    to {
      transform: translate3d(6vw, -3vh, 0) scale(1.12);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
    }
  }
}

@container (max-width: 760px) {
  .project-card {
    grid-template-columns: 1fr;
  }

  .project-card:nth-of-type(even) {
    transform: none;
  }
}

@media (max-width: 720px) {
  .topline {
    justify-content: flex-start;
  }

  .hero {
    min-height: auto;
    padding-block: 56px;
  }
}
```

- [ ] **Step 2: Run verification and confirm expected remaining failures**

Run: `node scripts/verify-site.mjs`

Expected: FAIL only because `robots.txt` or `sitemap.xml` are missing.

- [ ] **Step 3: Commit CSS**

Run:

```bash
git add styles.css
git commit -m "Add aurora portfolio styling"
```

Expected: commit succeeds.

## Task 5: Add Crawler Files

**Files:**
- Create: `robots.txt`
- Create: `sitemap.xml`
- Test: `scripts/verify-site.mjs`

- [ ] **Step 1: Create `robots.txt`**

Create `robots.txt`:

```txt
User-agent: *
Allow: /

Sitemap: https://madarasz.github.io/ai-portfolio/sitemap.xml
```

- [ ] **Step 2: Create `sitemap.xml`**

Create `sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://madarasz.github.io/ai-portfolio/</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 3: Run verification and confirm it passes**

Run: `node scripts/verify-site.mjs`

Expected: PASS with `Static site verification passed.`

- [ ] **Step 4: Commit crawler files**

Run:

```bash
git add robots.txt sitemap.xml
git commit -m "Add crawler metadata files"
```

Expected: commit succeeds.

## Task 6: Browser Verification And Polish

**Files:**
- Modify if needed: `index.html`
- Modify if needed: `styles.css`
- Test: browser visual inspection and `scripts/verify-site.mjs`

- [ ] **Step 1: Start a local static server**

Run:

```bash
python3 -m http.server 4173
```

Expected: server starts at `http://localhost:4173/`.

- [ ] **Step 2: Inspect desktop layout**

Open `http://localhost:4173/` in the in-app browser or Playwright. Verify:

- Hero text is readable and visually dominant.
- LinkedIn and Projects links are visible.
- Five project cards are visible.
- Cards do not overlap in a way that hides text.
- Placeholder screenshot areas look intentional, not broken.

- [ ] **Step 3: Inspect mobile layout**

Resize to approximately `390x844`. Verify:

- Hero is readable.
- Project cards become one column.
- Tags wrap cleanly.
- Links remain tappable.

- [ ] **Step 4: Apply focused polish if browser inspection finds issues**

If text contrast, spacing, or card layout needs adjustment, edit only `styles.css`. Keep the Aurora tokens and static architecture intact.

- [ ] **Step 5: Re-run verification**

Run: `node scripts/verify-site.mjs`

Expected: PASS with `Static site verification passed.`

- [ ] **Step 6: Commit final polish**

Run:

```bash
git add index.html styles.css
git commit -m "Polish static portfolio layout"
```

Expected: commit succeeds if files changed. If no files changed, skip this commit.

## Self-Review

Spec coverage:

- Static HTML/CSS architecture: Tasks 2, 3, and 4.
- SEO metadata and structured data: Tasks 2, 3, and 5.
- Project cards with screenshot placeholders, repo links, descriptions, and tags: Task 3.
- Aurora Maximalism visual direction and motion safeguards: Task 4.
- Accessibility basics: Tasks 2, 4, and 6.
- Verification: Tasks 1, 5, and 6.

Placeholder scan:

- The plan intentionally uses CSS-drawn screenshot placeholders.
- No placeholder markers or filler copy are required for shipped page content.

Scope check:

- This is one static page plus crawler metadata and a local verification script.
- No framework, CMS, analytics, live API calls, or deployment automation is included.
