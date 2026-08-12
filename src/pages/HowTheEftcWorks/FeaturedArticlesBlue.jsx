import articleWhatIsEftc from '../../assets/photos/article-what-is-eftc.jpg';
import articleStepByStepGuide from '../../assets/photos/article-step-by-step-guide.jpg';
import articleEftcTimeline from '../../assets/photos/article-eftc-timeline.jpg';
import './FeaturedArticlesBlue.css';

const DEFAULT_ARTICLES = [
  {
    image: articleWhatIsEftc,
    headline: 'What Is the Education Freedom Tax Credit?',
    snippet:
      'The first federal school choice tax credit in American history allows eligible taxpayers to give to a qualified scholarship organization and reduce their federal tax bill dollar-for-dollar. Here’s everything donors need to understand before they give.',
  },
  {
    image: articleStepByStepGuide,
    headline: 'How the Education Freedom Tax Credit Works: A Step-by-Step Guide',
    snippet:
      'Five steps from first dollar to federal tax credit. Here’s the complete, plain-English breakdown of how the EFTC works — and what donors need to do to make the most of it.',
  },
  {
    image: articleEftcTimeline,
    headline: 'What Happens After I Donate? Your EFTC Timeline from Gift to Tax Filing',
    snippet:
      'You’ve heard about the Education Freedom Tax Credit. You’re ready to give. But what happens next? Here’s every step — from writing the check to seeing the credit on your tax return.',
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
