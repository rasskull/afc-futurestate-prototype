import { useState } from 'react';
import Button from '../ui/Button.jsx';
import SignupModal from '../SignupForm/SignupModal.jsx';
import heroImage from '../../assets/photos/hero-full.jpg';
import './Hero.css';

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
