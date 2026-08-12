import { Fragment } from 'react';
import donationImage from '../../assets/photos/how-it-works-donation.png';
import scholarshipImage from '../../assets/photos/how-it-works-scholarship.png';
import step3Image from '../../assets/photos/how-it-works-step3.webp';
import step4Image from '../../assets/photos/how-it-works-step4.webp';
import './HowItWorks.css';

const DEFAULT_STEPS = [
  {
    number: '1',
    heading: 'Make a Donation',
    body: 'Starting in 2027, make a charitable contribution to a qualified Scholarship Granting Organization like the AFC Scholarship Fund.',
    image: donationImage,
  },
  {
    number: '2',
    heading: 'AFC Issues a Scholarship',
    body: 'The SGO awards a scholarship to a student who needs it.',
    image: scholarshipImage,
  },
  {
    number: '3',
    heading: 'A Student Gets Funded',
    body: 'Funds help cover real education costs — tuition, tutoring, books, and more — putting the right educational opportunity within reach.',
    image: step3Image,
  },
  {
    number: '4',
    heading: 'Up to $1,700 Tax Credit',
    body: 'When you file, you claim a dollar-for-dollar federal tax credit of up to $1,700 — a credit, not a deduction.',
    image: step4Image,
  },
];

// Dollar-sign glyph used on the connector's circle nodes.
// Ported verbatim from the WP block's inline SVG
// (afc-core/blocks-src/how-it-works/render.php).
function DollarSign() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="19"
      viewBox="0 0 13 19"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4.26244 18.1208L7.26622 2.15519e-05L8.42708 0.192451L5.4233 18.3132L4.26244 18.1208ZM9.35384 6.49169C9.39187 5.91131 9.22237 5.42744 8.84536 5.04009C8.46834 4.65274 7.91176 4.39805 7.17561 4.27602C6.6754 4.1931 6.24132 4.19388 5.87337 4.27834C5.5062 4.35809 5.21026 4.5054 4.98555 4.72028C4.76555 4.93594 4.62974 5.19949 4.57811 5.51094C4.52565 5.76892 4.54237 6.00442 4.62827 6.21746C4.71889 6.43127 4.85865 6.62656 5.04753 6.80333C5.2372 6.97538 5.46264 7.13639 5.72385 7.28636C5.98584 7.43161 6.26905 7.56583 6.57348 7.68902L7.82428 8.21637C8.43316 8.46276 8.9823 8.74773 9.47171 9.07129C9.96111 9.39484 10.3707 9.76094 10.7006 10.1696C11.0304 10.5782 11.2628 11.0337 11.3977 11.5361C11.5374 12.0392 11.5595 12.5932 11.4641 13.198C11.3123 14.0844 10.9583 14.816 10.402 15.3929C9.85128 15.9659 9.1262 16.3621 8.22678 16.5815C7.33286 16.7969 6.29603 16.8069 5.1163 16.6113C3.946 16.4173 2.95643 16.0691 2.1476 15.5665C1.34348 15.0647 0.756675 14.422 0.387177 13.6383C0.0231805 12.8506 -0.0841785 11.9334 0.0651007 10.8866L3.03095 11.3783C2.98342 11.8698 3.05535 12.2987 3.24676 12.665C3.44368 13.0273 3.73608 13.3255 4.12396 13.5595C4.51735 13.7896 4.97831 13.9484 5.50683 14.036C6.02591 14.1221 6.48909 14.1213 6.89635 14.0336C7.30834 13.9467 7.6428 13.7864 7.89974 13.5526C8.15668 13.3189 8.31409 13.0274 8.37198 12.6782C8.42595 12.3526 8.37458 12.0628 8.21787 11.809C8.06588 11.5559 7.81875 11.321 7.47649 11.1042C7.13894 10.8883 6.71647 10.6728 6.20907 10.4578L4.69629 9.79973C3.52337 9.29984 2.63539 8.67506 2.03237 7.92538C1.42935 7.17571 1.21898 6.26566 1.40127 5.19525C1.54205 4.31674 1.90275 3.58864 2.48337 3.01093C3.06871 2.434 3.80716 2.03033 4.69871 1.79993C5.59026 1.56953 6.56455 1.54193 7.62159 1.71715C8.69751 1.8955 9.60607 2.23521 10.3473 2.73626C11.0932 3.2381 11.636 3.85415 11.9755 4.58439C12.3151 5.31464 12.4204 6.11271 12.2914 6.97863L9.35384 6.49169Z"
        fill="#315889"
      />
    </svg>
  );
}

export default function HowItWorks({
  heading = (
    <>
      <span className="afc-how-it-works__title-light" aria-hidden="true">
        HOW IT{' '}
      </span>
      <span className="afc-how-it-works__title-bold" aria-hidden="true">
        WORKS
      </span>
    </>
  ),
  ariaLabel = 'How it works',
  steps = DEFAULT_STEPS,
}) {
  return (
    <section className="afc-how-it-works">
      <div className="afc-how-it-works__bg-layer" aria-hidden="true" />

      <div className="afc-wide afc-how-it-works__inner">
        <h2 className="afc-how-it-works__title" aria-label={ariaLabel}>
          {heading}
        </h2>

        <div className="afc-how-it-works__grid">
          {steps.map((step) => (
            <Fragment key={step.number}>
              <div className="afc-how-it-works__col-text" data-col={step.number}>
                <div className="afc-how-it-works__number" aria-hidden="true">
                  {step.number}
                </div>
                <h3 className="afc-how-it-works__col-heading">{step.heading}</h3>
                <p className="afc-how-it-works__col-body">{step.body}</p>
              </div>

              <div className="afc-how-it-works__col-image" data-col={step.number}>
                <img
                  className="afc-how-it-works__col-img"
                  src={step.image}
                  alt=""
                  loading="lazy"
                />
              </div>
            </Fragment>
          ))}

          {/*
            Desktop-only wavy connector with dollar-sign nodes, ported from
            afc-core/blocks-src/how-it-works/render.php + style.scss.
            Hidden on mobile via CSS (see HowItWorks.css).
          */}
          <div className="afc-how-it-works__connector" aria-hidden="true">
            <svg
              className="afc-how-it-works__connector-line"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1104 80"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0.931367 5.70277C0.931367 5.70277 162.985 134.806 511.689 36.5109C860.392 -61.784 1102.62 78.1082 1102.62 78.1082"
                stroke="#0099CE"
                strokeWidth="3"
              />
            </svg>

            <div className="afc-how-it-works__dollar-node afc-how-it-works__dollar-node--1">
              <DollarSign />
            </div>
            <div className="afc-how-it-works__dollar-node afc-how-it-works__dollar-node--2">
              <DollarSign />
            </div>
            <div className="afc-how-it-works__dollar-node afc-how-it-works__dollar-node--3">
              <DollarSign />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
