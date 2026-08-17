import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDonationFlow } from './DonationFlowContext.jsx';
import { FUNDS } from './funds-data.js';
import { STATE_OPTIONS } from './state-options.js';
import { findSchool } from '../../data/schools.js';
import FundSection from './FundSection.jsx';
import StateSection from './StateSection.jsx';
import SchoolSection from './SchoolSection.jsx';
import DonationSummaryPanel from '../../components/DonationSummaryPanel/DonationSummaryPanel.jsx';
import GiftAmountModal from './GiftAmountModal.jsx';
import { LockIcon } from '../../components/icons/DonationIcons.jsx';
import './DonationStep.css';
import './DonateScrollFlow.css';

export default function DonateScrollFlow() {
  const location = useLocation();
  const { fundId, setFundId, stateCode, setStateCode, schoolId, setSchoolId } = useDonationFlow();

  const fundRef = useRef(null);
  const stateRef = useRef(null);
  const schoolRef = useRef(null);
  const sectionRefs = { fund: fundRef, state: stateRef, school: schoolRef };

  const timelineRef = useRef(null);
  const fundHeadingRef = useRef(null);
  const stateHeadingRef = useRef(null);
  const schoolHeadingRef = useRef(null);

  const [isGiftAmountModalOpen, setIsGiftAmountModalOpen] = useState(false);
  const [timelineLine, setTimelineLine] = useState({ top: 0, height: 0 });
  const [dotPositions, setDotPositions] = useState({ fund: 0, state: 0, school: 0 });
  const didInitOnce = useRef(false);

  // A prefill link (e.g. ?fund=american-promise) makes the init effect below
  // jump the scroll position past Fund — but that jump only happens after a
  // render + several requestAnimationFrame stability checks, so without this
  // the very first paint briefly shows the page at the top before snapping
  // down, reading as a jarring flash-then-jump. Computed synchronously here
  // (mirroring the init effect's own target resolution exactly) so a normal
  // fresh visit — the common case, nothing to jump past — never pays for
  // this at all: it's ready immediately.
  const [isReady, setIsReady] = useState(() => {
    const params = new URLSearchParams(location.search);
    const fundParam = params.get('fund');
    const stateParam = params.get('state');
    const hasFund = Boolean(fundParam) && FUNDS.some((fund) => fund.id === fundParam);
    if (!hasFund) return true;
    const matchedState = stateParam
      ? STATE_OPTIONS.find((option) => option.value.toLowerCase() === stateParam.toLowerCase())
      : null;
    // No-preference resolves the whole flow with no School step left to jump
    // to, same as the init effect's own target computation.
    return matchedState?.value === 'no-preference';
  });

  const selectedFund = FUNDS.find((fund) => fund.id === fundId) || null;
  const selectedState = STATE_OPTIONS.find((option) => option.value === stateCode) || null;
  const selectedSchool = findSchool(stateCode, schoolId);
  const isStateLocked = !fundId;
  const isSchoolLocked = !fundId || !stateCode;
  // Choosing "No preference" for state means there's no school step left to
  // complete — the flow is done at that point, so School (and its circle)
  // drop out of the timeline entirely rather than staying stuck unanswered.
  const isNoPreference = stateCode === 'no-preference';

  function scrollToSection(key, { smooth = true } = {}) {
    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    sectionRefs[key].current?.scrollIntoView({
      behavior: smooth && !prefersReducedMotion ? 'smooth' : 'instant',
      block: 'start',
    });
  }

  // Selecting a value can reveal new content earlier on the page (a
  // GiftAmountHint appearing, a locked section's hint text disappearing,
  // SchoolSearch syncing its prefilled query and showing results) across
  // more than one cascading re-render — a single deferred frame can still
  // land short. Poll the target's absolute position each frame until it
  // stops moving between two consecutive frames, then scroll — robust to
  // however many render passes the change actually takes to settle.
  // onDone (used only by the init effect's prefill jump) fires right after
  // the scroll actually happens — that's the signal the page is safe to
  // reveal, having landed at its final position with nothing left to jump.
  function scrollToSectionWhenStable(key, opts, stableStreak = 0, attemptsLeft = 60, onDone) {
    const el = sectionRefs[key].current;
    // Require several consecutive matching frames, not just one — a single
    // match can be a false positive between two separate cascading render
    // waves (e.g. this component resolving fund/state/school, then a child
    // like SchoolSearch syncing its own prefilled query a tick later).
    const REQUIRED_STREAK = 15;
    if (!el || attemptsLeft <= 0) {
      scrollToSection(key, opts);
      onDone?.();
      return;
    }
    const top = el.getBoundingClientRect().top + window.scrollY;
    requestAnimationFrame(() => {
      const nowTop = el.getBoundingClientRect().top + window.scrollY;
      const nextStreak = nowTop === top ? stableStreak + 1 : 0;
      if (nextStreak >= REQUIRED_STREAK) {
        scrollToSection(key, opts);
        onDone?.();
      } else {
        scrollToSectionWhenStable(key, opts, nextStreak, attemptsLeft - 1, onDone);
      }
    });
  }

  // Auto-scroll only fires the first time a section gets its initial answer
  // — checking "was this unset before this click" (read before the setter
  // runs) is what makes later edits stay put instead of re-triggering it.
  // First-time selection scrolls to the natural next step (State) — unless
  // State is already filled in ahead of time (e.g. a prefill link that sets
  // State but not Fund), in which case there's nothing left there and School
  // is the next real step. Re-selecting an already-answered Fund also jumps
  // straight to School instead of back to State — by that point State is
  // presumably already filled in too, and the goal is keeping the donor
  // moving toward finishing rather than re-visiting a step they've already
  // cleared. No-preference has no School step to land on either way.
  function handleFundSelect(fund) {
    const wasUnset = !fundId;
    setFundId(fund.id);
    if (stateCode === 'no-preference') return;
    if (wasUnset && !stateCode) {
      scrollToSectionWhenStable('state', { smooth: true });
    } else {
      scrollToSectionWhenStable('school', { smooth: true });
    }
  }

  // Every State selection — first-time or a later re-selection — scrolls to
  // School, since that's the only step left after it (no-preference being
  // the one case with no School to scroll to).
  function handleStateChange(value) {
    setStateCode(value);
    if (value !== 'no-preference') scrollToSectionWhenStable('school', { smooth: true });
  }

  // School is the last section and optional — no auto-scroll target, same
  // as the old ChooseSchool page never auto-navigating either.
  function handleSchoolChange(id) {
    setSchoolId(id);
  }

  // Lets a link into the flow pre-fill fund/state/school via GET params
  // (?fund=<id>&state=<code>&school=<id>) — for testing/demo entry points,
  // not a real query-string API. Applies valid params, then instantly
  // positions the page at the first incomplete section — all in one pass,
  // using locally-resolved values rather than waiting for a subsequent
  // re-render to reflect the applied params. This matters: with React
  // StrictMode's dev-mode double-effect-invocation, a second pass reacting
  // to fundId/stateCode as effect deps can have its scroll target computed
  // from a stale closure that fires before the real state update lands,
  // permanently marking "done" with the wrong target. Resolving everything
  // synchronously from local variables in a single guarded pass sidesteps
  // that race entirely.
  useEffect(() => {
    if (didInitOnce.current) return;
    didInitOnce.current = true;

    const params = new URLSearchParams(location.search);
    const fundParam = params.get('fund');
    const stateParam = params.get('state');
    const schoolParam = params.get('school');

    let resolvedFundId = fundId;
    if (fundParam && FUNDS.some((fund) => fund.id === fundParam)) {
      resolvedFundId = fundParam;
      setFundId(fundParam);
    }

    // Case-insensitive match rather than a blind uppercase: real state codes
    // are uppercase ("TX") but the special "no-preference" option's value is
    // lowercase, so uppercasing the param first would never match it.
    let resolvedStateCode = stateCode;
    if (stateParam) {
      const matchedState = STATE_OPTIONS.find(
        (option) => option.value.toLowerCase() === stateParam.toLowerCase()
      );
      if (matchedState) {
        resolvedStateCode = matchedState.value;
        setStateCode(matchedState.value);
      }
    }

    if (schoolParam && resolvedStateCode && findSchool(resolvedStateCode, schoolParam)) {
      setSchoolId(schoolParam);
    }

    // didInitOnce is already marked above (synchronously, before any of
    // this), so deferring the scroll itself is safe from the same
    // StrictMode race — it only ever runs once regardless of how long the
    // deferred scroll takes to actually fire.
    const target = !resolvedFundId
      ? 'fund'
      : !resolvedStateCode
        ? 'state'
        : resolvedStateCode === 'no-preference'
          ? null
          : 'school';
    // Nothing to skip past when landing on Fund itself — leave the page at
    // its natural top (showing the "Make a Donation" heading above it)
    // instead of scrolling the Fund section flush against the header. Same
    // idea when no-preference resolves the whole flow with no School step to
    // land on — target is null and there's nothing to scroll to.
    if (target && target !== 'fund') {
      scrollToSectionWhenStable(target, { smooth: false }, 0, 60, () => setIsReady(true));
    } else {
      setIsReady(true);
    }
    // Only ever runs once, regardless of what changes afterward.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Positions each circle next to its heading, and sizes the connecting
  // line to run from the Fund circle's center to the School circle's
  // center. Section content heights vary (locked hint text, fund cards
  // wrapping, search results) so this is measured from the real DOM rather
  // than assumed — a ResizeObserver on the whole timeline catches any of
  // those reflows (they all change its total height), and a resize
  // listener catches breakpoint changes. Circles are positioned from the
  // heading's own center (not a dot rendered inside it) because a locked
  // section's opacity/filter dimming applies to its whole subtree with no
  // way for a descendant to opt out — keeping the circle fully opaque means
  // keeping it outside that subtree, as a sibling instead.
  useEffect(() => {
    function measure() {
      const wrapper = timelineRef.current;
      const fundHeading = fundHeadingRef.current;
      const stateHeading = stateHeadingRef.current;
      const schoolHeading = schoolHeadingRef.current;
      // School's heading is absent once no-preference drops that section —
      // the line/dots just stop at State's center in that case instead.
      if (!wrapper || !fundHeading || !stateHeading) return;
      if (!isNoPreference && !schoolHeading) return;
      const wrapperTop = wrapper.getBoundingClientRect().top;
      const centerOf = (el) => {
        const rect = el.getBoundingClientRect();
        return rect.top + rect.height / 2 - wrapperTop;
      };
      const fundCenter = centerOf(fundHeading);
      const stateCenter = centerOf(stateHeading);
      const lastCenter = isNoPreference ? stateCenter : centerOf(schoolHeading);
      setDotPositions({ fund: fundCenter, state: stateCenter, school: lastCenter });
      setTimelineLine({ top: fundCenter, height: lastCenter - fundCenter });
    }

    measure();
    const observer = new ResizeObserver(measure);
    if (timelineRef.current) observer.observe(timelineRef.current);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [isNoPreference]);

  return (
    <>
      <div className={`afc-donate-scroll-flow afc-wide${isReady ? '' : ' is-positioning'}`}>
        <div className="afc-donate-scroll-flow__sections">
          <h1 className="afc-donation-step__heading">
            MAKE A <strong>DONATION</strong>
          </h1>
          <div className="afc-donate-scroll-flow__timeline" ref={timelineRef}>
            <div
              className="afc-timeline-line"
              style={{ top: `${timelineLine.top}px`, height: `${timelineLine.height}px` }}
            />
            <div className="afc-timeline-dot" style={{ top: `${dotPositions.fund}px` }} />
            <div
              className={`afc-timeline-dot${isStateLocked ? ' is-locked' : ''}`}
              style={{ top: `${dotPositions.state}px` }}
            />
            {!isNoPreference && (
              <div
                className={`afc-timeline-dot${isSchoolLocked ? ' is-locked' : ''}`}
                style={{ top: `${dotPositions.school}px` }}
              />
            )}
            <FundSection sectionRef={fundRef} headingRef={fundHeadingRef} onSelectFund={handleFundSelect} />
            <StateSection
              sectionRef={stateRef}
              headingRef={stateHeadingRef}
              isLocked={isStateLocked}
              onSelectState={handleStateChange}
              onOpenGiftAmountModal={() => setIsGiftAmountModalOpen(true)}
            />
            {!isNoPreference && (
              <SchoolSection
                sectionRef={schoolRef}
                headingRef={schoolHeadingRef}
                isLocked={isSchoolLocked}
                onSelectSchool={handleSchoolChange}
                onOpenGiftAmountModal={() => setIsGiftAmountModalOpen(true)}
              />
            )}
          </div>
        </div>

        <div className="afc-donate-scroll-flow__sidebar">
          <DonationSummaryPanel
            fund={selectedFund}
            stateLabel={selectedState?.label}
            schoolLabel={selectedSchool?.name}
            isStateLocked={isStateLocked}
            isSchoolLocked={isSchoolLocked}
            hideSchool={isNoPreference}
            onFundRowClick={() => scrollToSection('fund')}
            onStateRowClick={() => scrollToSection('state')}
            onSchoolRowClick={() => scrollToSection('school')}
            onOpenGiftAmountModal={() => setIsGiftAmountModalOpen(true)}
          />
        </div>

        <GiftAmountModal
          open={isGiftAmountModalOpen}
          onClose={() => setIsGiftAmountModalOpen(false)}
          fund={selectedFund}
          stateLabel={selectedState?.label}
          schoolLabel={selectedSchool?.name}
        />
      </div>

      <div className={`afc-wide afc-donate-scroll-flow__trust${isReady ? '' : ' is-positioning'}`}>
        <p className="afc-donate-scroll-flow__trust-item">
          <LockIcon className="afc-donate-scroll-flow__trust-icon" />
          Secure donation
        </p>
        <p className="afc-donate-scroll-flow__trust-item">501(c)(3) &middot; EIN 41-3421652</p>
      </div>
    </>
  );
}
