import { useDonationFlow } from './DonationFlowContext.jsx';
import { STATE_OPTIONS, NO_PREFERENCE_LABEL } from './state-options.js';
import Dropdown from '../../components/ui/Dropdown.jsx';
import { CloseIcon } from '../../components/icons/DonationIcons.jsx';
import './DonationStep.css';
import './StateSection.css';

export default function StateSection({
  sectionRef,
  headingRef,
  isLocked,
  onSelectState,
  onClearState,
  onOpenGiftAmountModal,
}) {
  const { stateCode } = useDonationFlow();
  const isNoPreference = stateCode === 'no-preference';
  const isStateChosen = Boolean(stateCode);
  const selectedStateOption = STATE_OPTIONS.find((option) => option.value === stateCode) ?? null;
  const selectedLabel = isNoPreference ? NO_PREFERENCE_LABEL : selectedStateOption?.label;

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
          <label htmlFor="donate-state">State</label>
          {isStateChosen ? (
            <div className="afc-choose-state__selected">
              <p className="afc-choose-state__selected-name">{selectedLabel}</p>
              <button
                type="button"
                className="afc-choose-state__selected-close"
                aria-label="Clear selected state"
                onClick={onClearState}
              >
                <CloseIcon />
              </button>
            </div>
          ) : (
            <>
              <Dropdown
                id="donate-state"
                options={STATE_OPTIONS}
                value={stateCode}
                onChange={onSelectState}
                placeholder="Choose a state"
              />
              <p className="afc-choose-state__no-preference-label">No preference?</p>
              <button
                type="button"
                className="afc-choose-state__no-preference"
                onClick={() => onSelectState('no-preference')}
              >
                send my gift where it&rsquo;s most needed
              </button>
            </>
          )}
        </div>
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
