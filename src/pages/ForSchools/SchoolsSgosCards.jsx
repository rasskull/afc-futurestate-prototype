import Button from '../../components/ui/Button.jsx';
import schoolsImage from '../../assets/photos/schools-card-schools.webp';
import sgosImage from '../../assets/photos/schools-card-sgos.webp';
import './SchoolsSgosCards.css';

const DEFAULT_CARDS = [
  {
    key: 'schools',
    image: schoolsImage,
    alt: 'Young student smiling at her desk in a classroom',
    eyebrow: 'for schools',
    heading: (
      <>
        Grow enrollment <strong>without becoming an SGO</strong>
      </>
    ),
    body: 'You don’t need to build a scholarship granting organization. We act as the SGO, so you can focus on teaching — while new scholarship dollars and new families come to your door.',
    label: 'Partner With Us',
  },
  {
    key: 'sgos',
    image: sgosImage,
    alt: 'Teacher working with a group of children on an activity at a table',
    eyebrow: 'for sgos',
    heading: (
      <>
        Join America’s scholarship network — <strong>scale without rebuilding</strong>
      </>
    ),
    body: 'Plug into shared national infrastructure and a fundraising engine that brings new donors. Grow your impact by joining the network, not by duplicating cost.',
    label: 'Join the Network',
  },
];

// Ground truth: the real afc/promo-grid block with an .afc-section--light
// (flat white, not AudienceRouting's paper→cream split) theme, a 2-up grid,
// and a per-card eyebrow label above the heading — confirmed live the
// block's own section header (heading/intro) is empty, so it's omitted here.
export default function SchoolsSgosCards({ cards = DEFAULT_CARDS }) {
  return (
    <section className="afc-schools-cards">
      <div className="afc-wide">
        <div className="afc-schools-cards__grid">
          {cards.map((card) => (
            <div className="afc-schools-cards__card" key={card.key}>
              <img
                className="afc-schools-cards__image"
                src={card.image}
                alt={card.alt}
                loading="lazy"
              />
              <div className="afc-schools-cards__content">
                <p className="afc-schools-cards__eyebrow">{card.eyebrow}</p>
                <h3 className="afc-schools-cards__heading">{card.heading}</h3>
                <p className="afc-schools-cards__body">{card.body}</p>
                <div className="afc-schools-cards__button-wrap">
                  <Button href="#" variant="solid" onClick={(e) => e.preventDefault()}>
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
