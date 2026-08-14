import './WhoWeServe.css';

const DEFAULT_ITEMS = [
  {
    heading: 'Active-Duty Families',
    body: 'Children of currently-serving members of the Army, Navy, Marines, Air Force, Space Force, and Coast Guard.',
  },
  {
    heading: 'Guard & Reserve',
    body: 'Children of National Guard and Reserve members — serving while balancing civilian careers and community.',
  },
  {
    heading: 'Veterans’ Children',
    body: 'Sons and daughters of those who served honorably and continue to shape their communities at home.',
  },
  {
    heading: 'Gold Star Families',
    body: 'Children of service members who gave their lives in the line of duty. We stand with them in legacy.',
  },
];

// Ground truth: a plain `wp-block-columns` (4-up) sitting directly under the
// page's "Built for Every Family That Serves." heading+lead, no dedicated
// section background of its own. Same flexible-grid shape as ForSchools'
// WhyPartner.jsx (flex-wrap, no fixed column count baked into the CSS) —
// copied rather than reused cross-page since this page's directory is meant
// to be self-contained, matching how ForParents/ForSchools each keep their
// own page-local layout components.
export default function WhoWeServe({ items = DEFAULT_ITEMS }) {
  return (
    <section className="afc-who-we-serve">
      <div className="afc-wide afc-who-we-serve__grid">
        {items.map((item) => (
          <div className="afc-who-we-serve__item" key={item.heading}>
            <h3 className="afc-who-we-serve__heading">{item.heading}</h3>
            <p className="afc-who-we-serve__body">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
