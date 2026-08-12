import SignupForm from '../../components/SignupForm/SignupForm.jsx';
import './SignupInline.css';

// Decorative wavy background lines, ported verbatim from the WP block's
// afc_core_email_swoosh_svg() helper (afc-core/inc/render-helpers.php).
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

export default function SignupInline({
  heading = (
    <>
      Be the <strong>First</strong>
      <br />
      to Know
    </>
  ),
  supportCopy = 'Get notified when the Education Freedom Tax Credit launches so you don’t miss the opportunity to support K–12 students while benefiting from a federal tax credit.',
  // Forwarded to SignupForm's root — lets one specific instance apply a
  // scoped style override (e.g. a smaller heading) without affecting other
  // SignupInline usages.
  formClassName,
}) {
  return (
    <section className="afc-signup-inline">
      <div className="afc-signup-inline__decoration" aria-hidden="true">
        <SwooshLines className="afc-signup-inline__decoration-svg" />
      </div>
      <div className="afc-signup-inline__decoration afc-signup-inline__decoration--bottom" aria-hidden="true">
        <SwooshLines className="afc-signup-inline__decoration-svg" />
      </div>

      <div className="afc-signup-inline__inner">
        <SignupForm
          variant="inline"
          theme="light"
          heading={heading}
          supportCopy={supportCopy}
          className={formClassName}
        />
      </div>
    </section>
  );
}
