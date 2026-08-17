import Button from '../../components/ui/Button.jsx';
import './DonateInline.css';

// Decorative wavy background lines — same SwooshLines graphic as
// SignupInline.jsx (kept identical on purpose; this component was copied
// from that one, swapping the email-signup form for a Donate CTA while
// keeping the surrounding blue-toned decoration exactly as-is).
function SwooshLines({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1728 800"
      fill="none"
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
    >
      <g transform="translate(-59 196.74)">
        <path
          d="M0 1.5C95.1683 1.5 165.735 115.638 242.733 233.755C331.485 369.904 435.208 452.831 652.277 475.02C852.511 495.487 1142.02 385.606 1267.13 280.807C1467.16 113.245 1563.33 97.6055 1707.68 97.6055C1811.41 97.6055 1898.02 135.647 1944 165.68"
          stroke="var(--color-accent)"
          strokeWidth="3"
          fill="none"
        />
      </g>
      <g transform="translate(-90 246.74)">
        <path
          d="M0.107065 1.49617C74.4752 6.81789 184.109 58.2702 289.872 170.804C395.635 283.338 489.82 343.853 684.219 363.74C884.441 384.222 1074.37 317.623 1209.37 244.438C1435.91 121.635 1499.52 74.6292 1673.47 74.6292C1826.37 74.6292 1907.44 117.67 1992.11 170.804"
          stroke="var(--color-action)"
          strokeWidth="3"
          fill="none"
        />
      </g>
    </svg>
  );
}

// Donate-focused sibling of SignupInline.jsx — same layout/decoration, but
// where that component has an email-signup form, this one has a single
// Donate CTA instead. Kept as its own component/CSS file (not a prop on
// SignupInline) since swapping a multi-field form for a single button is a
// real layout difference, not just a copy change.
export default function DonateInline({
  heading = (
    <>
      Change a <strong>Child&rsquo;s Life</strong>
    </>
  ),
  supportCopy = 'Your gift funds a K–12 scholarship — 100% of every donation goes directly toward a student’s education.',
  ctaLabel = 'Donate Now',
  ctaTo = '/donate',
  // Extra class on the section root — lets one specific instance override
  // e.g. the decoration's position without affecting other DonateInline
  // usages (mirrors SignupInline.jsx's own className prop).
  className = '',
}) {
  return (
    <section className={`afc-donate-inline ${className}`.trim()}>
      <div className="afc-donate-inline__decoration" aria-hidden="true">
        <SwooshLines className="afc-donate-inline__decoration-svg" />
      </div>
      <div className="afc-donate-inline__decoration afc-donate-inline__decoration--bottom" aria-hidden="true">
        <SwooshLines className="afc-donate-inline__decoration-svg" />
      </div>

      <div className="afc-donate-inline__inner">
        <h2 className="afc-donate-inline__heading">{heading}</h2>
        <div className="afc-donate-inline__form-area">
          <p className="afc-donate-inline__copy">{supportCopy}</p>
          <Button variant="solid" to={ctaTo} className="afc-donate-inline__cta">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
