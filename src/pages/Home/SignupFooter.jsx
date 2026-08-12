import SignupForm from '../../components/SignupForm/SignupForm.jsx';
import './SignupFooter.css';

export default function SignupFooter({
  heading = (
    <>
      Be Ready On <strong>Day One</strong>
    </>
  ),
  supportCopy = 'The Education Freedom Tax Credit launches in 2027. Join the list and we’ll tell you the moment you can fund a scholarship and claim your federal tax credit.',
  // Overrides the default bg image (same photo at every breakpoint, unlike
  // the default's separate desktop/mobile crops — matches every other
  // page-specific instance, which only has one crop available).
  backgroundImage,
}) {
  return (
    <section
      className="afc-signup-footer"
      style={backgroundImage ? { '--afc-signup-footer-bg': `url(${backgroundImage})` } : undefined}
    >
      <div className="afc-wide">
        <div className="afc-signup-footer__inner">
          <SignupForm variant="inline" theme="dark" heading={heading} supportCopy={supportCopy} />
        </div>
      </div>
    </section>
  );
}
