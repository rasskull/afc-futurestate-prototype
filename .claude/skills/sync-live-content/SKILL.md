---
name: sync-live-content
description: Check this React prototype's already-ported page copy and story/article listings against the current live WordPress site (afcscholarshipfund.org), and report what's drifted since each page was originally built. Use this whenever the user asks to "check the live site for updates," "sync content," "see if anything changed," "pull in new stories," or wants to re-verify a previously-built page still matches its live source. This is the maintenance counterpart to the original page-build workflow (documented in project memory) — use it for keeping already-ported pages current, not for porting a brand-new page for the first time.
---

# Syncing prototype content against the live site

## What this checks, and what it doesn't

- **Page copy drift**: for each of the 7 already-built pages, has the live WordPress content (headings, body copy, button labels, section order) changed since it was ported?
- **Story/article list changes**: has the live site's `stories` or `articles` custom-post-type content added new entries, or dropped ones this app currently references?
- **Not in scope**: porting a page that doesn't exist in this app yet (that's the normal page-build workflow — research live DOM, extend/build components, wire a route — not this), and full visual-fidelity re-verification unless something you find here specifically warrants it.

## Always report first — never apply changes silently

This is a hard requirement from the user, not a suggestion: run the full discovery + comparison pass, then present a structured findings summary (what changed, where, and what you'd do about it) and **wait for explicit go-ahead** before editing any file. Only apply changes once the user has confirmed which findings to act on.

## Method: prefer the WordPress REST API over live DOM scraping

Every prior page-build in this project scraped the live DOM directly (browser tools, `outerHTML`/`getComputedStyle` queries) because the goal then was pixel-level fidelity. For this sync check, the goal is just *text/content* drift, and the site's REST API gives that far more cheaply and reliably — confirmed working directly against the live site:

- **Pages**: `GET https://afcscholarshipfund.org/wp-json/wp/v2/pages?slug=<slug>&_fields=content.rendered` returns the full server-rendered block HTML for a page (confirmed: ~69KB for `for-schools-and-sgos`, image URLs already absolute). Parse this for text content instead of driving a browser.
- **Stories** (personal impact stories — the `/stories/*` content): `GET https://afcscholarshipfund.org/wp-json/wp/v2/stories?per_page=100&_fields=id,slug,title,excerpt,link,date,featured_media`
- **Articles** (explainer/EFTC-education content — the `/articles/*` content, a *separate* custom post type from stories): same shape, `.../wp-json/wp/v2/articles?per_page=100&_fields=...`
- **Featured image for a story/article**: the list endpoints only give a `featured_media` ID, not the URL directly — fetch it separately: `GET https://afcscholarshipfund.org/wp-json/wp/v2/media/<id>?_fields=source_url,alt_text`

Only fall back to live browser DOM scraping (the technique used in every prior page-build — see project memory) if the REST API ever stops returning what's expected — e.g. if it gets locked down later. Don't assume that's happened; check first.

## Step 1: Discover what's actually in the codebase right now

Don't trust the table below as permanently accurate — the codebase evolves. Before comparing anything, re-derive the current state:

- List all page components: `src/pages/*/[A-Z]*.jsx` that are wired into a route in `src/routes.jsx`.
- Find story/article-card-bearing files by grepping for known patterns: `DEFAULT_STORIES`, `DEFAULT_FAQS`-style arrays in story-grid-shaped files, `StoryListingCta`, anything under `src/pages/*/StoriesGrid*`, `AllStories*`, or `src/components/FeaturedStory/`.
- Cross-check against this known map (accurate as of 2026-08-11, when this skill was written):

| Live slug | Route | Primary page file | Other local files with ported content |
|---|---|---|---|
| `home` | `/` | `src/pages/Home/Home.jsx` | `AudienceRouting.jsx`, `SignupInline.jsx`, `SignupFooter.jsx` |
| `stories` | `/stories` | `src/pages/Stories/Stories.jsx` | `AllStories.jsx` (**the canonical full story list** — this is the one that should track the live `stories` post type most closely), `FeaturedStory` (light theme, custom bg) |
| `how-the-eftc-works` | `/how-it-works` | `src/pages/HowTheEftcWorks/HowTheEftcWorks.jsx` | `FeaturedArticlesBlue.jsx` (**known mismatch as of 2026-08-11**: its 3 headlines — "What Is the Education Freedom Tax Credit?", the step-by-step guide, the EFTC timeline piece — don't match ANY current entry in the live `articles` post type, confirmed by fetching it directly. It was originally built from a WP *pattern file* default, not a specific live entity, and may never have been tied to a real `articles` entry at all. Worth explicitly deciding, the first time this skill runs, whether to point it at 3 real current `articles` entries or leave it as illustrative/generic content — don't assume "sync it" is automatically the right call here without asking.), `StoriesGrid.jsx` ("More to Explore" — a curated subset of `stories`, not the full list) |
| `resource-center` | `/resource-center` | `src/pages/ResourceCenter/ResourceCenter.jsx` | `ResourceTools.jsx`, `DownloadGuides` (shared), `StoriesGridContent.js` ("More to Explore" — deliberately a *different* curated subset of `stories` than the homepage/EFTC page, by explicit past request — don't "fix" it to match those) |
| `about-us` | `/about` | `src/pages/AboutUs/AboutUs.jsx` | `AboutCards.jsx`, `People.jsx` |
| `for-parents` | `/for-parents` | `src/pages/ForParents/ForParents.jsx` | `HowScholarshipsHelp.jsx`, `WhatCanBeCovered.jsx`, `FeaturedStory` (default) |
| `for-schools-and-sgos` | `/for-schools` | `src/pages/ForSchools/ForSchools.jsx` | `WhyPartner.jsx`, `SchoolsSgosCards.jsx`, `ProcessSteps` (shared) |

Shared components (`Hero`, `EligibilityPromo`, `Faq`, `NarrativeBlock`, `Stats`, etc.) hold their *default* content as fallback props — each page passes its own overrides, so when checking a page for drift, look at what that page actually passes in, not just the shared component's defaults.

## Step 2: Page copy drift check

For each of the 7 pages:

1. Fetch `content.rendered` via the REST API (see above).
2. Strip HTML tags to get plain text per block/heading (or just read the raw HTML directly — it's not large, and preserves which text belongs to which block, e.g. `<h2 class="wp-block-afc-cta-promo__heading">`).
3. Read the corresponding local file(s) from the table above (use `Grep`/`Read`, don't guess from memory).
4. Compare meaningfully — a changed word, a reworded sentence, a swapped stat, a new/removed section — not just any whitespace/HTML-formatting difference, which is noise.
5. Note anything that would also need an image swap (a changed hero background, a new photo in a card) — flag the live image URL for it, but don't download it yet (see Step 3).

Remember two established gotchas from the original page-builds (still relevant here):
- **Don't trust `get_page_text`-style visual text extraction for case** — it reflects CSS `text-transform`, not the actual raw content. Since you're reading `content.rendered` (raw HTML) directly this time, this mostly doesn't apply — but if you do fall back to browser DOM tools, use `textContent`/`outerHTML`, not a visual text dump.
- **The live site is always canonical over any WP pattern file** — not relevant here either, since you're comparing against the live site itself, not a pattern file. Just don't second-guess a real diff because it "doesn't match a pattern default" — the live content wins.

## Step 3: Story/article list sync

1. Fetch the full current `stories` list (and `articles` list) via the REST API.
2. For `AllStories.jsx` specifically (the canonical full-list page): diff its current set of story entries against the live `stories` list by slug.
   - **New live entries not in the file** → these need new cards added.
   - **Entries in the file no longer in the live list** → flag for removal (but double-check first: fetch the story's own `link` directly — if it 404s, it's genuinely gone; if it still resolves, it may just have dropped off whatever `per_page`/ordering window you fetched, not actually be deleted — increase `per_page` or check date-sorting before concluding it's removed).
3. For the *curated subset* files (`StoriesGrid.jsx`, `StoriesGridContent.js`, `FeaturedStory`'s default) — these were deliberately hand-picked, not "latest N," so don't try to auto-refresh them to match the live latest list. Only flag something here if the specific story/article it references has actually disappeared from the live site (dead link) — that's a real break worth surfacing, unlike a merely-outdated-but-still-valid curated pick.
4. For any **new** card you're proposing to add: get its image via the two-step `featured_media` → `/media/<id>` → `source_url` lookup, and **reference that remote URL directly in the `src`/`image` field — do not download or `cp`/`curl` it into `src/assets/photos/`.** This is a deliberate exception to every other page-build's convention (which always vendored images locally) — it's specifically for this frequently-changing content, so the app doesn't need a new commit every time a story is published. Existing local-asset images for stories that are staying put don't need to be touched or converted.

## Step 4: Report

Present findings grouped by page/section, each with: what's live now vs. what's in the code, and what file(s) would need to change. For story-list changes, list additions and removals separately, and call out which are "confirmed gone" vs. "just outside the fetch window, double-check." Wait for the user's go-ahead — they may want to accept some findings and skip others; don't treat the report as all-or-nothing.

## Step 5: Apply approved changes

Once told what to apply, follow the same discipline every prior page-build used: edit the specific files identified, then run the standard build → dev-server screenshot pass (desktop + mobile) → `read_console_messages` check → cleanup (`rm -rf dist`, kill the dev server) before considering it done. If the screenshot tool goes blank at a non-zero scroll position, that's the known screenshot-scroll-bug — resize the viewport very tall and re-navigate fresh rather than fighting it with `scrollTo`.
