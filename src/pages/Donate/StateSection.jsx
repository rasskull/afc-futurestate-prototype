import { useDonationFlow } from './DonationFlowContext.jsx';
import { STATE_OPTIONS } from './state-options.js';
import Dropdown from '../../components/ui/Dropdown.jsx';
import GiftAmountHint from './GiftAmountHint.jsx';
import './DonationStep.css';
import './StateSection.css';

export default function StateSection({
  sectionRef,
  headingRef,
  isLocked,
  onSelectState,
  onOpenGiftAmountModal,
}) {
  const { stateCode } = useDonationFlow();
  const isNoPreference = stateCode === 'no-preference';

  return (
    <>
      <section
        className="afc-scroll-section afc-state-section"
        data-section="state"
        data-locked={isLocked || undefined}
        inert={isLocked || undefined}
        ref={sectionRef}
      >
        <div className="afc-donation-step__intro">
          <h3 className="afc-donation-step__heading" ref={headingRef}>
            CHOOSE A <strong>STATE</strong>
          </h3>
          <p className="afc-donation-step__subtext">Your gift stays within the state you choose.</p>
        </div>

        {isLocked && (
          <p className="afc-scroll-section__lock-hint">Choose a fund above to unlock this step.</p>
        )}

        <div className="afc-choose-state__field">
          <label htmlFor="donate-state">
            State <span className="afc-choose-state__required">*</span>
          </label>
          <Dropdown
            id="donate-state"
            options={STATE_OPTIONS}
            value={stateCode}
            onChange={onSelectState}
            placeholder="Choose a state"
          />
        </div>

        {isNoPreference && (
          <GiftAmountHint>
            You can now <strong>Select a Gift Amount</strong> to change a child&rsquo;s life.
          </GiftAmountHint>
        )}
      </section>

      {/* Outside .afc-scroll-section on purpose, same as School's mobile CTA
          — that element has its own left padding (the timeline gutter),
          which would otherwise keep this button from spanning the full
          container width. */}
      {isNoPreference && !isLocked && (
        <button
          type="button"
          className="afc-choose-state__cta afc-pulse"
          onClick={onOpenGiftAmountModal}
        >
          Select gift amount
        </button>
      )}
    </>
  );
}
