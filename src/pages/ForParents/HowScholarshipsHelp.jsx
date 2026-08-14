import './HowScholarshipsHelp.css';

const DEFAULT_COLUMNS = [
  {
    heading: 'Who Qualifies',
    body: 'Most American students qualify. Eligibility is based on your household income compared to the median income in your area — not a fixed national number. Families earning up to 300% of the local area median gross income (as defined by HUD) qualify, which covers an estimated 90% of K–12 students nationwide. Your child also needs to be eligible to enroll in a public elementary or secondary school.',
  },
  {
    heading: 'Where Scholarships Are Available',
    body: 'Scholarships are available to families in states that have chosen to take part in the program. Many states have already opted in, with more expected before scholarships begin. To receive a scholarship, your child needs to live in a participating state — so the first step is simply checking whether yours is on the list.',
  },
  {
    heading: 'Where Scholarships Come From',
    body: 'Scholarships are awarded by Scholarship Granting Organizations (SGOs) — nonprofits that meet strict standards and are funded by donor contributions made possible through the Education Freedom Tax Credit. AFC Scholarship Fund is a national SGO built to bring scholarships to families at scale.',
  },
];

// Real source: a generic WP group layout (no bespoke block) — gradient h2 +
// lead paragraph + an italicized supporting line, then a plain 3-up grid of
// text-only sub-sections (gradient h3 + paragraph, no images, no card
// background — confirmed live). Page-local since this exact
// heading+lead+italic-line+3-col layout isn't reused anywhere else yet.
export default function HowScholarshipsHelp({
  heading = (
    <>
      How Scholarships <strong>Help Families</strong>
    </>
  ),
  lead = 'A scholarship can help cover tuition and educational costs so you can choose the school that fits your child — public, private, faith-based, or another option available where you live.',
  supportLine = 'You focus on finding the right school for your child. The scholarship helps pay for it.',
  columns = DEFAULT_COLUMNS,
}) {
  return (
    <section className="afc-scholarships-help">
      <div className="afc-wide">
        <div className="afc-scholarships-help__header">
          <h2 className="afc-scholarships-help__heading">{heading}</h2>
          <p className="afc-scholarships-help__lead">{lead}</p>
          <p className="afc-scholarships-help__support-line">{supportLine}</p>
        </div>

        <div className="afc-scholarships-help__grid">
          {columns.map((col) => (
            <div className="afc-scholarships-help__col" key={col.heading}>
              <h3 className="afc-scholarships-help__col-heading">{col.heading}</h3>
              <p className="afc-scholarships-help__col-body">{col.body}</p>
            </div>
          ))}
        </div>

        <hr className="afc-scholarships-help__divider" />
      </div>
    </section>
  );
}
