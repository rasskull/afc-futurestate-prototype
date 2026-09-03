import { useDonationFlow } from './DonationFlowContext.jsx';
import { STATE_OPTIONS } from './state-options.js';
import { findSchool } from '../../data/schools.js';
import SchoolSearch from './SchoolSearch.jsx';
import { CheckIcon } from '../../components/icons/DonationIcons.jsx';
import './DonationStep.css';
import './SchoolSection.css';

export default function SchoolSection({
  sectionRef,
  headingRef,
  isLocked,
  onSelectSchool,
  onOpenGiftAmountModal,
  ctaRef,
}) {
  const { stateCode, schoolId } = useDonationFlow();
  const selectedState = STATE_OPTIONS.find((option) => option.value === stateCode) || null;
  // 'no-preference' is a sentinel schoolId (same convention as State's own
  // stateCode) — never a real TX school id, so findSchool naturally returns
  // null for it below, same as "unset".
  const isSchoolNoPreference = schoolId === 'no-preference';
  const selectedSchool = findSchool(stateCode, schoolId);
  // Gates both the CTA and the hint below — School is optional, so either
  // actually picking one OR explicitly opting out counts as "done" here.
  const isSchoolDecided = Boolean(selectedSchool) || isSchoolNoPreference;

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
          <p className="afc-choose-school__label">School</p>
          {/* key remounts this fresh (clearing any typed search text)
              whenever isSchoolNoPreference flips on — SchoolSearch owns its
              own query state internally, with no other way to reset it
              from here (same pattern as StateSearch in StateSection.jsx). */}
          <SchoolSearch
            key={isSchoolNoPreference}
            stateCode={selectedState?.value}
            stateName={selectedState?.label || 'State'}
            value={schoolId}
            onChange={(school) => onSelectSchool(school ? school.id : null)}
          />
          <button
            type="button"
            className={`afc-choose-school__no-preference-card${
              isSchoolNoPreference ? ' is-selected' : ''
            }`}
            onClick={() => onSelectSchool('no-preference')}
          >
            <p className="afc-choose-school__no-preference-card-name">No School Preference?</p>
            <div className="afc-choose-school__no-preference-card-desc-row">
              <p className="afc-choose-school__no-preference-card-desc">
                Send my gift where it&rsquo;s most needed.
              </p>
              <span
                className={`afc-choose-school__no-preference-card-selected-icon${
                  isSchoolNoPreference ? ' is-visible' : ''
                }`}
              >
                {isSchoolNoPreference && <CheckIcon />}
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* Outside .afc-scroll-section on purpose — that element has its own
          left padding (the timeline gutter), which would otherwise keep
          this button from spanning the full container width. */}
      {!isLocked && isSchoolDecided && (
        <button
          type="button"
          className="afc-choose-school__cta afc-pulse"
          ref={ctaRef}
          onClick={onOpenGiftAmountModal}
        >
          Select gift amount
        </button>
      )}
    </>
  );
}
