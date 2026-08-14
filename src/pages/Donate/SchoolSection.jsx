import { useDonationFlow } from './DonationFlowContext.jsx';
import { STATE_OPTIONS } from './state-options.js';
import { findSchool } from '../../data/schools.js';
import SchoolSearch from './SchoolSearch.jsx';
import GiftAmountHint from './GiftAmountHint.jsx';
import './DonationStep.css';
import './SchoolSection.css';

export default function SchoolSection({
  sectionRef,
  headingRef,
  isLocked,
  onSelectSchool,
  onOpenGiftAmountModal,
}) {
  const { stateCode, schoolId } = useDonationFlow();
  const selectedState = STATE_OPTIONS.find((option) => option.value === stateCode) || null;
  const selectedSchool = findSchool(stateCode, schoolId);

  return (
    <>
      <section
        className="afc-scroll-section afc-school-section"
        data-section="school"
        data-locked={isLocked || undefined}
        inert={isLocked || undefined}
        ref={sectionRef}
      >
        <div className="afc-donation-step__intro">
          <h3 className="afc-donation-step__heading" ref={headingRef}>
            CHOOSE A <strong>SCHOOL</strong>
          </h3>
          <p className="afc-donation-step__subtext">
            You can choose to direct your gift to a specific school, or let AFC send it where it&rsquo;s
            needed most.
          </p>
        </div>

        {isLocked && (
          <p className="afc-scroll-section__lock-hint">
            Choose a fund and state above to unlock this step.
          </p>
        )}

        <div className="afc-choose-school__field">
          <p className="afc-choose-school__label">School (optional)</p>
          <SchoolSearch
            stateCode={selectedState?.value}
            stateName={selectedState?.label || 'State'}
            value={schoolId}
            onChange={(school) => onSelectSchool(school ? school.id : null)}
          />
        </div>

        <GiftAmountHint>
          {selectedSchool ? (
            <>
              You can now <strong>Select a Gift Amount</strong> to change a child&rsquo;s life.
            </>
          ) : (
            <>
              If you&rsquo;re not choosing a school, you can <strong>Select Gift Amount</strong> to change a
              child&rsquo;s life.
            </>
          )}
        </GiftAmountHint>
      </section>

      {/* Outside .afc-scroll-section on purpose — that element has its own
          left padding (the timeline gutter), which would otherwise keep
          this button from spanning the full container width. */}
      {!isLocked && (
        <button
          type="button"
          className="afc-choose-school__cta afc-pulse"
          onClick={onOpenGiftAmountModal}
        >
          Select gift amount
        </button>
      )}
    </>
  );
}
