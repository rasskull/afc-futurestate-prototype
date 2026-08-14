import { useState } from 'react';
import heroImage from '../../assets/photos/story-example-hero.jpg';
import './StoryHero.css';

function FacebookIcon() {
  return (
    <svg width="31" height="31" viewBox="0 0 31 31" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M31 15.5C31 23.25 25.3125 29.6875 17.875 30.8125V20H21.5L22.1875 15.5H17.875V12.625C17.875 11.375 18.5 10.1875 20.4375 10.1875H22.375V6.375C22.375 6.375 20.625 6.0625 18.875 6.0625C15.375 6.0625 13.0625 8.25 13.0625 12.125V15.5H9.125V20H13.0625V30.8125C5.625 29.6875 0 23.25 0 15.5C0 6.9375 6.9375 0 15.5 0C24.0625 0 31 6.9375 31 15.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M4 0H24C26.1875 0 28 1.8125 28 4V24C28 26.1875 26.1875 28 24 28H4C1.8125 28 0 26.1875 0 24V4C0 1.8125 1.8125 0 4 0ZM22.5625 5.25H19.625L14.6875 10.875L10.5 5.25H4.375L11.6875 14.8125L4.75 22.75H7.6875L13.0625 16.625L17.75 22.75H23.6875L16.0625 12.6875L22.5625 5.25ZM20.1875 21H18.5625L7.8125 6.9375H9.5625L20.1875 21Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M4 0H24C26.1875 0 28 1.8125 28 4V24C28 26.1875 26.1875 28 24 28H4C1.8125 28 0 26.1875 0 24V4C0 1.8125 1.8125 0 4 0ZM4.3125 10.625V24H8.5V10.625H4.3125ZM8.8125 6.4375C8.8125 5.0625 7.6875 4 6.375 4C5.0625 4 4 5.0625 4 6.4375C4 7.75 5.0625 8.8125 6.375 8.8125C7.6875 8.8125 8.8125 7.75 8.8125 6.4375ZM19.875 24H24V16.6875C24 13.0625 23.25 10.3125 19.0625 10.3125C17 10.3125 15.6875 11.4375 15.125 12.4375H15.0625V10.625H11.0625V24H15.25V17.375C15.25 15.625 15.5625 13.9375 17.6875 13.9375C19.8125 13.9375 19.875 15.9375 19.875 17.5V24Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="13" height="14" viewBox="0 0 13 14" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M9.625 0L12.25 2.625V10.5H3.5V0H9.625ZM1.75 3.5H2.1875V5.25H1.75V12.25H7V11.8125H8.75V14H0V3.5H1.75Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Real source: afc/story-hero (afc-core/mu-plugins/blocks/story-hero) — a
// distinct hero used only on individual story pages, not the shared
// wp-block-afc-hero every other page ports (full-bleed bg photo). This one
// splits into a text column (cream background) and an image column clipped
// to a diagonal shape via an inline SVG clipPath, confirmed live at
// afcscholarshipfund.org/stories/she-almost-didnt-go-.../ — stacks with the
// image on top and the clip removed below 1024px.
export default function StoryHero({
  title = 'She Almost Didn’t Go: How School Choice Helped Mya Reach a Top School',
  excerpt = 'One Mother’s Belief Changed Everything',
  image = heroImage,
  imageAlt = 'Mya, a Washington School for Girls student, smiling in her school uniform',
}) {
  const [copyLabel, setCopyLabel] = useState('COPY LINK');

  function handleCopyLink() {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setCopyLabel('COPIED!');
    setTimeout(() => setCopyLabel('COPY LINK'), 1500);
  }

  return (
    <section className="afc-story-hero">
      <div className="afc-story-hero__content">
        <h1 className="afc-story-hero__title">{title}</h1>
        <p className="afc-story-hero__excerpt">{excerpt}</p>

        <div className="afc-story-hero__share" aria-label="Share this post">
          <button type="button" className="afc-story-hero__share-btn" aria-label="Share on Facebook">
            <FacebookIcon />
          </button>
          <button type="button" className="afc-story-hero__share-btn" aria-label="Share on X">
            <XIcon />
          </button>
          <button type="button" className="afc-story-hero__share-btn" aria-label="Share on LinkedIn">
            <LinkedInIcon />
          </button>
          <button type="button" className="afc-story-hero__copy-btn" onClick={handleCopyLink}>
            <span className="afc-story-hero__copy-label">{copyLabel}</span>
            <CopyIcon />
          </button>
        </div>
      </div>

      <svg className="afc-story-hero__clip-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="afc-story-hero-clip" clipPathUnits="objectBoundingBox">
            <path d="M0.295,0 C0.295,0 0.289,0.167 0.197,0.313 L0.196,0.315 C0.111,0.451 0.0475,0.552 0.0246,0.737 C0.004,0.9 0.039,0.99 0.065,1 L1,1 L1,0 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="afc-story-hero__image-side">
        <img className="afc-story-hero__img" src={image} alt={imageAlt} loading="eager" />
        <svg
          className="afc-story-hero__mobile-divider"
          viewBox="0 0 403 61"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M119.833 19.1176C61.7751 1.22076 -5 0 -5 0L-5 84L408 84L408 44.9313C388.435 50.046 352.494 56.8045 287.843 52.8358C214.636 48.342 174.494 35.9678 120.663 19.3734L119.833 19.1176Z"
            fill="#F7F3EC"
          />
        </svg>
      </div>
    </section>
  );
}
