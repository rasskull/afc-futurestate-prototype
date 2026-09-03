import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDonationFlow } from './DonationFlowContext.jsx';
import { FUNDS } from './funds-data.js';
import { STATE_OPTIONS, NO_PREFERENCE_LABEL } from './state-options.js';
import { findSchool } from '../../data/schools.js';
import FundSection from './FundSection.jsx';
import StateSection from './StateSection.jsx';
import SchoolSection from './SchoolSection.jsx';
import DonationSummaryPanel from '../../components/DonationSummaryPanel/DonationSummaryPanel.jsx';
import GiftAmountModal from './GiftAmountModal.jsx';
import { LockIcon } from '../../components/icons/DonationIcons.jsx';
import './DonationStep.css';
import './DonateScrollFlow.css';

// Rendered twice below (once inside .__main for desktop, once after the
// sidebar for mobile) rather than once and reordered — the two spots are
// different branches of the tree entirely (nested inside .__main's own
// flex column on desktop vs a sibling of .__sidebar on mobile), so a single
// element can't occupy both positions; each copy's own breakpoint class
// picks which one actually renders (see DonateScrollFlow.css).
function TrustRow({ className }) {
  return (
    <div className={`afc-donate-scroll-flow__trust ${className}`}>
      <p className="afc-donate-scroll-flow__trust-item">
        <LockIcon className="afc-donate-scroll-flow__trust-icon" />
        Secure donation
      </p>
      <p className="afc-donate-scroll-flow__trust-item">501(c)(3) &middot; EIN 41-3421652</p>
    </div>
  );
}

export default function DonateScrollFlow() {
  const location = useLocation();
  const { fundId, setFundId, stateCode, setStateCode, schoolId, setSchoolId } = useDonationFlow();

  const fundRef = useRef(null);
  const stateRef = useRef(null);
  const schoolRef = useRef(null);
  // Not sections — each no-preference card's own "Select gift amount" CTA
  // button, which only appears once that step is actually decided (a real
  // value picked, or the no-preference card clicked). Reused as scroll
  // targets the same way as the three real sections, but only for one
  // specific path each — clicking the respective no-preference card (see
  // handleStateChange / handleSchoolChange below).
  const stateCtaRef = useRef(null);
  const schoolCtaRef = useRef(null);
  const sectionRefs = {
    fund: fundRef,
    state: stateRef,
    school: schoolRef,
    stateCta: stateCtaRef,
    schoolCta: schoolCtaRef,
  };

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
    // "no-preference" isn't a STATE_OPTIONS entry (see the init effect's own
    // matching below for why), so it needs the same explicit check here too.
    const normalizedStateParam = stateParam?.toLowerCase();
    const matchedState = normalizedStateParam
      ? STATE_OPTIONS.find((option) => option.value.toLowerCase() === normalizedStateParam)
      : null;
    // No-preference resolves the whole flow with no School step left to jump
    // to, same as the init effect's own target computation.
    return matchedState?.value === 'no-preference' || normalizedStateParam === 'no-preference';
  });

  const selectedFund = FUNDS.find((fund) => fund.id === fundId) || null;
  // "no-preference" isn't a STATE_OPTIONS entry (it's its own standalone
  // button now — see StateSection.jsx), so it needs its own fallback here
  // for the summary panel's State row to still show a label for it.
  const selectedState =
    STATE_OPTIONS.find((option) => option.value === stateCode) ||
    (stateCode === 'no-preference' ? { value: stateCode, label: NO_PREFERENCE_LABEL } : null);
  // "no-preference" isn't a real school id (see SchoolSection.jsx), so
  // findSchool naturally returns null for it — same fallback treatment as
  // State's own no-preference above, for the summary panel's School row.
  const selectedSchool =
    findSchool(stateCode, schoolId) ||
    (schoolId === 'no-preference' ? { id: schoolId, name: NO_PREFERENCE_LABEL } : null);
  const isStateLocked = !fundId;
  const isSchoolLocked = !fundId || !stateCode;
  // Choosing "No preference" for state means there's no school step left to
  // complete — the flow is done at that point, so School (and its circle)
  // drop out of the timeline entirely rather than staying stuck unanswered.
  const isNoPreference = stateCode === 'no-preference';

  // halfwayOnDesktop: instead of scrolling all the way to the target (the
  // normal scrollIntoView behavior), stops at the midpoint between the
  // current scroll position and where the target would otherwise land —
  // used for the "no school preference" card specifically, on desktop
  // only (mobile always scrolls the full distance, same as every other
  // target). Reads the target's own scroll-margin-top so the "full
  // distance" being halved matches whatever clearance that target's CSS
  // already reserves above it, rather than duplicating that offset here.
  // fromY: the scroll position to treat as "current" — pass the value
  // captured at the moment of the click (see handleSchoolChange) rather
  // than reading window.scrollY fresh here. By the time this actually
  // runs, scrollToSectionWhenStable has already waited across several
  // animation frames for the newly-revealed content to settle — layout
  // changes during that wait (the CTA button and card appearing) could
  // otherwise shift window.scrollY out from under us before we read it,
  // halving the distance from a moved position instead of from where the
  // donor actually was when they clicked.
  function scrollToSection(key, { smooth = true, halfwayOnDesktop = false, fromY } = {}) {
    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior = smooth && !prefersReducedMotion ? 'smooth' : 'instant';
    const el = sectionRefs[key].current;
    if (!el) return;

    const isDesktop = window.matchMedia('(min-width: 981px)').matches;
    if (halfwayOnDesktop && isDesktop) {
      const scrollMarginTop = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      const currentY = fromY ?? window.scrollY;
      const targetY = el.getBoundingClientRect().top + window.scrollY - scrollMarginTop;
      window.scrollTo({ top: currentY + (targetY - currentY) / 2, behavior });
      return;
    }

    el.scrollIntoView({ behavior, block: 'start' });
  }

  // Selecting a value can reveal new content earlier on the page (a locked
  // section's hint text disappearing, SchoolSearch syncing its prefilled
  // query and showing results) across
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
    if (attemptsLeft <= 0) {
      scrollToSection(key, opts);
      onDone?.();
      return;
    }
    if (!el) {
      // The target can genuinely not exist yet at the moment this is first
      // called — e.g. switching State away from "no preference" back to a
      // real state remounts School (it's conditionally rendered out
      // entirely while no-preference is active — see
      // {!isNoPreference && <SchoolSection .../>} below), and React hasn't
      // necessarily committed that remount by the time this synchronous
      // call runs. Keep polling per frame until it exists instead of
      // bailing out on the first (pre-render) check.
      requestAnimationFrame(() => {
        scrollToSectionWhenStable(key, opts, 0, attemptsLeft - 1, onDone);
      });
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

  // Scrolls to whichever of State/School is still the next real step —
  // checked directly off the current stateCode rather than off "was Fund
  // itself unset before this click". That used to be the proxy for "has
  // State already been answered", which breaks for a fund-only prefill link
  // (?fund=...): the GET-param prefill sets fundId on mount, so by the time
  // the donor picks a fund from the cards, Fund already reads as "answered"
  // even though State has never actually been filled in — the old check
  // would then jump straight to School, skipping State entirely. Checking
  // stateCode itself is correct regardless of how Fund got its value.
  // No-preference has no School step to land on either way.
  function handleFundSelect(fund) {
    setFundId(fund.id);
    if (stateCode === 'no-preference') return;
    if (!stateCode) {
      scrollToSectionWhenStable('state', { smooth: true });
    } else {
      scrollToSectionWhenStable('school', { smooth: true });
    }
  }

  // Every State selection — first-time or a later re-selection — advances
  // to the next step. A real state scrolls to School; "no preference" (its
  // own standalone card now, not a dropdown option — see StateSection.jsx)
  // has no School step to land on, so it scrolls to its own "Select gift
  // amount" CTA instead — that's the donor's actual next action once
  // they've opted out of picking a state.
  function handleStateChange(value) {
    setStateCode(value);
    if (value === 'no-preference') {
      scrollToSectionWhenStable('stateCta', { smooth: true });
    } else {
      scrollToSectionWhenStable('school', { smooth: true });
    }
  }

  // Clears a selected state back to unset (the dropdown/no-preference
  // button reappear) — no auto-scroll here, unlike handleStateChange, since
  // clearing isn't "advancing" to anything.
  function handleStateClear() {
    setStateCode(null);
  }

  // Picking a real school still has no auto-scroll target — School is the
  // last section and optional, same as the old ChooseSchool page never
  // auto-navigating either. "No preference" is different: it's the donor
  // explicitly finishing this (optional) step, so it scrolls straight to
  // the Select Gift Amount CTA that choice just revealed.
  function handleSchoolChange(id) {
    setSchoolId(id);
    if (id === 'no-preference') {
      // Captured synchronously, right as the click happens — see the
      // fromY comment on scrollToSection above for why.
      scrollToSectionWhenStable('schoolCta', {
        smooth: true,
        halfwayOnDesktop: true,
        fromY: window.scrollY,
      });
    }
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
    // are uppercase ("TX") but "no-preference" is lowercase, so uppercasing
    // the param first would never match it. "no-preference" is no longer a
    // STATE_OPTIONS entry (it's its own standalone button now, not a
    // dropdown option — see StateSection.jsx), so it needs its own explicit
    // check here rather than relying on the STATE_OPTIONS lookup to find it.
    let resolvedStateCode = stateCode;
    if (stateParam) {
      const normalizedParam = stateParam.toLowerCase();
      const matchedState = STATE_OPTIONS.find(
        (option) => option.value.toLowerCase() === normalizedParam
      );
      if (matchedState) {
        resolvedStateCode = matchedState.value;
        setStateCode(matchedState.value);
      } else if (normalizedParam === 'no-preference') {
        resolvedStateCode = 'no-preference';
        setStateCode('no-preference');
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
    <div className={`afc-donate-scroll-flow afc-wide${isReady ? '' : ' is-positioning'}`}>
      <div className="afc-donate-scroll-flow__main">
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
              onClearState={handleStateClear}
              onOpenGiftAmountModal={() => setIsGiftAmountModalOpen(true)}
              ctaRef={stateCtaRef}
            />
            {!isNoPreference && (
              <SchoolSection
                sectionRef={schoolRef}
                headingRef={schoolHeadingRef}
                isLocked={isSchoolLocked}
                onSelectSchool={handleSchoolChange}
                onOpenGiftAmountModal={() => setIsGiftAmountModalOpen(true)}
                ctaRef={schoolCtaRef}
              />
            )}
          </div>
        </div>

        <TrustRow className="afc-donate-scroll-flow__trust--desktop-only" />
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
        />
      </div>

      <TrustRow className="afc-donate-scroll-flow__trust--mobile-only" />

      <GiftAmountModal
        open={isGiftAmountModalOpen}
        onClose={() => setIsGiftAmountModalOpen(false)}
        fund={selectedFund}
        stateLabel={selectedState?.label}
        schoolLabel={selectedSchool?.name}
      />
    </div>
  );
}
