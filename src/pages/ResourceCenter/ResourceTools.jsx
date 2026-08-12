import Button from '../../components/ui/Button.jsx';
import eligibilityImage from '../../assets/photos/resource-eligibility-calculator.webp';
import impactImage from '../../assets/photos/resource-impact-calculator.webp';
import './ResourceTools.css';

const DEFAULT_CARDS = [
  {
    key: 'eligibility',
    image: eligibilityImage,
    alt: 'A young student writing at her desk in a classroom',
    heading: (
      <>
        <strong>Eligibility</strong>
        <br />
        Calculator
      </>
    ),
    body: 'The Education Freedom Tax Credit gives eligible donors a dollar-for-dollar federal tax credit of up to $1,700 for contributions to qualifying K–12 scholarship organizations.',
    checklist: [
      'Check your eligibility in under a minute',
      'See your estimated credit amount instantly',
      'Free, with no obligation',
    ],
    to: '/eligibility-calculator',
    label: 'Find Out If You Qualify',
  },
  {
    key: 'impact',
    image: impactImage,
    alt: 'A teacher helping a group of students at a table',
    heading: (
      <>
        <strong>Impact</strong>
        <br />
        Calculator
      </>
    ),
    body: 'See exactly how the Education Freedom Tax Credit moves through your finances — when your contribution goes out, when your credit comes back, and what it really costs you over 12 months.',
    checklist: ['Enter your tax profile', 'Unlock your results', 'See your cash flow'],
    to: '/impact-calculator',
    label: 'See My Cash Flow',
  },
];

// Circle-check glyph — same ported afc_core_circle_check_icon() helper used by
// EligibilityPromo (src/components/EligibilityPromo/EligibilityPromo.jsx).
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

// Page-local copy of Home/AudienceRouting's 2-card grid (same card shell,
// image crop, gradient card heading, bottom-pinned button) with a new
// section header above the cards and a circle-check checklist inserted into
// each card's body — matching the live Resource Center's "Tools to Help You
// Give Smarter" section content (confirmed live: two calculator cards, each
// with a checklist). The real live section is actually a bespoke
// `.afc-resource-tools`/`.afc-resource-card` block, not a copy of the
// for-parents/for-schools promo-grid — but the user explicitly asked for a
// copy of that homepage block's visual style, so this intentionally does not
// chase the real section's own CSS.
export default function ResourceTools({
  heading = (
    <>
      Tools to <strong>Help You Give</strong> Smarter
    </>
  ),
  intro = 'Find out if you qualify, see exactly what it costs you, and explore every resource — in under two minutes.',
  cards = DEFAULT_CARDS,
}) {
  return (
    <section className="afc-resource-tools">
      <div className="afc-wide">
        <div className="afc-resource-tools__header">
          <h2 className="afc-resource-tools__title">{heading}</h2>
          {intro && <p className="afc-resource-tools__intro">{intro}</p>}
        </div>

        <div className="afc-resource-tools__grid">
          {cards.map((card) => (
            <div className="afc-resource-tools__card" key={card.key}>
              <img
                className="afc-resource-tools__image"
                src={card.image}
                alt={card.alt}
                loading="lazy"
              />
              <div className="afc-resource-tools__content">
                <h3 className="afc-resource-tools__heading">{card.heading}</h3>
                <p className="afc-resource-tools__body">{card.body}</p>
                <ul className="afc-resource-tools__checklist">
                  {card.checklist.map((item) => (
                    <li key={item} className="afc-resource-tools__check-item">
                      <span className="afc-resource-tools__check-icon">
                        <CheckIcon />
                      </span>
                      <span className="afc-resource-tools__check-text">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="afc-resource-tools__button-wrap">
                  <Button to={card.to} variant="solid">
                    {card.label}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
