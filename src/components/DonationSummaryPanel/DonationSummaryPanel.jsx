import { useEffect, useRef, useState } from 'react';
import railGraphic from '../../assets/photos/AFC-SF_Card-_P2_American-Promise_v4_460x142.png';
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
}) {
  const [peekHeight, setPeekHeight] = useState(null);
  const bannerRef = useRef(null);
  // "No preference" for state means there's no school step to complete —
  // treat that as done (100%) rather than stuck below full since school can
  // never be filled in.
  const filledCount = hideSchool ? 3 : [fund, stateLabel, schoolLabel].filter(Boolean).length;
  const copy = PROGRESS_COPY[filledCount];
  // Gift amount only truly requires Fund + State — School is optional. On
  // mobile this also decides which of the two views shows (see the CSS):
  // the persistent progress bar below, or the button+table further down —
  // never both. Desktop shows both at once regardless, unaffected.
  const isGiftAmountActive = Boolean(fund) && Boolean(stateLabel);

  // Measures the mobile progress bar's real rendered height so page content
  // elsewhere can reserve exactly that much bottom clearance (see
  // --donation-panel-peek in DonateScrollFlow.css/DonationStep.css) instead
  // of a hardcoded guess. The bar is CSS-hidden (not unmounted) once gift
  // amount is active, at which point ResizeObserver reports its height as 0
  // — correctly dropping that reserved clearance now that nothing is
  // actually pinned to the bottom of the screen any more.
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
      className="afc-donation-panel"
      data-gift-amount-active={isGiftAmountActive || undefined}
      style={peekHeight ? { '--donation-panel-peek': `${peekHeight}px` } : undefined}
    >
      <div className="afc-donation-panel__banner" ref={bannerRef}>
        <div className="afc-donation-panel__banner-content">
          <div className="afc-donation-panel__banner-text-wrap">
            <p className="afc-donation-panel__banner-text">{copy.banner}</p>
          </div>
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

      <div className="afc-donation-panel__body">
        <div className="afc-donation-panel__rows">
          <p className="afc-donation-panel__rows-heading">Your Donation</p>

          <div className="afc-donation-panel__row">
            <p className="afc-donation-panel__row-label">Fund</p>
            <div className="afc-donation-panel__row-value">
              {fund ? (
                <>
                  <p className="is-set">{fund.name}</p>
                  <button type="button" className="afc-donation-panel__row-link" onClick={onFundRowClick}>
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
                  <button type="button" className="afc-donation-panel__row-link" onClick={onStateRowClick}>
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
            <div className="afc-donation-panel__row afc-donation-panel__row--last afc-donation-panel__row--school">
              <p className="afc-donation-panel__row-label">School</p>
              <div className="afc-donation-panel__row-value">
                {schoolLabel ? (
                  <>
                    <p className="is-set">{schoolLabel}</p>
                    <button
                      type="button"
                      className="afc-donation-panel__row-link"
                      onClick={onSchoolRowClick}
                    >
                      Change
                    </button>
                  </>
                ) : isSchoolLocked ? (
                  <p className="is-locked">Choose next (optional)</p>
                ) : (
                  <p>
                    <button type="button" className="afc-donation-panel__row-link" onClick={onSchoolRowClick}>
                      Choose now
                    </button>
                    <span className="afc-donation-panel__row-optional"> (optional)</span>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
