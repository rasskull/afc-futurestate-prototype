---
name: sync-live-content
description: Check this React prototype's already-ported page copy and story/article listings against the current live WordPress site (afcscholarshipfund.org), and report what's drifted since each page was originally built. Use this whenever the user asks to "check the live site for updates," "sync content," "see if anything changed," "pull in new stories," or wants to re-verify a previously-built page still matches its live source. This is the maintenance counterpart to the original page-build workflow (documented in project memory) — use it for keeping already-ported pages current, not for porting a brand-new page for the first time.
---

# Syncing prototype content against the live site

## What this checks, and what it doesn't

- **Page copy drift**: for each of the 7 already-built pages, has the live WordPress content (headings, body copy, button labels) changed since it was ported?
- **Structural changes**: has a whole section been added, removed, or reordered on a page since it was ported? Handled separately from copy drift — see its own section below, since it needs different (higher-effort, always-explicit-approval) handling.
- **Story/article list changes**: has the live site's `stories` or `articles` custom-post-type content added new entries, or dropped ones this app currently references?
- **Not in scope**: porting a page that doesn't exist in this app yet (that's the normal page-build workflow — research live DOM, extend/build components, wire a route — not this), and full visual-fidelity re-verification unless something you find here specifically warrants it.

## Known deliberate deviations — never "fix" these back to match live

At least three things in this app were intentionally changed to be DIFFERENT from the live site, not a porting gap:

- **The header "Donate" CTA** (`src/components/Header/MainNav.jsx`) — this was originally ported to match live as "Get Updates" (opening the signup modal), then explicitly changed by the user to "Donate" (a real `<Link to="/donate">`) as a deliberate product decision, ahead of a not-yet-built donation flow. Confirmed live still reads "Get Updates" as of 2026-08-12. If it still does when you check, that is **not** a finding — do not report it as drift, and do not suggest reverting it. This specific element is intentionally out of sync with live going forward.
- **The footer "Donate" link** (`src/components/Footer/Footer.jsx`) — a different kind of deviation from the header's: the live site's footer has **no CTA-equivalent at all** (confirmed live: just legal links — Privacy Policy, Mobile Terms and Conditions, Terms of Use, no button/link resembling "Donate" or "Get Updates" anywhere in the footer, as of 2026-08-12). This "Donate" link was added to the footer from scratch, matching the header CTA's own destination, purely as a deliberate product decision — not a porting gap to fill and not something to remove because live's footer "doesn't have it." If a future check notices the footer has a link live doesn't, that's expected, not a bug.
- The REST-API method in this skill (see below) wouldn't even surface this on its own, since `content.rendered` for a page only returns that page's own body — header/footer are a separate site-wide template, not part of any single page's content. This note matters mainly if you ever fall back to live DOM scraping (which *does* render the full page including header/footer), or if a future page-copy check is tempted to widen scope to "the whole rendered page" instead of just body content.
- **Email-signup blocks being migrated to a Donate CTA instead** — an ongoing, page-by-page product decision to pivot from email-capture toward a direct donate CTA. Two separate signup components are being replaced by two new Donate-focused siblings, same layout/decoration each time, just the form swapped for a "Donate Now" button:
  - `SignupInline.jsx` (light variant, live block type `wp-block-afc-email-signup--light`) → `DonateInline.jsx`. Migrated so far:
    - **Home** (2026-08-15): `Home.jsx` renders `DonateInline.jsx` (default heading "Change a Child's Life") where it used to render `SignupInline.jsx`'s "Be the First to Know" block.
    - **For Parents** (2026-08-15): `ForParents.jsx`'s "Get Notified When Applications Open" section is now `DonateInline.jsx` too (bare, default heading/copy — an earlier `className`-scoped 120px line-art shift was tried on this instance and then explicitly reverted the same day so its line art matches Home's unshifted default).
    - **American Heroes Fund** (2026-08-15): `AmericanHeroesFund.jsx`'s (bare) `SignupInline` instance is now `DonateInline.jsx` too — this page isn't live WordPress content (no corresponding page existed when this skill was written) so there's no live comparison to worry about here regardless, but noting it for completeness since it was the last page still rendering `SignupInline.jsx`.
  - `SignupFooter.jsx` (dark variant, live block type `wp-block-afc-email-signup--dark`) → `DonateFooter.jsx`. As of 2026-08-15, **every page that had a footer signup block now renders `DonateFooter.jsx` instead** (default heading "You Can Change a Child's Life," changed the same day from an initial "Ready to Change a Life?" draft) — `Home.jsx`, `Stories.jsx`, `HowTheEftcWorks.jsx`, `ResourceCenter.jsx`, `AboutUs.jsx`, `ForParents.jsx`, `AmericanHeroesFund.jsx`, and `ForSchools.jsx` (which keeps its own custom `schoolsEmailCaptureBg` photo via the same `backgroundImage` override prop `SignupFooter.jsx` used). This migration is complete — there is no page left rendering `SignupFooter.jsx`.

  In all these cases, live will keep showing its original signup-form content indefinitely (where a live equivalent exists at all) — that mismatch is expected. Do not report these sections as drifted, and do not suggest restoring the signup form. `SignupInline.jsx` and `SignupFooter.jsx` are both unchanged and kept intentionally (per explicit user instruction to preserve them, not delete them) even on pages where neither currently renders — don't suggest deleting either as dead code. Expect more pages to migrate over time — check which component a page file actually imports (`SignupInline`/`SignupFooter` vs. `DonateInline`/`DonateFooter`) before assuming a "Be the First to Know"- or "Be Ready On Day One"-shaped section is still live-comparable.
- **For Parents' `Hero` copy and CTA** — went through two rounds the same day (2026-08-15), so don't be surprised if an earlier memory of this section is stale:
  1. First changed to a donate-focused pitch ("Give a child access to the school that's right for them...", CTA "Donate Now" linking to `/donate`) as part of the sitewide donate-focused pivot.
  2. Explicitly reverted the same day back toward a scholarship-application focus: lead is now "Find the right school for your child — and a scholarship to help pay for it." (the first sentence of the page's original ported copy — the original's second sentence, about registering interest, was deliberately dropped), and the CTA is now a custom "APPLY FOR A SCHOLARSHIP" (opening the signup modal, retitled "Apply for a Scholarship" via `modalTitle`/`modalCopy` — not a `ctaTo` link).

  Current state (as of the second round) is what's actually live-comparable going forward. It still won't match live exactly (shortened lead, non-default CTA label/modal title) — that's intentional, not a porting gap. Do not report this as drift or suggest "restoring" either the donate-focused version or the full original two-sentence lead.
- **Home's `Hero` CTA** (2026-08-15) — `Home.jsx`'s hero CTA changed from the default "Register Your Interest" (opening the signup modal) to a real "Donate Now" link (`ctaTo="/donate"`). Title/subtitle/lead are unchanged from the original ported copy — only the CTA changed. Part of the same sitewide donate-focused pivot as the other entries above. Live still shows "Register Your Interest," and that mismatch is expected — do not report it as drift or suggest reverting it.

## Always report first — never apply changes silently

This is a hard requirement from the user, not a suggestion: run the full discovery + comparison pass, then present a structured findings summary (what changed, where, and what you'd do about it) and **wait for explicit go-ahead** before editing any file. Only apply changes once the user has confirmed which findings to act on.

## Step 0: Run the fetch script — don't re-fetch this data by hand

`scripts/fetch-live-content.mjs` does every mechanical part of data-gathering in one deterministic pass: fetches `content.rendered` for all 7 pages (plus the ordered list of each page's top-level block classes — see "Structural changes" below), fetches the full `stories`/`articles` lists (with featured images resolved), extracts the headlines currently hardcoded in each known story/article file, and computes the raw diff (`missingLocally` for the canonical list, `notFoundLive` for everything). None of that involves judgment — it's plain HTTP + regex — so it doesn't need to be redone as a string of individual tool calls each time this skill runs. It's also idempotent: same live state in, same output out, and it never touches anything under `src/`.

```bash
node .claude/skills/sync-live-content/scripts/fetch-live-content.mjs
```

Run it once at the start of a sync check. It prints a JSON summary to stdout AND writes it to `.snapshot/summary.json` (gitignored — regenerated fresh each run, safe to ignore across sessions), plus:
- `.snapshot/pages/<slug>.html` — full raw HTML per page, for Step 2's copy-drift comparison. Only `Read` the specific page you're actively comparing, not all 7 at once.
- `.snapshot/stories.json` / `.snapshot/articles.json` — full live lists (title, excerpt, link, date, image URL) for Step 3.
- `summary.pages[<i>].topLevelBlocks` — each page's ordered top-level block classes, for the "Structural changes" check below.

Check `summary.warnings` first — a non-empty array means a known file's shape changed enough that the regex extraction found zero headlines, or a page slug 404'd. That's a sign this script (or the table below) needs a small update before trusting its diff for that item, not a sign of a real content problem.

The underlying REST endpoints (kept here for when the script itself needs maintenance, not for redoing its job by hand): `wp-json/wp/v2/pages?slug=<slug>&_fields=content.rendered`, `wp-json/wp/v2/stories`, `wp-json/wp/v2/articles` (a separate custom post type from stories), and `wp-json/wp/v2/media/<id>` to resolve a `featured_media` id to its `source_url`. Only fall back to live browser DOM scraping (the technique used in every prior page-build — see project memory) if these ever stop returning what's expected, e.g. the REST API gets locked down later. Don't assume that's happened; check first.

## Step 1: Discover what's actually in the codebase right now

Don't trust the table below as permanently accurate — the codebase evolves. Before comparing anything, re-derive the current state:

- List all page components: `src/pages/*/[A-Z]*.jsx` that are wired into a route in `src/routes.jsx`.
- Find story/article-card-bearing files by grepping for known patterns: `DEFAULT_STORIES`, `DEFAULT_FAQS`-style arrays in story-grid-shaped files, `StoryListingCta`, anything under `src/pages/*/StoriesGrid*`, `AllStories*`, or `src/components/FeaturedStory/`.
- Cross-check against this known map (accurate as of 2026-08-11, when this skill was written):

| Live slug | Route | Primary page file | Other local files with ported content |
|---|---|---|---|
| `home` | `/` | `src/pages/Home/Home.jsx` | `AudienceRouting.jsx`, `DonateInline.jsx` and `DonateFooter.jsx` (see deliberate deviations below — **not** `SignupInline.jsx`/`SignupFooter.jsx`, neither of which is used on this page anymore). Its `Hero` CTA is also deliberately "Donate Now" now, not matching live's "Register Your Interest" (see deliberate deviations below). |
| `stories` | `/stories` | `src/pages/Stories/Stories.jsx` | `AllStories.jsx` (**the canonical full story list** — this is the one that should track the live `stories` post type most closely), `FeaturedStory` (light theme, custom bg). Footer is `DonateFooter.jsx`, not `SignupFooter.jsx` (see deliberate deviations below). |
| `how-the-eftc-works` | `/how-it-works` | `src/pages/HowTheEftcWorks/HowTheEftcWorks.jsx` | `FeaturedArticlesBlue.jsx` (fixed 2026-08-11 — now points at 3 real live `articles` entries, deliberately chosen NOT to overlap with `StoriesGrid.jsx`'s own list below; see project memory for the two-attempt story), `StoriesGrid.jsx` ("More to Explore" — a curated subset of `articles`, despite the filename, not the full list). Footer is `DonateFooter.jsx`, not `SignupFooter.jsx` (see deliberate deviations below). |
| `resource-center` | `/resource-center` | `src/pages/ResourceCenter/ResourceCenter.jsx` | `ResourceTools.jsx`, `DownloadGuides` (shared), `StoriesGridContent.js` ("More to Explore" — deliberately a *different* curated subset of `stories` than the homepage/EFTC page, by explicit past request — don't "fix" it to match those). Footer is `DonateFooter.jsx`, not `SignupFooter.jsx` (see deliberate deviations below). |
| `about-us` | `/about` | `src/pages/AboutUs/AboutUs.jsx` | `AboutCards.jsx`, `People.jsx`. Footer is `DonateFooter.jsx`, not `SignupFooter.jsx` (see deliberate deviations below). |
| `for-parents` | `/for-parents` | `src/pages/ForParents/ForParents.jsx` | `HowScholarshipsHelp.jsx`, `WhatCanBeCovered.jsx`, `FeaturedStory` (default) — its "Get Notified When Applications Open" section is `DonateInline.jsx`, and its footer is `DonateFooter.jsx` — neither is `SignupInline.jsx`/`SignupFooter.jsx` anymore (see deliberate deviations below). Its `Hero` lead copy and CTA are also deliberately shortened/customized now (scholarship-application focus, not matching live verbatim — see deliberate deviations below). |
| `for-schools-and-sgos` | `/for-schools` | `src/pages/ForSchools/ForSchools.jsx` | `WhyPartner.jsx`, `SchoolsSgosCards.jsx`, `ProcessSteps` (shared). Footer is `DonateFooter.jsx` (with its same custom `schoolsEmailCaptureBg` photo carried over), not `SignupFooter.jsx` (see deliberate deviations below). |

Shared components (`Hero`, `EligibilityPromo`, `Faq`, `NarrativeBlock`, `Stats`, etc.) hold their *default* content as fallback props — each page passes its own overrides, so when checking a page for drift, look at what that page actually passes in, not just the shared component's defaults.

## Step 2: Page copy drift check

For each of the 7 pages, using the script's already-fetched output:

1. `Read` that page's snapshot: `.snapshot/pages/<slug>.html` (already the full server-rendered block HTML — no need to fetch it again).
2. Read the corresponding local file(s) from the table above (use `Grep`/`Read`, don't guess from memory).
3. Compare meaningfully — a changed word, a reworded sentence, a swapped stat — not just any whitespace/HTML-formatting difference, which is noise.
4. Note anything that would also need an image swap (a changed hero background, a new photo in a card) — flag the live image URL for it, but don't download it yet (see Step 3).

Remember two established gotchas from the original page-builds (still relevant here):
- **Don't trust `get_page_text`-style visual text extraction for case** — it reflects CSS `text-transform`, not the actual raw content. Since the snapshot is raw HTML (`content.rendered`), this mostly doesn't apply — but if you do fall back to browser DOM tools, use `textContent`/`outerHTML`, not a visual text dump.
- **The live site is always canonical over any WP pattern file** — not relevant here either, since you're comparing against the live site itself, not a pattern file. Just don't second-guess a real diff because it "doesn't match a pattern default" — the live content wins.

## Structural changes: sections added, removed, or reordered — handle separately from copy tweaks

This is a genuinely different category of finding from a reworded sentence, and needs different handling — don't fold it into the copy-drift check above.

**Detecting it**: `summary.pages[<i>].topLevelBlocks` (from the script) is the ordered list of top-level block class attributes on the live page — the exact same thing every original page-build discovered by hand via a live `.entry-content > *` DOM query, just fetched mechanically this time. Compare its length and block types against the sequence of components/sections the page's own `.jsx` file actually renders (read the file — this half isn't automated, since block class names don't map 1:1 to our arbitrary component names; the known-map table above is your starting reference for what maps to what).

**Three kinds, three different responses**:
1. **Added** — a block type appears live with no corresponding call in our JSX at all. This is NOT a content edit, it's scoped page-build work: check whether that block type is already ported as a shared component elsewhere in the app (reuse with this page's content) or needs a new page-local component (same research-then-build methodology as the original page-build workflow, just scoped to one section instead of a whole page). **Always ask about this separately and explicitly** — never treat it as covered by a general "yes, apply the changes" approval, since it involves real component-design decisions, not just editing existing props/text.
2. **Removed** — our JSX renders something whose corresponding live block type is gone entirely. Don't auto-delete it. It might be a deliberate, already-accepted deviation (see "Known deliberate deviations" above) or something the user wants to keep even though live moved on. Flag it and let the user decide: remove it, keep it as-is, or add it to the deviations list so future runs stop flagging it.
3. **Reordered** — the same set of block types is present on both sides, just in a different sequence. The most mechanical of the three (reordering existing JSX calls, no new component work), but still needs explicit approval before touching it — sibling components in this app sometimes have coordinated spacing/margin assumptions tied to their established order (a documented gotcha from the original page-builds), so a reorder can have visual side effects beyond "the sections are just in a different order now."

**In the report (Step 4)**: structural findings get their own clearly-labeled section, separate from copy and story-list findings. Don't let an approval of "the copy changes look good" be read as covering these too — ask about structural changes on their own, every time, even for a user who tends to approve quickly.

## Step 3: Story/article list sync

The script already computed the diff for you (`summary.fileDiffs`, or `.snapshot/summary.json`) — this step is mostly about *interpreting* it, not re-deriving it:

1. For `AllStories.jsx` (`role: "canonical-full-list"`): its `missingLocally` array IS the list of new live stories to add. Anything in `notFoundLive` for this file is a genuinely strong removal signal (the script fetches `per_page=100`, comfortably above current volume, so "not found" here isn't a pagination-window artifact) — but if it ever feels off, sanity-check by opening that story's own `link` from what you last knew it to be.
2. For the *curated subset* files (`StoriesGrid.jsx`, `StoriesGridContent.js`, `FeaturedStory`'s default — all `role: "curated-subset"`/`"single-default"`): their `missingLocally` is deliberately zeroed out by the script (curated picks are SUPPOSED to omit most live entries — that's not a finding). Only their `notFoundLive` matters: a curated pick whose title no longer matches anything live means that specific story/article reference has gone stale or been unpublished — a real break worth surfacing, unlike a merely-outdated-but-still-valid pick.
3. For any **new** card you're proposing to add: pull its `image` URL straight from `.snapshot/stories.json` / `.snapshot/articles.json` (already resolved from `featured_media`) and **reference that remote URL directly in the `image` field — do not download or `cp`/`curl` it into `src/assets/photos/`.** This is a deliberate exception to every other page-build's convention (which always vendored images locally) — it's specifically for this frequently-changing content, so the app doesn't need a new commit every time a story is published. Existing local-asset images for stories that are staying put don't need to be touched or converted.
4. If you're picking WHICH live entries to feature in a curated-subset file (not just fixing a dead one), also check what's already used elsewhere on the same page — the script's diff is per-file, so it won't catch two different sections on one page ending up with the same headline (this happened once already; caught only by looking at the rendered page, not the data diff — see project memory).

## Step 4: Report

Present findings grouped by page/section, each with: what's live now vs. what's in the code, and what file(s) would need to change. For story-list changes, list additions and removals separately, and call out which are "confirmed gone" vs. "just outside the fetch window, double-check." **Structural findings (added/removed/reordered sections) get their own separate, clearly-labeled group in the report** — never mixed into the copy or story-list lists, and never covered by a single blanket approval of "the other changes." Wait for the user's go-ahead on each group — they may want to accept some findings and skip others; don't treat the report as all-or-nothing.

## Step 5: Apply approved changes

Once told what to apply, follow the same discipline every prior page-build used: edit the specific files identified, then run the standard build → dev-server screenshot pass (desktop + mobile) → `read_console_messages` check → cleanup (`rm -rf dist`, kill the dev server) before considering it done. If the screenshot tool goes blank at a non-zero scroll position, that's the known screenshot-scroll-bug — resize the viewport very tall and re-navigate fresh rather than fighting it with `scrollTo`.
