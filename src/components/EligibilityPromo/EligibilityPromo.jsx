import Button from '../ui/Button.jsx';
import promoArt from '../../assets/photos/cta-promo-art.webp';
import './EligibilityPromo.css';

const DEFAULT_BULLETS = [
  'Check your eligibility in under a minute',
  'See your estimated credit amount instantly',
  'Free, with no obligation',
];

// Circle-check glyph, ported verbatim from the shared afc_core_circle_check_icon()
// helper (afc-core/inc/render-helpers.php) — note this is a slightly different
// icon than NarrativeBlock's (stroke-width 2.4 vs 2.2, different path coordinates).
function CheckIcon() {
  return (
    <svg viewBox="0 0 27 27" fill="none" aria-hidden="true" focusable="false">
      <circle cx="13.5" cy="13.5" r="13.5" fill="currentColor" />
      <path
        d="M7.5 13.9L11.4 17.6L19.5 9"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function EligibilityPromo({
  eyebrow = 'Free • 30 seconds',
  heading = (
    <>
      Find out if you qualify for the Education <strong>Freedom Tax Credit</strong>
    </>
  ),
  subheading,
  lead = 'The Education Freedom Tax Credit gives eligible donors a dollar-for-dollar federal tax credit of up to $1,700 for contributions to qualifying K–12 scholarship organizations. Answer three quick questions to see if you qualify — and get an estimate of your credit.',
  bullets = DEFAULT_BULLETS,
  ctaLabel = 'Check my eligibility',
  ctaTo = '/eligibility-calculator',
  art = promoArt,
  artAlt = '',
  // Flips the art column to the left/first position at desktop (mobile
  // already renders art first), and rounds the art image + widens the
  // checklist gap — matches the real `--art-left` modifier (AFC-89 "What
  // Partners Get").
  artLeft = false,
}) {
  return (
    <section className={`afc-eligibility-promo${artLeft ? ' afc-eligibility-promo--art-left' : ''}`}>
      <div className="afc-eligibility-promo__inner">
        <div className="afc-eligibility-promo__content">
          {eyebrow && <p className="afc-eligibility-promo__eyebrow">{eyebrow}</p>}
          <h2 className="afc-eligibility-promo__heading">{heading}</h2>
          {subheading && <p className="afc-eligibility-promo__subheading">{subheading}</p>}
          {lead && <p className="afc-eligibility-promo__lead">{lead}</p>}
          {bullets && bullets.length > 0 && (
            <ul className="afc-eligibility-promo__list">
              {bullets.map((bullet) => (
                <li key={bullet} className="afc-eligibility-promo__check-item">
                  <span className="afc-eligibility-promo__check-icon">
                    <CheckIcon />
                  </span>
                  <span className="afc-eligibility-promo__check-text">{bullet}</span>
                </li>
              ))}
            </ul>
          )}
          {ctaLabel && (
            <div className="afc-eligibility-promo__button-wrap">
              <Button to={ctaTo} variant="solid">
                {ctaLabel}
              </Button>
            </div>
          )}
        </div>
        <div className="afc-eligibility-promo__art" aria-hidden={artAlt ? undefined : true}>
          <img src={art} alt={artAlt} />
        </div>
      </div>
    </section>
  );
}
