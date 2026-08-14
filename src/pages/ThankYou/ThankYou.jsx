import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import railGraphic from '../../assets/photos/default-rail-graphic.png';
import goldStarFamilyImage from '../../assets/photos/story-gold-star-family.jpg';
import kingdomLifeAcademyImage from '../../assets/photos/story-kingdom-life-academy.jpg';
import resourceEligibilityImage from '../../assets/photos/resource-eligibility-calculator.webp';
import './ThankYou.css';

// Figma: node-id 20966-28621 (standard), 20971-29145 (give-again),
// 20971-29387 (remaining-credit), 20999-2567 (mobile reference — matches
// the remaining-credit variant's content). All three share identical
// markup except the CTA box on the right, which this ?variant= query
// param swaps between.
const VALID_VARIANTS = ['standard', 'give-again', 'remaining-credit'];

const TIMELINE_STEPS = [
  {
    heading: 'Now',
    body: 'Your donor portal is ready — receipt emailed and saved there for filing.',
  },
  {
    heading: 'This school year',
    body: 'Your gift becomes a scholarship — we’ll show you the impact.',
  },
  {
    heading: 'When you file (2028)',
    body: 'Claim your credit, dollar for dollar. We’ll send a reminder.',
  },
];

const KEEP_READING_STORIES = [
  {
    image: resourceEligibilityImage,
    eyebrow: 'Guides',
    title: 'How the federal scholarship tax credit actually works',
    body: 'A plain-language walk through claiming your credit at filing time.',
  },
  {
    image: goldStarFamilyImage,
    eyebrow: 'Stories',
    title: 'The family who found the right school on the third try',
    body: 'What a scholarship changed for one student in Anchorage.',
  },
  {
    image: kingdomLifeAcademyImage,
    eyebrow: 'Impact',
    title: 'Where the funds go, state by state',
    body: 'Which states are live, and how scholarships are awarded in each.',
  },
];

// Fallback shown when the page is reached with no ?amount= at all (e.g. a
// direct link, or the prototype scenarios page's standard/give-again cards).
const DEFAULT_RECEIPT_AMOUNT = 1700;

const RECEIPT = {
  fund: 'The American Promise Scholarship Fund',
  stateSchool: 'Alaska',
  organization: 'AFC Scholarship Fund · EIN 41-3421652',
  taxYear: '2027',
};

// The federal scholarship tax credit cap referenced throughout the
// remaining-credit variant's copy (Figma node-id 20971-29387).
const CREDIT_CAP = 1700;

function ShareRow() {
  const [copyLabel, setCopyLabel] = useState('Copy link');

  function handleCopyLink() {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setCopyLabel('Copied!');
    setTimeout(() => setCopyLabel('Copy link'), 1500);
  }

  return (
    <div className="afc-thank-you__share">
      <p>Tell someone:</p>
      <div className="afc-thank-you__share-buttons">
        <button type="button" className="afc-thank-you__share-icon" aria-label="Share on LinkedIn">
          in
        </button>
        <button type="button" className="afc-thank-you__share-icon" aria-label="Share on Facebook">
          f
        </button>
        <button type="button" className="afc-thank-you__share-icon" aria-label="Share on X">
          &times;
        </button>
        <button type="button" className="afc-thank-you__copy-link" onClick={handleCopyLink}>
          {copyLabel}
        </button>
      </div>
    </div>
  );
}

function CtaBox({ variant, givenAmount }) {
  if (variant === 'give-again') {
    return (
      <div className="afc-thank-you__cta-box">
        <p className="afc-thank-you__cta-eyebrow">Give again</p>
        <h2 className="afc-thank-you__cta-heading">Want to support another school?</h2>
        <p className="afc-thank-you__cta-body">
          Your details are saved — a second gift takes one step. Choose a different fund, state or
          school.
        </p>
        <Button variant="solid" to="/donate" className="afc-thank-you__cta-button">
          Start another donation
        </Button>
        <p className="afc-thank-you__cta-footnote">
          Or set yourself a yearly reminder to give again and claim the credit annually.
        </p>
      </div>
    );
  }

  if (variant === 'remaining-credit') {
    const remaining = CREDIT_CAP - givenAmount;
    const percentGiven = Math.min(100, (givenAmount / CREDIT_CAP) * 100);

    return (
      <div className="afc-thank-you__cta-box">
        <p className="afc-thank-you__cta-eyebrow">
          You have ${remaining.toLocaleString()} of credit left
        </p>
        <h2 className="afc-thank-you__cta-heading">Don&rsquo;t leave money on the table.</h2>
        <p className="afc-thank-you__cta-body">
          The federal credit covers up to ${CREDIT_CAP.toLocaleString()} per filer this year. You gave $
          {givenAmount.toLocaleString()}, so ${remaining.toLocaleString()} of your credit is still
          unused — and giving it costs you nothing at filing time.
        </p>
        <div className="afc-thank-you__progress">
          <div className="afc-thank-you__progress-track">
            <div className="afc-thank-you__progress-fill" style={{ width: `${percentGiven}%` }} />
          </div>
          <div className="afc-thank-you__progress-labels">
            <span>${givenAmount.toLocaleString()} given</span>
            <span>${CREDIT_CAP.toLocaleString()} cap</span>
          </div>
        </div>
        <Button variant="solid" to="/donate" className="afc-thank-you__cta-button">
          Give the remaining ${remaining.toLocaleString()}
        </Button>
        <p className="afc-thank-you__cta-footnote">
          Your details are saved — one step, same fund and school. Or give any amount up to $
          {remaining.toLocaleString()}.
        </p>
      </div>
    );
  }

  return (
    <div className="afc-thank-you__cta-box">
      <p className="afc-thank-you__cta-eyebrow">For next year</p>
      <h2 className="afc-thank-you__cta-heading">Make this a yearly habit?</h2>
      <p className="afc-thank-you__cta-body">
        To claim the credit annually, set yourself a yearly reminder or click the button below to set
        up the reminder in your Donor Portal.
      </p>
      <Button variant="solid" href="#" onClick={(e) => e.preventDefault()} className="afc-thank-you__cta-button">
        Yes, set up a yearly reminder for me
      </Button>
    </div>
  );
}

export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const rawVariant = searchParams.get('variant');
  const variant = VALID_VARIANTS.includes(rawVariant) ? rawVariant : 'standard';

  // Whatever amount was actually selected in the Gift Amount modal — shown
  // in the tax receipt regardless of which CTA variant is showing.
  const rawAmount = Number(searchParams.get('amount'));
  const receiptAmount = rawAmount > 0 ? rawAmount : DEFAULT_RECEIPT_AMOUNT;

  // The remaining-credit variant's own pitch only makes sense for an amount
  // under the cap — falls back to $500 for direct links with no ?amount=
  // (e.g. the prototype scenarios page's static card).
  const givenAmount = rawAmount > 0 && rawAmount < CREDIT_CAP ? rawAmount : 500;

  return (
    <div className="afc-thank-you afc-wide">
      <div className="afc-thank-you__intro">
        <p className="afc-thank-you__eyebrow">Thank you</p>
        <h1 className="afc-thank-you__heading">
          You just helped <strong>fund a student&rsquo;s</strong> education
        </h1>
      </div>

      <ShareRow />

      <p className="afc-thank-you__lede">
        Thank you, your gift has been processed. Please be sure to check your email for the receipt
        and tax documents.
      </p>

      <div className="afc-thank-you__columns">
        <div className="afc-thank-you__receipt">
          <img src={railGraphic} alt="" className="afc-thank-you__receipt-banner" />
          <div className="afc-thank-you__receipt-body">
            <p className="afc-thank-you__receipt-title">Your tax receipt</p>

            <div className="afc-thank-you__receipt-row">
              <p>Amount</p>
              <p>${receiptAmount.toLocaleString()}</p>
            </div>
            <div className="afc-thank-you__receipt-row">
              <p>Fund</p>
              <p>{RECEIPT.fund}</p>
            </div>
            <div className="afc-thank-you__receipt-row">
              <p>State/School</p>
              <p>{RECEIPT.stateSchool}</p>
            </div>
            <div className="afc-thank-you__receipt-row">
              <p>Organization</p>
              <p>{RECEIPT.organization}</p>
            </div>
            <div className="afc-thank-you__receipt-row afc-thank-you__receipt-row--last">
              <p>Tax year</p>
              <p>{RECEIPT.taxYear}</p>
            </div>

            <p className="afc-thank-you__receipt-note">
              Your receipt and tax documents live in your donor portal — ready for your CPA.
            </p>

            <Button variant="solid" href="#" onClick={(e) => e.preventDefault()} className="afc-thank-you__receipt-cta">
              Go to your donor portal
            </Button>
          </div>
        </div>

        <div className="afc-thank-you__side">
          <ol className="afc-thank-you__timeline">
            {TIMELINE_STEPS.map((step) => (
              <li key={step.heading} className="afc-thank-you__timeline-step">
                <span className="afc-thank-you__timeline-dot" />
                <div>
                  <h3>{step.heading}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <CtaBox variant={variant} givenAmount={givenAmount} />
        </div>
      </div>

      <div className="afc-thank-you__stories">
        <div className="afc-thank-you__stories-intro">
          <p className="afc-thank-you__stories-eyebrow">Keep reading</p>
          <h2 className="afc-thank-you__stories-heading">
            How your gift works, and <strong>who it reaches</strong>
          </h2>
          <p className="afc-thank-you__stories-subheading">
            Stay informed with our latest articles, news, and scholarship stories.
          </p>
        </div>

        <div className="afc-thank-you__stories-grid">
          {KEEP_READING_STORIES.map((story) => (
            <a
              key={story.title}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="afc-thank-you__story-card"
            >
              <div className="afc-thank-you__story-image-wrap">
                <img src={story.image} alt="" loading="lazy" />
              </div>
              <p className="afc-thank-you__story-eyebrow">{story.eyebrow}</p>
              <h3 className="afc-thank-you__story-title">{story.title}</h3>
              <p className="afc-thank-you__story-body">{story.body}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
