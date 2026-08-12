import { Link } from 'react-router-dom';
import './StoryListingCta.css';

// Ported from the real afc/story-listing block's fielded CTA card
// (afc-core render.php: <article class="afc-card afc-listing-cta">). Occupies
// one cell in a story-listing 4-up grid — a background photo with a
// structure-blue scrim, a bold headline, and a pill button. Distinct from a
// regular story card: the whole tile isn't a link, only the button is.
export default function StoryListingCta({
  headline = 'Find out if you qualify for the Education Freedom Tax Credit',
  buttonLabel = 'Check now for free',
  to = '/eligibility-calculator',
  backgroundImage,
}) {
  return (
    <article
      className="afc-listing-cta"
      style={backgroundImage ? { '--afc-listing-cta-bg': `url(${backgroundImage})` } : undefined}
    >
      <span className="afc-listing-cta__overlay" aria-hidden="true" />
      <div className="afc-listing-cta__content">
        <p className="afc-listing-cta__headline">{headline}</p>
        <Link className="afc-listing-cta__button" to={to}>
          {buttonLabel}
        </Link>
      </div>
    </article>
  );
}
