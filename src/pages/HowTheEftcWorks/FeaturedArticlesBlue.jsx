import './FeaturedArticlesBlue.css';

// Sourced live from the `articles` custom post type (wp-json/wp/v2/articles),
// not the theme's own local assets — this content changes independently of
// the app, so images are referenced by their live URL directly rather than
// vendored into src/assets/photos/ (see .claude/skills/sync-live-content).
// Replaces an earlier illustrative placeholder set (from a stale WP pattern-
// file default). Two of those three placeholder headlines turned out to be
// near-exact matches to real articles that WERE current when this component
// was first built (April 2026) but have since aged off this page's own
// "More to Explore" grid (StoriesGrid.jsx, which already covers everything
// from ~July 2026 onward) — picked deliberately from OLDER live articles
// here specifically to avoid duplicating a headline that already appears
// twice on the same page.
const DEFAULT_ARTICLES = [
  {
    image:
      'https://afcscholarshipfund.org/wp-content/uploads/2026/07/07.13.2026-Six-Months-to-Launch_-A-Donors-Countdown-to-January-1-2027-.jpg',
    headline: 'Six Months to Launch: A Donor’s Countdown to January 1, 2027',
    snippet:
      'The most consequential date in American education philanthropy is now six months away. Between here and there sit exactly three milestones. Here’s what happens at each one and what a smart donor does about it.',
  },
  {
    image:
      'https://afcscholarshipfund.org/wp-content/uploads/2026/06/how-the-education-freedom-tax-credit-works-a-step-by-step-guide-girl-child-mom-computer-school-tax-taxes.jpg',
    headline: 'How the Education Freedom Tax Credit Works: A Step-by-Step Guide',
    snippet:
      'Five steps from first dollar to federal tax credit. Here’s the complete, plain-English breakdown of how the EFTC works — and what donors need to do to make the most of it.',
  },
  {
    image: 'https://afcscholarshipfund.org/wp-content/uploads/2026/07/07.23.2026-EFTC-timeline-key-dates.jpg',
    headline: 'The Education Freedom Tax Credit Timeline: Key Dates From Enactment to Launch',
    snippet:
      'Between enactment and the program’s actual launch, a lot happens, mostly out of public view. Here is the dated roadmap, so donors, families, and Scholarship Granting Organizations (SGOs) know exactly where things stand and what’s still ahead.',
  },
];

// Ground truth: afc/card-grid, dark "structure" background theme, 3-up
// (eftc-featured-articles.php pattern; the real block has no CTA button set,
// so it never renders one — matching this page's "hide the More button").
export default function FeaturedArticlesBlue({
  heading = (
    <>
      Featured <strong>Articles</strong>
    </>
  ),
  articles = DEFAULT_ARTICLES,
}) {
  return (
    <section className="afc-featured-articles-blue">
      <div className="afc-wide">
        <div className="afc-featured-articles-blue__header">
          <h2 className="afc-featured-articles-blue__heading">{heading}</h2>
        </div>

        <div className="afc-featured-articles-blue__grid">
          {articles.map((article) => (
            <a
              className="afc-featured-articles-blue__card"
              href="#"
              onClick={(e) => e.preventDefault()}
              key={article.headline}
            >
              <div className="afc-featured-articles-blue__image-wrap">
                <img
                  className="afc-featured-articles-blue__image"
                  src={article.image}
                  alt=""
                  loading="lazy"
                />
              </div>
              <h3 className="afc-featured-articles-blue__headline">{article.headline}</h3>
              <p className="afc-featured-articles-blue__snippet">{article.snippet}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
