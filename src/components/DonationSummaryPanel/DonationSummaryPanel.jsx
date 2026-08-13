import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDoubleIcon } from '../icons/DonationIcons.jsx';
import railGraphic from '../../assets/photos/default-rail-graphic.png';
import './DonationSummaryPanel.css';

const STEP_COPY = {
  1: {
    banner: (
      <>
        Less than 30 seconds for you to <strong>change a child&rsquo;s life</strong>.
      </>
    ),
    progressLabel: 'Just getting started',
    progressPercent: 10,
  },
  2: {
    banner: (
      <>
        <strong>One more step</strong> until your donation.
      </>
    ),
    progressLabel: '33% complete',
    progressPercent: 33,
  },
  3: {
    banner: (
      <>
        Almost there &mdash; <strong>your gift</strong> is nearly on its way.
      </>
    ),
    progressLabel: '67% complete',
    progressPercent: 67,
  },
};

const MOBILE_QUERY = '(max-width: 980px)';

export default function DonationSummaryPanel({ step, fund, stateLabel, schoolLabel }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [peekHeight, setPeekHeight] = useState(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
  );
  const bannerRef = useRef(null);
  const copy = STEP_COPY[step];
  // Gift amount only truly requires Fund + State — School is optional, and
  // this must stay true no matter which step page is currently showing
  // (e.g. going back to Fund after State is already picked).
  const isGiftAmountActive = Boolean(fund) && Boolean(stateLabel);

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
        <img
          src={railGraphic}
          alt=""
          className="afc-donation-panel__rail-image afc-donation-panel__rail-image--mobile"
        />
        <div className="afc-donation-panel__rows">
          <p className="afc-donation-panel__rows-heading">Your Donation</p>

          <div className="afc-donation-panel__row">
            <p className="afc-donation-panel__row-label">Fund</p>
            <div className="afc-donation-panel__row-value">
              {step === 1 ? (
                fund ? (
                  <p className="is-set">{fund.name}</p>
                ) : isMobile ? (
                  <button
                    type="button"
                    className="afc-donation-panel__row-link is-select-now"
                    onClick={() => setIsExpanded(false)}
                  >
                    Select now
                  </button>
                ) : (
                  <p className="is-accent is-select-now">Select now</p>
                )
              ) : (
                <>
                  <p className="is-set">{fund?.name}</p>
                  <Link to="/donate" className="afc-donation-panel__row-link">
                    Change
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="afc-donation-panel__row">
            <p className="afc-donation-panel__row-label">State</p>
            <div className="afc-donation-panel__row-value">
              {step === 2 ? (
                stateLabel ? (
                  <p className="is-set">{stateLabel}</p>
                ) : isMobile ? (
                  <button
                    type="button"
                    className="afc-donation-panel__row-link is-select-now"
                    onClick={() => setIsExpanded(false)}
                  >
                    Select now
                  </button>
                ) : (
                  <p className="is-accent is-select-now">Select now</p>
                )
              ) : stateLabel ? (
                <>
                  <p className="is-set">{stateLabel}</p>
                  <Link to="/donate/state" className="afc-donation-panel__row-link">
                    Change
                  </Link>
                </>
              ) : fund ? (
                <Link to="/donate/state" className="afc-donation-panel__row-link">
                  Choose next
                </Link>
              ) : (
                <p>Choose next</p>
              )}
            </div>
          </div>

          <div className="afc-donation-panel__row afc-donation-panel__row--last">
            <p className="afc-donation-panel__row-label">School</p>
            <div className="afc-donation-panel__row-value">
              {step === 3 ? (
                schoolLabel ? (
                  <p className="is-set">{schoolLabel}</p>
                ) : isMobile ? (
                  <button
                    type="button"
                    className="afc-donation-panel__row-link is-select-now"
                    onClick={() => setIsExpanded(false)}
                  >
                    Select now (optional)
                  </button>
                ) : (
                  <p>Select now (optional)</p>
                )
              ) : schoolLabel ? (
                <>
                  <p className="is-set">{schoolLabel}</p>
                  <Link to="/donate/school" className="afc-donation-panel__row-link">
                    Change
                  </Link>
                </>
              ) : stateLabel ? (
                <Link to="/donate/school" className="afc-donation-panel__row-link">
                  Choose next (optional)
                </Link>
              ) : (
                <p>Choose next (optional)</p>
              )}
            </div>
          </div>
        </div>

        {isGiftAmountActive ? (
          <Link to="/donate/gift-amount" className="afc-donation-panel__cta is-active afc-pulse">
            Select gift amount
          </Link>
        ) : (
          <button type="button" className="afc-donation-panel__cta" disabled>
            Select gift amount
          </button>
        )}
      </div>
    </aside>
  );
}
