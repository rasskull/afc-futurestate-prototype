import SignupForm from '../../components/SignupForm/SignupForm.jsx';
import signupBg from '../../assets/photos/be-first-to-know-bg.jpg';
import './StorySignupBox.css';

// Ground truth: confirmed live — this is a DIFFERENT rendering of
// afc/email-signup--dark than SignupFooter.jsx ports (that one is always
// WP `alignfull`, full viewport width with a huge alignfull-specific
// heading rule and a dark scrim over the photo). This instance is plain
// `align` — boxed to the article's own 720px content column, rounded
// corners, a much smaller heading (32px vs. alignfull's clamp up to 68px),
// and no dark scrim over the background photo at all. Reusing SignupFooter
// here would mean fighting its alignfull-only CSS; this is a small enough
// wrapper around the same shared SignupForm primitive to just build fresh.
export default function StorySignupBox({
  heading = (
    <>
      Be the <strong>First to Know</strong>
    </>
  ),
  supportCopy = 'Get notified when the Education Freedom Tax Credit launches so you don’t miss the opportunity to support K–12 students while benefiting from a federal tax credit.',
}) {
  return (
    <section className="afc-story-signup" style={{ '--afc-story-signup-bg': `url(${signupBg})` }}>
      <SignupForm variant="inline" theme="dark" heading={heading} supportCopy={supportCopy} />
    </section>
  );
}
