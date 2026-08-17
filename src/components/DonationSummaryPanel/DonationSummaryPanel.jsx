import { useEffect, useRef, useState } from 'react';
import { ChevronDoubleIcon } from '../icons/DonationIcons.jsx';
import railGraphic from '../../assets/photos/default-rail-graphic.png';
import logoWhite from '../../assets/logos/afc-horizontal-white.png';
import './DonationSummaryPanel.css';

// Indexed by how many of {fund, state, school} are filled in (0-3) — driven
// purely by what's actually been selected, not by scroll position, so this
// never changes just because the page happens to be scrolled somewhere.
const PROGRESS_COPY = [
  {
    banner: (
      <>
        Less than 30 seconds for you to <strong>change a child&rsquo;s life</strong>.
      </>
    ),
    progressLabel: 'Just getting started',
    progressPercent: 0,
  },
  {
    banner: (
      <>
        <strong>One more step</strong> until your donation.
      </>
    ),
    progressLabel: '33% complete',
    progressPercent: 33,
  },
  {
    banner: (
      <>
        Almost there &mdash; <strong>your gift</strong> is nearly on its way.
      </>
    ),
    progressLabel: '66% complete',
    progressPercent: 66,
  },
  {
    banner: (
      <>
        Everything&rsquo;s set &mdash; <strong>select your gift amount</strong> to finish.
      </>
    ),
    progressLabel: '100% complete',
    progressPercent: 100,
  },
];

const MOBILE_QUERY = '(max-width: 980px)';

export default function DonationSummaryPanel({
  fund,
  stateLabel,
  schoolLabel,
  isStateLocked,
  isSchoolLocked,
  hideSchool,
  onFundRowClick,
  onStateRowClick,
  onSchoolRowClick,
  onOpenGiftAmountModal,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [peekHeight, setPeekHeight] = useState(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
  );
  const bannerRef = useRef(null);
  // "No preference" for state means there's no school step to complete —
  // treat that as done (100%) rather than stuck below full since school can
  // never be filled in.
  const filledCount = hideSchool ? 3 : [fund, stateLabel, schoolLabel].filter(Boolean).length;
  const copy = PROGRESS_COPY[filledCount];
  // Gift amount only truly requires Fund + State — School is optional.
  const isGiftAmountActive = Boolean(fund) && Boolean(stateLabel);

  // Collapse the mobile drawer before jumping to a section, so the section
  // being scrolled to is actually visible instead of hidden behind the
  // expanded full-screen sheet.
  function handleRowClick(callback) {
    return () => {
      if (isMobile) setIsExpanded(false);
      callback();
    };
  }

  // The rows/CTA body is only ever actually hidden (collapsed off-screen)
  // in the mobile bottom-sheet layout — on desktop it's always shown as a
  // static card, so aria-hidden must only apply on mobile or it wrongly
  // hides real, visible content from assistive tech and automation there.
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const handleChange = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  // Measure the banner's real rendered height so the collapsed mobile panel
  // can match it exactly — hardcoding a height risks a gap or clipped text
  // whenever viewport width or font metrics change how the text wraps. Also
  // mirrored onto the document root (not just this panel's own inline style)
  // so sibling page content can reserve exactly enough scroll clearance
  // above the collapsed drawer via the same variable.
  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return undefined;
    const observer = new ResizeObserver((entries) => {
      const height = entries[0].borderBoxSize?.[0]?.blockSize ?? entries[0].contentRect.height;
      setPeekHeight(height);
      document.documentElement.style.setProperty('--donation-panel-peek', `${height}px`);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty('--donation-panel-peek');
    };
  }, []);

  return (
    <aside
      className={`afc-donation-panel${isExpanded ? ' is-expanded' : ''}`}
      style={peekHeight ? { '--donation-panel-peek': `${peekHeight}px` } : undefined}
    >
      <div className="afc-donation-panel__banner" ref={bannerRef}>
        <button
          type="button"
          className="afc-donation-panel__toggle"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((value) => !value)}
        >
          <span className="afc-donation-panel__toggle-icon">
            <ChevronDoubleIcon className={isExpanded ? 'is-flipped' : ''} />
          </span>
          <span className="afc-donation-panel__toggle-label">
            {isExpanded ? 'Return to Fund Selection' : 'See donation details'}
          </span>
        </button>

        <div className="afc-donation-panel__banner-content">
          <p className="afc-donation-panel__banner-text">{copy.banner}</p>
          <img
            src={railGraphic}
            alt=""
            className="afc-donation-panel__rail-image afc-donation-panel__rail-image--desktop"
          />
          <p className="afc-donation-panel__progress-label">{copy.progressLabel}</p>
          <div className="afc-donation-panel__progress-track">
            <div
              className="afc-donation-panel__progress-fill"
              style={{ width: `${copy.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="afc-donation-panel__body" aria-hidden={isMobile && !isExpanded}>
        <div className="afc-donation-panel__mobile-header">
          <img
            src={logoWhite}
            alt="AFC Scholarship Fund"
            className="afc-donation-panel__mobile-logo"
          />
          <img
            src={railGraphic}
            alt=""
            className="afc-donation-panel__rail-image afc-donation-panel__rail-image--mobile"
          />
        </div>
        <div className="afc-donation-panel__rows">
          <p className="afc-donation-panel__rows-heading">Your Donation</p>

          <div className="afc-donation-panel__row">
            <p className="afc-donation-panel__row-label">Fund</p>
            <div className="afc-donation-panel__row-value">
              {fund ? (
                <>
                  <p className="is-set">{fund.name}</p>
                  <button
                    type="button"
                    className="afc-donation-panel__row-link"
                    onClick={handleRowClick(onFundRowClick)}
                  >
                    Change
                  </button>
                </>
              ) : (
                <p>Choose now</p>
              )}
            </div>
          </div>

          <div className={`afc-donation-panel__row${hideSchool ? ' afc-donation-panel__row--last' : ''}`}>
            <p className="afc-donation-panel__row-label">State</p>
            <div className="afc-donation-panel__row-value">
              {stateLabel ? (
                <>
                  <p className="is-set">{stateLabel}</p>
                  <button
                    type="button"
                    className="afc-donation-panel__row-link"
                    onClick={handleRowClick(onStateRowClick)}
                  >
                    Change
                  </button>
                </>
              ) : isStateLocked ? (
                <p className="is-locked">Choose next</p>
              ) : (
                <p>Choose now</p>
              )}
            </div>
          </div>

          {!hideSchool && (
            <div className="afc-donation-panel__row afc-donation-panel__row--last">
              <p className="afc-donation-panel__row-label">School</p>
              <div className="afc-donation-panel__row-value">
                {schoolLabel ? (
                  <>
                    <p className="is-set">{schoolLabel}</p>
                    <button
                      type="button"
                      className="afc-donation-panel__row-link"
                      onClick={handleRowClick(onSchoolRowClick)}
                    >
                      Change
                    </button>
                  </>
                ) : isSchoolLocked ? (
                  <p className="is-locked">Choose next (optional)</p>
                ) : (
                  <p>
                    <button
                      type="button"
                      className="afc-donation-panel__row-link"
                      onClick={handleRowClick(onSchoolRowClick)}
                    >
                      Choose now
                    </button>
                    <span className="afc-donation-panel__row-optional"> (optional)</span>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {isGiftAmountActive ? (
          <button
            type="button"
            className="afc-donation-panel__cta is-active afc-pulse"
            onClick={onOpenGiftAmountModal}
          >
            Select gift amount
          </button>
        ) : (
          <button type="button" className="afc-donation-panel__cta" disabled>
            Select gift amount
          </button>
        )}
      </div>
    </aside>
  );
}
