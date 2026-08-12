import './ProcessSteps.css';

const DEFAULT_STEPS = [
  'Register your interest — a short form, two minutes',
  'We confirm eligibility and set up your co-branded portal',
  'Families at your school access scholarships when EFTC activates',
  'We handle distribution, compliance, and reporting — you see it all in your dashboard',
];

export default function ProcessSteps({
  heading = (
    <>
      Four steps. <strong>We do the heavy lifting.</strong>
    </>
  ),
  steps = DEFAULT_STEPS,
}) {
  return (
    <section className="afc-process-steps">
      <div className="afc-wide afc-process-steps__inner">
        <h2 className="afc-process-steps__heading">{heading}</h2>
        <ol className="afc-process-steps__list">
          {steps.map((step, i) => (
            <li className="afc-process-steps__step" key={i}>
              <span className="afc-process-steps__number" aria-hidden="true">
                {i + 1}
              </span>
              <p className="afc-process-steps__body">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
