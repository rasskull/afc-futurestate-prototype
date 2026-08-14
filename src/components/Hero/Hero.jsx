import { useState } from 'react';
import Button from '../ui/Button.jsx';
import SignupModal from '../SignupForm/SignupModal.jsx';
import heroImage from '../../assets/photos/hero-full.jpg';
import './Hero.css';

// Shared brand "arrow" glyph, ported from afc-core's shared icons.js /
// afc_core_arrow_icon() — same icon as FeaturedStory's and People's
// (each keeps its own inline copy rather than a shared import).
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

export default function Hero({
  backgroundImage = heroImage,
  // 'dark' (default): white heading/body over a full-bleed photo, white
  // pill CTA — the homepage/EFTC-page treatment. 'light': for lighter/
  // textured backgrounds — gradient-text heading (same size), neutral ink
  // body copy, and the CTA's own default blue-background button instead of
  // the dark theme's inverted white pill.
  theme = 'dark',
  title = <strong>A New Era</strong>,
  subtitle = 'In American Education',
  lead = 'The Education Freedom Tax Credit is a once-in-a-generation opportunity to expand scholarships for K–12 students. Starting in 2027, eligible donors can claim a dollar-for-dollar federal tax credit of up to $1,700 — so more children can reach the school that’s right for them.',
  ctaLabel = 'REGISTER YOUR INTEREST',
  // When set, the CTA is a real link (e.g. to the eligibility calculator)
  // instead of opening the "Register Your Interest" signup modal.
  ctaTo,
  modalTitle = 'Register Your Interest',
  modalCopy = 'Sign up to be notified as soon as the Education Freedom Tax Credit launches.',
  // Optional plain-text secondary link next to the primary CTA (e.g. "How
  // the EFTC Works") — omitted by default since no other Hero instance uses
  // one yet.
  secondaryCtaLabel,
  secondaryCtaTo,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className={`afc-hero afc-hero--${theme}`}>
      <div className="afc-hero__wrapper">
        <div
          className="afc-hero__bg"
          aria-hidden="true"
          style={{ '--hero-bg-image': `url(${backgroundImage})` }}
        />
        <div className="afc-wide afc-hero__container">
          <div className="afc-hero__content">
            <h1>{title}</h1>
            {subtitle && <h2>{subtitle}</h2>}
            <p className="afc-hero__lead">{lead}</p>
            {ctaLabel && (
              <div className="afc-hero__actions">
                {ctaTo ? (
                  <Button to={ctaTo} variant="solid">
                    {ctaLabel}
                  </Button>
                ) : (
                  <Button variant="solid" onClick={() => setIsModalOpen(true)}>
                    {ctaLabel}
                  </Button>
                )}
                {secondaryCtaLabel && secondaryCtaTo && (
                  <Button to={secondaryCtaTo} variant="text" className="afc-hero__secondary-cta">
                    {secondaryCtaLabel}
                    <span className="afc-hero__secondary-cta-arrow" aria-hidden="true">
                      <ArrowIcon />
                    </span>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {ctaLabel && !ctaTo && (
        <SignupModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          modalTitle={modalTitle}
          modalCopy={modalCopy}
        />
      )}
    </section>
  );
}
