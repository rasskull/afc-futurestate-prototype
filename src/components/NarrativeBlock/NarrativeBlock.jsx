import linesTop from '../../assets/photos/content-block-lines-top.webp';
import linesBottom from '../../assets/photos/content-block-lines-bottom.webp';
import './NarrativeBlock.css';

const DEFAULT_BODY = [
  'Starting January 1, 2027, an eligible donor who contributes to a qualified Scholarship Granting Organization (SGO) — like AFC Scholarship Fund — receives a dollar-for-dollar federal tax credit of up to $1,700: a direct reduction of what they owe the IRS, not just a deduction.',
  'Those contributions open the right school to families who’ve had the fewest choices. For the first time, a child’s options aren’t decided by family income or ZIP code — and roughly 90% of American students are expected to be eligible, in every state that takes part.',
  'AFC Scholarship Fund is America’s scholarship network — the most-connected way to put your credit to work. Give up to $1,700, reduce your federal tax bill by the same amount, and open a door for a child. Net-zero cost to you. Life-changing for a family.',
];

const DEFAULT_CHECKLIST_ITEMS = [
  'Tutoring and academic support',
  'Special-education services and therapies',
  'Books, technology, and learning materials',
  'Private or faith-based school tuition',
  'Dual enrollment, AP exams, and more',
];

function CheckIcon() {
  return (
    <span className="afc-narrative-block__check-icon" aria-hidden="true">
      <svg width="27" height="27" viewBox="0 0 27 27" fill="none">
        <circle cx="13.5" cy="13.5" r="13.5" fill="var(--color-structure)" />
        <path
          d="M7.5 13.5L11.5 17.5L19.5 9.5"
          stroke="var(--color-paper)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function NarrativeBlock({
  heading = (
    <>
      What Is The <strong>EFTC?</strong>
    </>
  ),
  // Optional large heading-style line under the title — only meaningful when
  // there's no right column/checklist (real source: .afc-content-block__
  // subheading's "no right col" variant, 48px structure-blue vs. the small
  // 22px ink-colored body style it'd otherwise get alongside a checklist).
  subheading,
  lead = 'For the first time in American history, a federal law lets donors fund K–12 scholarships and get every dollar back.',
  body = DEFAULT_BODY,
  introText = 'Scholarships are funded by private, charitable donations — not taken from public school budgets — and can help cover:',
  // Falsy/empty hides the entire right column (real source: the block simply
  // omits .afc-content-block__right when no checklist is configured) — the
  // left column then spans the full width instead of leaving a dead gap.
  checklistItems = DEFAULT_CHECKLIST_ITEMS,
  topLines = linesTop,
  bottomLines = linesBottom,
  // Hides the decorative corner line-art entirely (real source: the block
  // simply omits the arc markup when configured off — matches the live
  // `--no-bg-lines` modifier).
  showLines = true,
  // Right column checklist renders in 2 CSS columns instead of a single
  // stack, with header/intro spanning full-width above it (matches the real
  // `--checklist-cols-2` modifier, AFC-89).
  checklistCols2 = false,
}) {
  const hasRightColumn = Boolean(checklistItems && checklistItems.length > 0);

  const sectionClasses = [
    'afc-narrative-block',
    !hasRightColumn && 'afc-narrative-block--single-col',
    checklistCols2 && 'afc-narrative-block--checklist-cols-2',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={sectionClasses}>
      {showLines && (
        <img
          className="afc-narrative-block__lines afc-narrative-block__lines--top"
          src={topLines}
          alt=""
          aria-hidden="true"
        />
      )}

      <div className="afc-wide afc-narrative-block__inner">
        <div className="afc-narrative-block__header">
          <h2>{heading}</h2>
          {subheading && <p className="afc-narrative-block__subheading">{subheading}</p>}
        </div>

        <div className="afc-narrative-block__columns">
          <div className="afc-narrative-block__col afc-narrative-block__col--left">
            {lead && <p className="afc-narrative-block__lead">{lead}</p>}
            {body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {hasRightColumn && (
            <div className="afc-narrative-block__col afc-narrative-block__col--right">
              {introText && <p className="afc-narrative-block__intro">{introText}</p>}
              <ul className="afc-narrative-block__checklist">
                {checklistItems.map((item) => (
                  <li key={item}>
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {showLines && (
        <img
          className="afc-narrative-block__lines afc-narrative-block__lines--bottom"
          src={bottomLines}
          alt=""
          aria-hidden="true"
        />
      )}
    </section>
  );
}
