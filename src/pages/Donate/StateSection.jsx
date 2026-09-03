import { useDonationFlow } from './DonationFlowContext.jsx';
import { STATE_OPTIONS } from './state-options.js';
import StateSearch from './StateSearch.jsx';
import { CloseIcon, CheckIcon } from '../../components/icons/DonationIcons.jsx';
import './DonationStep.css';
import './StateSection.css';

export default function StateSection({
  sectionRef,
  headingRef,
  isLocked,
  onSelectState,
  onClearState,
  onOpenGiftAmountModal,
  ctaRef,
}) {
  const { stateCode } = useDonationFlow();
  const isNoPreference = stateCode === 'no-preference';
  // Only a real state replaces the search field with the selected pill —
  // "no preference" instead stays on the search+card view below, with the
  // card itself just switching to a selected look (see .is-selected), so
  // the state field is left untouched either way.
  const isRealStateSelected = Boolean(stateCode) && !isNoPreference;
  const selectedStateOption = STATE_OPTIONS.find((option) => option.value === stateCode) ?? null;

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
          {isRealStateSelected ? (
            <div className="afc-choose-state__selected">
              <p className="afc-choose-state__selected-name">{selectedStateOption?.label}</p>
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
              {/* key remounts this fresh (clearing any typed search text)
                  whenever isNoPreference flips on — StateSearch owns its
                  own query state internally, with no other way to reset it
                  from here. */}
              <StateSearch key={isNoPreference} id="donate-state" onChange={onSelectState} />
              <button
                type="button"
                className={`afc-choose-state__no-preference-card${isNoPreference ? ' is-selected' : ''}`}
                onClick={() => onSelectState('no-preference')}
              >
                <p className="afc-choose-state__no-preference-card-name">No State Preference?</p>
                <div className="afc-choose-state__no-preference-card-desc-row">
                  <p className="afc-choose-state__no-preference-card-desc">
                    Send my gift where it&rsquo;s most needed.
                  </p>
                  <span
                    className={`afc-choose-state__no-preference-card-selected-icon${
                      isNoPreference ? ' is-visible' : ''
                    }`}
                  >
                    {isNoPreference && <CheckIcon />}
                  </span>
                </div>
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
          ref={ctaRef}
          onClick={onOpenGiftAmountModal}
        >
          Select gift amount
        </button>
      )}
    </>
  );
}
