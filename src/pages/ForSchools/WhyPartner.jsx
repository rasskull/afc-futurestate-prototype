import './WhyPartner.css';

const DEFAULT_ITEMS = [
  {
    heading: 'Demand, not just infrastructure',
    body: 'Our national advertising and lifecycle engine reaches new donors at scale (one-to-many) — so partnering with us adds dollars you couldn’t raise alone, on top of the supporters you already have.',
  },
  {
    heading: 'Your brand on a national-grade portal',
    body: 'Co-branded landing pages and dashboards keep families connected to you — powered by Odyssey’s national distribution infrastructure and AFC’s multi-state footprint.',
  },
  {
    heading: 'Zero operational burden',
    body: 'We’re the scholarship granting organization. We handle eligibility, fund distribution, compliance, and reporting end to end — no SGO to build, no 90/10 cap to track.',
  },
];

// Ground truth: a plain `wp-block-columns` (no dedicated afc-section
// wrapper/background) sitting directly between the first afc/content-block
// and the first afc/cta-promo — confirmed live it carries no background of
// its own (transparent) and only a small 24px top margin from the previous
// block, with no bottom margin (the next section supplies its own padding).
export default function WhyPartner({ items = DEFAULT_ITEMS }) {
  return (
    <section className="afc-why-partner">
      <div className="afc-wide afc-why-partner__grid">
        {items.map((item) => (
          <div className="afc-why-partner__item" key={item.heading}>
            <h3 className="afc-why-partner__heading">{item.heading}</h3>
            <p className="afc-why-partner__body">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
