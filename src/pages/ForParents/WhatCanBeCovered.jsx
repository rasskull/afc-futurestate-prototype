import './WhatCanBeCovered.css';

const DEFAULT_ITEMS = [
  'Tuition at a private or faith-based school',
  'Tutoring and special-education services',
  'Books, technology, and learning materials',
  'Other approved education expenses',
];

// Real source: another plain WP group layout (confirmed live, no bespoke
// block) — gradient h2 + lead, then a 4-up grid of cream-background rounded
// chips, each just a centered bold line of text (no heading, no icon).
export default function WhatCanBeCovered({
  heading = (
    <>
      What a Scholarship <strong>Can Help Cover</strong>
    </>
  ),
  lead = 'A scholarship can go toward the real costs of the right school for your child — so the choice isn’t limited by what your family can afford. Depending on your school and state, that can include:',
  items = DEFAULT_ITEMS,
}) {
  return (
    <section className="afc-scholarship-covers">
      <div className="afc-wide">
        <div className="afc-scholarship-covers__header">
          <h3 className="afc-scholarship-covers__heading">{heading}</h3>
          <p className="afc-scholarship-covers__lead">{lead}</p>
        </div>

        <div className="afc-scholarship-covers__grid">
          {items.map((item) => (
            <div className="afc-scholarship-covers__chip" key={item}>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
