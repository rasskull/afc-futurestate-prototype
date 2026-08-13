#!/usr/bin/env node
/**
 * Deterministic data-gathering pass for the sync-live-content skill.
 *
 * Everything in here is mechanical (HTTP GET + regex/JSON parsing) — no
 * judgment calls. Pulling it out of the agent's own tool-call loop means one
 * script run replaces what would otherwise be a dozen+ separate WebFetch/
 * curl calls (each costing context), and it's idempotent: same live state
 * in, same output out, safe to re-run as many times as needed (it never
 * writes to any file under src/, only to its own .snapshot/ directory).
 *
 * Usage: node .claude/skills/sync-live-content/scripts/fetch-live-content.mjs
 * Output: prints a JSON summary to stdout, and writes full per-page HTML +
 * full story/article lists to .snapshot/ (gitignored) for the agent to Read
 * selectively if it needs the full text rather than the summary.
 */

import { writeFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://afcscholarshipfund.org';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../../../../'); // .claude/skills/sync-live-content/scripts -> repo root
const SNAPSHOT_DIR = path.join(__dirname, '..', '.snapshot');

// Known page-build map (see SKILL.md's own table — keep these in sync if the
// codebase changes; this script doesn't discover new pages on its own).
const PAGES = [
  { slug: 'home', route: '/' },
  { slug: 'stories', route: '/stories' },
  { slug: 'how-the-eftc-works', route: '/how-it-works' },
  { slug: 'resource-center', route: '/resource-center' },
  { slug: 'about-us', route: '/about' },
  { slug: 'for-parents', route: '/for-parents' },
  { slug: 'for-schools-and-sgos', route: '/for-schools' },
];

// Local files whose hardcoded story/article arrays should be checked against
// the live `stories`/`articles` lists. Each uses a `headline: '...'` (or
// `heading = '...'` for the single-item FeaturedStory) field — extracted via
// regex rather than a real JS parser, since these are plain literal arrays,
// not computed data; if a file's shape changes enough to break this, the
// script will just report zero extracted items for it (see `warnings`).
const STORY_FILES = [
  { file: 'src/pages/Stories/AllStories.jsx', kind: 'stories', role: 'canonical-full-list' },
  { file: 'src/pages/HowTheEftcWorks/StoriesGrid.jsx', kind: 'articles', role: 'curated-subset' },
  { file: 'src/pages/ResourceCenter/StoriesGridContent.js', kind: 'stories', role: 'curated-subset' },
  { file: 'src/pages/HowTheEftcWorks/FeaturedArticlesBlue.jsx', kind: 'articles', role: 'curated-subset' },
  { file: 'src/components/FeaturedStory/FeaturedStory.jsx', kind: 'stories', role: 'single-default', singleField: 'heading' },
];

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json();
}

async function fetchAllPosts(restBase) {
  // per_page=100 comfortably covers current volume (~15 stories, ~25
  // articles as of 2026-08). If this org's post counts ever exceed 100,
  // add pagination here (WP sends X-WP-TotalPages) — not needed yet.
  const items = await fetchJson(
    `${SITE}/wp-json/wp/v2/${restBase}?per_page=100&_fields=id,slug,title,excerpt,link,date,featured_media`
  );
  // Resolve featured images (one extra request per item with a featured_media id).
  const withImages = await Promise.all(
    items.map(async (item) => {
      if (!item.featured_media) return { ...item, image: null };
      try {
        const media = await fetchJson(
          `${SITE}/wp-json/wp/v2/media/${item.featured_media}?_fields=source_url,alt_text`
        );
        return { ...item, image: media.source_url, imageAlt: media.alt_text || '' };
      } catch {
        return { ...item, image: null };
      }
    })
  );
  return withImages.map((item) => ({
    slug: item.slug,
    title: decodeEntities(item.title.rendered),
    excerpt: decodeEntities(stripTags(item.excerpt.rendered)).trim(),
    link: item.link,
    date: item.date,
    image: item.image,
    imageAlt: item.imageAlt,
  }));
}

function stripTags(html) {
  return html.replace(/<[^>]*>/g, '');
}

const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

// Walks content.rendered's tag structure (depth-tracked, not a full HTML
// parser — good enough for WP's well-formed Gutenberg output) and returns
// the class attribute of each TOP-LEVEL element only, in document order.
// This is the mechanical half of detecting structural page changes (a
// section added, removed, or reordered) — it mirrors exactly what every
// original page-build did by hand via a live `.entry-content > *` DOM
// query, just run against the fetched HTML string instead of a live page.
// Comparing this sequence to the page's own JSX composition still needs
// judgment (block classes don't 1:1 map to our component names), so that
// half stays with the agent — see SKILL.md's "Structural changes" section.
function extractTopLevelBlocks(html) {
  const tagRe = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^<>]*?)?)\s*(\/?)>/g;
  let depth = 0;
  const blocks = [];
  let m;
  while ((m = tagRe.exec(html))) {
    const closing = m[1] === '/';
    const tag = m[2].toLowerCase();
    const attrs = m[3] || '';
    const selfClosing = m[4] === '/' || VOID_ELEMENTS.has(tag);
    if (closing) {
      depth = Math.max(0, depth - 1);
      continue;
    }
    if (depth === 0) {
      const classMatch = attrs.match(/class=["']([^"']*)["']/);
      blocks.push(classMatch ? classMatch[1] : '(no class)');
    }
    if (!selfClosing) depth++;
  }
  return blocks;
}

function decodeEntities(str) {
  return str
    .replace(/&#8217;/g, '’')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/&#038;/g, '&');
}

function normalize(str) {
  return str.toLowerCase().replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
}

async function extractLocalHeadlines(relFile, singleField) {
  const abs = path.join(REPO_ROOT, relFile);
  let text;
  try {
    text = await readFile(abs, 'utf8');
  } catch {
    return { found: false, items: [] };
  }
  const field = singleField || 'headline';
  // Matches: headline: '...'  or  heading = '...'  (single or double quoted,
  // no escaped-quote handling needed — this codebase's copy uses typographic
  // ’ “ ” quotes, never a literal straight ' or " inside these strings).
  const re = new RegExp(`${field}\\s*[:=]\\s*['"]([^'"]*)['"]`, 'g');
  const items = [];
  let m;
  while ((m = re.exec(text))) items.push(m[1]);
  return { found: true, items };
}

async function main() {
  await mkdir(SNAPSHOT_DIR, { recursive: true });
  const warnings = [];

  // --- Pages: fetch content.rendered, write full HTML to .snapshot/pages/ ---
  await mkdir(path.join(SNAPSHOT_DIR, 'pages'), { recursive: true });
  const pageResults = [];
  for (const { slug, route } of PAGES) {
    try {
      const data = await fetchJson(
        `${SITE}/wp-json/wp/v2/pages?slug=${slug}&_fields=content.rendered`
      );
      if (!data.length) {
        warnings.push(`No page found for slug "${slug}" — check the slug is still correct.`);
        continue;
      }
      const html = data[0].content.rendered;
      const snapshotPath = path.join(SNAPSHOT_DIR, 'pages', `${slug}.html`);
      await writeFile(snapshotPath, html, 'utf8');
      const topLevelBlocks = extractTopLevelBlocks(html);
      pageResults.push({
        slug,
        route,
        bytes: html.length,
        snapshot: path.relative(REPO_ROOT, snapshotPath),
        // Ordered list of top-level block class attributes — compare this
        // against the page's own JSX composition to catch a section added,
        // removed, or reordered on live since the page was last synced.
        topLevelBlocks,
      });
    } catch (e) {
      warnings.push(`Failed to fetch page "${slug}": ${e.message}`);
    }
  }

  // --- Stories & articles: fetch full lists, write JSON ---
  const stories = await fetchAllPosts('stories');
  const articles = await fetchAllPosts('articles');
  await writeFile(path.join(SNAPSHOT_DIR, 'stories.json'), JSON.stringify(stories, null, 2));
  await writeFile(path.join(SNAPSHOT_DIR, 'articles.json'), JSON.stringify(articles, null, 2));

  // --- Local extraction + diff against live lists ---
  const fileDiffs = [];
  for (const { file, kind, role, singleField } of STORY_FILES) {
    const { found, items } = await extractLocalHeadlines(file, singleField);
    if (!found) {
      warnings.push(`Could not read ${file} — skipped in diff (file moved/renamed?).`);
      continue;
    }
    if (found && items.length === 0) {
      warnings.push(`Found ${file} but extracted zero headlines — its data shape may have changed; regex extraction in this script assumes a \`headline: '...'\` or \`heading = '...'\` pattern.`);
    }
    const liveList = kind === 'stories' ? stories : articles;
    const liveTitlesNorm = new Set(liveList.map((i) => normalize(i.title)));
    const localNorm = items.map(normalize);

    const missingLocally = liveList.filter((i) => !localNorm.includes(normalize(i.title)));
    const notFoundLive = items.filter((h) => !liveTitlesNorm.has(normalize(h)));

    fileDiffs.push({
      file,
      kind,
      role,
      localCount: items.length,
      // Only meaningful for the canonical full-list file (AllStories.jsx) —
      // curated subsets are EXPECTED to omit most live entries on purpose.
      // The agent should only treat this as a real "addition" finding for
      // role === 'canonical-full-list'; for curated subsets, use
      // `notFoundLive` (dead references) instead, per the skill's own Step 3.
      missingLocally: role === 'canonical-full-list' ? missingLocally : [],
      notFoundLive, // local headline text with no live title match — either genuinely removed, or (for curated subsets) just an intentionally-older pick; the skill decides which
    });
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    pages: pageResults,
    counts: { stories: stories.length, articles: articles.length },
    snapshotFiles: {
      stories: path.relative(REPO_ROOT, path.join(SNAPSHOT_DIR, 'stories.json')),
      articles: path.relative(REPO_ROOT, path.join(SNAPSHOT_DIR, 'articles.json')),
    },
    fileDiffs,
    warnings,
  };

  await writeFile(path.join(SNAPSHOT_DIR, 'summary.json'), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((e) => {
  console.error('fetch-live-content.mjs failed:', e);
  process.exit(1);
});
