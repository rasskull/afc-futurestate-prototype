import { Link } from 'react-router-dom';
import bgTexture from '../../assets/photos/light-blue-textured-bg.jpg';
import clayPhoto from '../../assets/photos/featured-story-clay.jpg';
import './FeaturedStory.css';

// Shared brand "arrow" glyph, ported from afc-core's shared icons.js /
// afc_core_arrow_icon() — same icon used by the email-signup mobile CTA.
function ArrowIcon() {
  return (
    <svg viewBox="0 0 27.9844 23.9844" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M27.375 13.4219L17.375 23.4219C17 23.7969 16.5 23.9844 16 23.9844C15.4375 23.9844 14.9375 23.7969 14.5625 23.4219C13.75 22.6719 13.75 21.3594 14.5625 20.6094L21.125 13.9844H2C0.875 13.9844 0 13.1094 0 11.9844C0 10.9219 0.875 9.98438 2 9.98438H21.125L14.5625 3.42188C13.75 2.67188 13.75 1.35938 14.5625 0.609375C15.3125 -0.203125 16.625 -0.203125 17.375 0.609375L27.375 10.6094C28.1875 11.3594 28.1875 12.6719 27.375 13.4219Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function FeaturedStory({
  eyebrow = 'Featured Story',
  heading = 'From Falling Behind to Team Captain: How School Choice Changed Clay’s Life',
  image = clayPhoto,
  imageAlt = '',
  href = '/stories/example',
  // Per-instance override — the homepage and Stories page use two different
  // real background photos here (confirmed live: homepage's plain blue
  // texture vs. Stories' own SGO-HEADER-FULL-BLUE-TEXTURE.jpg).
  backgroundImage = bgTexture,
  // Text-color variant — NOT the same axis as Hero's `theme` prop (which
  // names the BACKGROUND's brightness). Here 'dark' (default) means dark
  // copy — ink eyebrow, structure-blue heading/arrow — for the homepage's
  // lighter background; 'light' means every text element goes solid white,
  // for this component's darker-background instances (e.g. Stories page).
  copyTheme = 'dark',
}) {
  return (
    <section
      className={`afc-featured-story afc-featured-story--${copyTheme}`}
      style={{ '--featured-story-bg': `url(${backgroundImage})` }}
    >
      <Link className="afc-featured-story__wrap" to={href}>
        <div className="afc-featured-story__photo">
          <img className="afc-featured-story__image" src={image} alt={imageAlt} loading="lazy" />
        </div>
        <div className="afc-featured-story__content">
          <h6 className="eyebrow afc-featured-story__eyebrow">{eyebrow}</h6>
          <h3 className="afc-featured-story__heading">{heading}</h3>
          <div className="afc-featured-story__arrow" aria-hidden="true">
            <ArrowIcon />
          </div>
        </div>
      </Link>
    </section>
  );
}
