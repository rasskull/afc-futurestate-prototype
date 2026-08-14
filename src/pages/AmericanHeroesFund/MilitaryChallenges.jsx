import './MilitaryChallenges.css';

const DEFAULT_COLUMNS = [
  [
    {
      lead: 'Frequent moves disrupt learning.',
      body: 'The average military child changes schools six to nine times before graduating high school.',
    },
    {
      lead: 'Special needs travel with the family.',
      body: 'IEPs and 504 plans don’t transfer cleanly across districts — private and specialty schools can help fill the gap.',
    },
    {
      lead: 'Choice is limited by ZIP code.',
      body: 'Families are often assigned to the public school nearest their base — whether it’s the right fit or not.',
    },
  ],
  [
    {
      lead: 'Faith and values matter.',
      body: 'Many military families prioritize a school whose values reflect their household’s.',
    },
    {
      lead: 'Deployment compounds the strain.',
      body: 'A parent away can mean missed milestones, transitions, and academic support at home.',
    },
    {
      lead: 'Veterans deserve continuity.',
      body: 'Service doesn’t end at separation. Neither should the support for their children.',
    },
  ],
];

// Ground truth: a plain `wp-block-columns` (2-up) sitting under the page's
// "Military Families Face Challenges Most Don't." heading+lead — each
// column is a stack of plain paragraphs (bold lead-in + line break + body),
// not a heading/paragraph pair or a checklist, so neither NarrativeBlock nor
// WhoWeServe's shape fits; page-local to this page like WhoWeServe.
export default function MilitaryChallenges({ columns = DEFAULT_COLUMNS }) {
  return (
    <section className="afc-military-challenges">
      <div className="afc-wide afc-military-challenges__grid">
        {columns.map((column, i) => (
          <div className="afc-military-challenges__col" key={i}>
            {column.map((item) => (
              <p className="afc-military-challenges__item" key={item.lead}>
                <strong>{item.lead}</strong>
                <br />
                {item.body}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
