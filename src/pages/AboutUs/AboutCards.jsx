import mostConnectedImage from '../../assets/photos/about-card-most-connected.webp';
import broadestReachImage from '../../assets/photos/about-card-broadest-reach.webp';
import trustedStewardshipImage from '../../assets/photos/about-card-trusted-stewardship.webp';
import './AboutCards.css';

const DEFAULT_CARDS = [
  {
    key: 'most-connected',
    image: mostConnectedImage,
    alt: 'A young student picking a book from a library shelf',
    heading: (
      <>
        Most-<strong>Connected</strong>
      </>
    ),
    body: 'Powered by Odyssey, the infrastructure already moving billions in scholarship dollars to students nationwide, integrated across school types.',
  },
  {
    key: 'broadest-reach',
    image: broadestReachImage,
    alt: 'A mother helping her son with schoolwork at the kitchen table',
    heading: (
      <>
        Broadest <strong>Reach</strong>
      </>
    ),
    body: 'AFC’s footprint across the United States means your gift can reach families almost anywhere the credit is live.',
  },
  {
    key: 'trusted-stewardship',
    image: trustedStewardshipImage,
    alt: 'Young students writing at their desks in a classroom',
    heading: (
      <>
        Trusted <strong>Stewardship</strong>
      </>
    ),
    body: 'At least 90% of every qualifying donation goes to scholarships, by federal rule. Your gift does what you intend.',
  },
];

// Ground truth: this live section IS actually the real `afc/promo-grid`
// block (same block type AudienceRouting already ports for "For Parents"/
// "For Schools & SGOs"), confirmed live — but a flat cream background
// (.afc-section--cream), not AudienceRouting's paper→cream split gradient,
// a 3-up grid instead of 2-up, real card photos, and NO CTA button on any
// card (confirmed live: empty eyebrow, no button markup at all).
export default function AboutCards({
  heading = (
    <>
      Why Families and Donors
      <br />
      <strong>Choose the Network</strong>
    </>
  ),
  cards = DEFAULT_CARDS,
}) {
  return (
    <section className="afc-about-cards">
      <div className="afc-wide">
        <div className="afc-about-cards__header">
          <h2 className="afc-about-cards__title">{heading}</h2>
        </div>

        <div className="afc-about-cards__grid">
          {cards.map((card) => (
            <div className="afc-about-cards__card" key={card.key}>
              <img
                className="afc-about-cards__image"
                src={card.image}
                alt={card.alt}
                loading="lazy"
              />
              <div className="afc-about-cards__content">
                <h3 className="afc-about-cards__heading">{card.heading}</h3>
                <p className="afc-about-cards__body">{card.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
