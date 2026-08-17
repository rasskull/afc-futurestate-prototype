import Button from '../../components/ui/Button.jsx';
import './DonateFooter.css';

// Donate-focused sibling of SignupFooter.jsx — same dark full-bleed photo
// section, but where that component has an email-signup form, this one has
// a single Donate CTA instead. Kept as its own component/CSS file (not a
// prop on SignupFooter) since swapping a multi-field form for a single
// button is a real layout difference, not just a copy change — same
// reasoning as DonateInline.jsx vs. SignupInline.jsx.
export default function DonateFooter({
  heading = (
    <>
      You Can Change <strong>a Child&rsquo;s Life</strong>
    </>
  ),
  supportCopy = 'Your donation funds a K–12 scholarship today — and once the Education Freedom Tax Credit launches, you’ll get a dollar-for-dollar federal tax credit of up to $1,700.',
  ctaLabel = 'Donate Now',
  ctaTo = '/donate',
  // Overrides the default bg image (same photo at every breakpoint, unlike
  // the default's separate desktop/mobile crops — matches SignupFooter.jsx's
  // own per-instance override convention).
  backgroundImage,
  // Extra class on the section root — lets one specific instance apply a
  // scoped style override without affecting other DonateFooter usages
  // (mirrors DonateInline.jsx's own className prop).
  className = '',
}) {
  return (
    <section
      className={`afc-donate-footer ${className}`.trim()}
      style={backgroundImage ? { '--afc-donate-footer-bg': `url(${backgroundImage})` } : undefined}
    >
      <div className="afc-wide">
        <div className="afc-donate-footer__inner">
          <h2 className="afc-donate-footer__heading">{heading}</h2>
          <p className="afc-donate-footer__copy">{supportCopy}</p>
          <Button variant="solid" to={ctaTo} className="afc-donate-footer__cta">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
