import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../components/ui/Dropdown.jsx';
import { ShieldLockIcon } from '../../components/icons/DonationIcons.jsx';
import { states } from '../../data/states.js';
import heroImage from '../../assets/photos/fundraiseup-modal-image.png';
import afcLogo from '../../assets/logos/afc-primary-gradient.png';
import './GiftAmountModal.css';

const PRESET_AMOUNTS = [10000, 5000, 1700, 1000, 500, 250];
const DEFAULT_AMOUNT = 1700;

// Mirrors the 3-step flow (Amount → Your details → Payment) from the
// donor-journey-wireframe reference — each step's own back-link label lives
// alongside it here so both the step indicator and the back button read
// from one source of truth.
const STEPS = [
  { key: 'amount', label: 'Amount' },
  { key: 'details', label: 'Your details' },
  { key: 'payment', label: 'Payment' },
];

export default function GiftAmountModal({ open, onClose, fund, stateLabel, schoolLabel }) {
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  const [step, setStep] = useState('amount');
  const [frequency, setFrequency] = useState('once');
  const [amount, setAmount] = useState(DEFAULT_AMOUNT);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [showDedication, setShowDedication] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [contactState, setContactState] = useState(null);

  const stepIndex = STEPS.findIndex((s) => s.key === step);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Always land back on step 1 next time this opens, rather than wherever
  // the donor happened to leave off.
  useEffect(() => {
    if (!open) setStep('amount');
  }, [open]);

  function selectPreset(value) {
    setAmount(value);
    setIsCustom(false);
    setCustomAmount('');
  }

  function focusCustom() {
    if (isCustom) return;
    setCustomAmount(String(amount || ''));
    setIsCustom(true);
  }

  function handleCustomChange(e) {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCustomAmount(digits);
    setAmount(digits ? Number(digits) : 0);
  }

  // The dialog element itself spans the full viewport (see CSS) so its own
  // background shows through as the backdrop — clicking anywhere in that
  // empty space (not on the card content) has the dialog itself as the
  // click target, since a click always lands on the topmost element under
  // the pointer, which is only ever a descendant when the click is actually
  // on the card. A click that bubbles up with the dialog as its own target
  // is therefore always an "outside the cards" click.
  function handleOverlayClick(e) {
    if (e.target === dialogRef.current) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className="afc-gift-amount-modal"
      onClose={onClose}
      onCancel={onClose}
      onClick={handleOverlayClick}
    >
      <button type="button" className="afc-gift-amount-modal__close" aria-label="Close" onClick={onClose}>
        &times;
      </button>

      <div className="afc-gift-amount-modal__grid">
        <div className="afc-gift-amount-modal__intro">
          <img src={heroImage} alt="" className="afc-gift-amount-modal__hero" />
          <div className="afc-gift-amount-modal__intro-body">
            <img src={afcLogo} alt="AFC Scholarship Fund" className="afc-gift-amount-modal__org-logo" />
            <h2>Your gift changes a child&rsquo;s life.</h2>
            <p>
              AFC Scholarship Fund helps thousands of students attend the school that&rsquo;s right
              for them. It takes less than a minute to fund a scholarship today.
            </p>
            <p className="afc-gift-amount-modal__note">
              100% of your donation goes directly toward a student&rsquo;s scholarship.
            </p>
          </div>
        </div>

        <div className="afc-gift-amount-modal__form">
          <div className="afc-gift-amount-modal__scroll">
            <p className="afc-gift-amount-modal__steps">
              {STEPS.map((s, i) => (
                <span key={s.key}>
                  {i > 0 && <span className="afc-gift-amount-modal__step-sep">&middot;</span>}
                  <span
                    className={`afc-gift-amount-modal__step${i === stepIndex ? ' is-current' : ''}${
                      i < stepIndex ? ' is-done' : ''
                    }`}
                  >
                    {i + 1} {s.label}
                  </span>
                </span>
              ))}
            </p>

            {stepIndex > 0 && (
              <button
                type="button"
                className="afc-gift-amount-modal__back"
                onClick={() => setStep(STEPS[stepIndex - 1].key)}
              >
                &larr; Back to {STEPS[stepIndex - 1].label.toLowerCase()}
              </button>
            )}

            <p className="afc-gift-amount-modal__secure">
              <ShieldLockIcon className="afc-gift-amount-modal__secure-icon" />
              Secure donation
            </p>

            {step === 'amount' && (
              <>
                <div className="afc-gift-amount-modal__frequency">
                  <button
                    type="button"
                    aria-pressed={frequency === 'once'}
                    className={`afc-gift-amount-modal__frequency-tab${frequency === 'once' ? ' is-active' : ''}`}
                    onClick={() => setFrequency('once')}
                  >
                    Give once
                  </button>
                  <button
                    type="button"
                    aria-pressed={frequency === 'monthly'}
                    className={`afc-gift-amount-modal__frequency-tab${frequency === 'monthly' ? ' is-active' : ''}`}
                    onClick={() => setFrequency('monthly')}
                  >
                    Monthly
                  </button>
                </div>

                <div className="afc-gift-amount-modal__amounts">
                  {PRESET_AMOUNTS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      className={`afc-gift-amount-modal__amount${!isCustom && amount === preset ? ' is-active' : ''}`}
                      onClick={() => selectPreset(preset)}
                    >
                      ${preset.toLocaleString()}
                    </button>
                  ))}
                </div>

                <label className={`afc-gift-amount-modal__custom${isCustom ? ' is-active' : ''}`}>
                  <span className="afc-gift-amount-modal__custom-prefix">$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={isCustom ? customAmount : amount || ''}
                    onFocus={focusCustom}
                    onChange={handleCustomChange}
                    aria-label="Custom donation amount"
                  />
                  <span className="afc-gift-amount-modal__custom-currency">USD</span>
                </label>

                <div className="afc-gift-amount-modal__field">
                  <label>Your designation</label>
                  <div className="afc-gift-amount-modal__designation">
                    <p>
                      <strong>Fund:</strong> {fund?.name ?? 'Not specified'}
                    </p>
                    <p>
                      <strong>State:</strong> {stateLabel ?? 'Not specified'}
                    </p>
                    <p>
                      <strong>School:</strong> {schoolLabel ?? 'Not specified'}
                    </p>
                  </div>
                </div>

                <div className="afc-gift-amount-modal__links">
                  <button type="button" onClick={() => setShowDedication((v) => !v)}>
                    Dedicate this donation
                  </button>
                  <span aria-hidden="true">&middot;</span>
                  <button type="button" onClick={() => setShowComment((v) => !v)}>
                    Add comment
                  </button>
                </div>

                {showDedication && (
                  <input
                    type="text"
                    className="afc-gift-amount-modal__extra-field"
                    placeholder="In honor/memory of&hellip;"
                    aria-label="Dedicate this donation"
                  />
                )}
                {showComment && (
                  <textarea
                    className="afc-gift-amount-modal__extra-field"
                    placeholder="Add a comment"
                    rows={2}
                    aria-label="Add a comment"
                  />
                )}

                <button type="button" className="afc-gift-amount-modal__cta" onClick={() => setStep('details')}>
                  Continue &rarr;
                </button>
              </>
            )}

            {step === 'details' && (
              <>
                <div className="afc-gift-amount-modal__field-row">
                  <input
                    type="text"
                    className="afc-gift-amount-modal__text-input"
                    placeholder="First name"
                    aria-label="First name"
                  />
                  <input
                    type="text"
                    className="afc-gift-amount-modal__text-input"
                    placeholder="Last name"
                    aria-label="Last name"
                  />
                </div>
                <input type="email" className="afc-gift-amount-modal__text-input" placeholder="Email" aria-label="Email" />
                <input
                  type="tel"
                  className="afc-gift-amount-modal__text-input"
                  placeholder="Phone number"
                  aria-label="Phone number"
                />
                <input
                  type="text"
                  className="afc-gift-amount-modal__text-input"
                  placeholder="Street address"
                  aria-label="Street address"
                />
                <input
                  type="text"
                  className="afc-gift-amount-modal__text-input"
                  placeholder="Apt, suite, etc. (optional)"
                  aria-label="Apt, suite, etc. (optional)"
                />
                <input type="text" className="afc-gift-amount-modal__text-input" placeholder="City" aria-label="City" />
                <div className="afc-gift-amount-modal__field-row">
                  <Dropdown
                    id="gift-contact-state"
                    options={states}
                    value={contactState}
                    onChange={setContactState}
                    placeholder="State"
                  />
                  <input
                    type="text"
                    className="afc-gift-amount-modal__text-input"
                    placeholder="ZIP code"
                    aria-label="ZIP code"
                  />
                </div>

                <label className="afc-gift-amount-modal__checkbox-row">
                  <input type="checkbox" />
                  Keep me updated on my gift&rsquo;s impact and EFTC reminders
                </label>

                <button type="button" className="afc-gift-amount-modal__cta" onClick={() => setStep('payment')}>
                  Continue to payment &rarr;
                </button>
              </>
            )}

            {step === 'payment' && (
              <>
                <div className="afc-gift-amount-modal__payment-methods">
                  <button
                    type="button"
                    aria-pressed={paymentMethod === 'pay'}
                    className={`afc-gift-amount-modal__frequency-tab${paymentMethod === 'pay' ? ' is-active' : ''}`}
                    onClick={() => setPaymentMethod('pay')}
                  >
                    Pay
                  </button>
                  <button
                    type="button"
                    aria-pressed={paymentMethod === 'gpay'}
                    className={`afc-gift-amount-modal__frequency-tab${paymentMethod === 'gpay' ? ' is-active' : ''}`}
                    onClick={() => setPaymentMethod('gpay')}
                  >
                    G Pay
                  </button>
                  <button
                    type="button"
                    aria-pressed={paymentMethod === 'card'}
                    className={`afc-gift-amount-modal__frequency-tab${paymentMethod === 'card' ? ' is-active' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    Card
                  </button>
                </div>

                {paymentMethod === 'card' ? (
                  <>
                    <input
                      type="text"
                      className="afc-gift-amount-modal__text-input"
                      placeholder="Card number"
                      aria-label="Card number"
                    />
                    <div className="afc-gift-amount-modal__field-row">
                      <input
                        type="text"
                        className="afc-gift-amount-modal__text-input"
                        placeholder="MM / YY"
                        aria-label="Expiration date"
                      />
                      <input type="text" className="afc-gift-amount-modal__text-input" placeholder="CVC" aria-label="CVC" />
                    </div>
                  </>
                ) : (
                  <p className="afc-gift-amount-modal__wallet-note">
                    You&rsquo;ll finish this donation with {paymentMethod === 'pay' ? 'Apple Pay' : 'Google Pay'}.
                  </p>
                )}

                <label className="afc-gift-amount-modal__checkbox-row">
                  <input type="checkbox" />
                  Cover processing fees
                </label>

                <button
                  type="button"
                  className="afc-gift-amount-modal__cta"
                  onClick={() =>
                    navigate(
                      amount > 0 && amount < 1700
                        ? `/thank-you?variant=remaining-credit&amount=${amount}`
                        : `/thank-you?amount=${amount}`
                    )
                  }
                >
                  Donate ${amount ? amount.toLocaleString() : '0'}
                  {frequency === 'monthly' ? '/mo' : ''}
                </button>
              </>
            )}

            <p className="afc-gift-amount-modal__disclaimer">
              This is a prototype &mdash; no payment is actually processed.
            </p>
          </div>
        </div>
      </div>

      {/* Outside both cards on purpose, floating directly on the dimmed
          backdrop — matches the real Fundraise Up widget, where this row
          sits below the campaign+form pair rather than inside either one. */}
      <div className="afc-gift-amount-modal__faq-links">
        <button type="button">Is my donation secure?</button>
        <span aria-hidden="true">&middot;</span>
        <button type="button">Is this tax-deductible?</button>
        <span aria-hidden="true">&middot;</span>
        <button type="button">Report a problem</button>
      </div>
    </dialog>
  );
}
