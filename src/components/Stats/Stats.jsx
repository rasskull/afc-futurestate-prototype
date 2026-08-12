import statsBg from '../../assets/photos/about-stats-bg.webp';
import './Stats.css';

const DEFAULT_STATS = [
  { value: '3B+', label: 'IN SCHOLARSHIPS ALREADY MOVING THROUGH THE ODYSSEY NETWORK WE’RE BUILT ON' },
  { value: '157K+', label: 'STUDENTS SERVED ACROSS 12 STATES' },
  { value: '90%+', label: 'OF EVERY QUALIFYING DONATION GOES TO SCHOLARSHIPS, BY FEDERAL RULE' },
  { value: '30+ states', label: 'HAVE ALREADY OPTED IN TO THE FEDERAL CREDIT — AND COUNTING' },
];

// Real source: afc/about-stats (afc-core/blocks-src/about-stats/) — four
// green circles in a row (desktop) / stacked column (mobile), each holding a
// bold white number over an uppercase structure-blue label. The decorative
// background graphic (curved line + icons) is desktop-only in the real
// block (hidden below 1024px) since it would otherwise crowd the stacked
// mobile layout.
export default function Stats({
  // Optional heading/intro above the stat row — omitted by default (the
  // About Us page's instance is headless; the For Parents page's "Here's
  // What Happens Next" instance has its own header block above the stats).
  heading,
  intro,
  stats = DEFAULT_STATS,
  backgroundImage = statsBg,
  // Bespoke, user-requested tweak for the About Us page's instance only —
  // confirmed live the real block never staggers items. See Stats.css.
  staggered = false,
  // Per-instance vertical nudge for the decorative background graphic —
  // 0 by default so other instances (e.g. About Us) are unaffected.
  backgroundOffsetY = 0,
}) {
  return (
    <section
      className={`afc-stats${staggered ? ' afc-stats--staggered' : ''}`}
      style={{
        '--afc-stats-bg': `url(${backgroundImage})`,
        '--afc-stats-bg-offset-y': `${backgroundOffsetY}px`,
      }}
    >
      <div className="afc-stats__bg" aria-hidden="true" />
      {heading && (
        <div className="afc-wide afc-stats__header">
          <h2 className="afc-stats__heading">{heading}</h2>
          {intro && <p className="afc-stats__intro">{intro}</p>}
        </div>
      )}
      <div className={`afc-stats__row${heading ? ' afc-stats__row--has-header' : ''}`}>
        {stats.map((stat) => (
          <div
            className="afc-stats__item"
            key={stat.label}
            // Optional per-item top offset (e.g. { ...stat, offsetTop: 20 })
            // — lets any individual circle be nudged down without a
            // hardcoded nth-child rule. Independent of the `staggered` prop
            // above, which only covers About Us's own fixed 1st/3rd-item
            // tweak. Only takes effect in the desktop row layout (see
            // Stats.css) — matching where `staggered` applies too, since a
            // top offset is meaningless in the stacked mobile column.
            style={stat.offsetTop ? { '--afc-stats-item-offset-top': `${stat.offsetTop}px` } : undefined}
          >
            <div className="afc-stats__circle">
              <span className="afc-stats__value" aria-label={stat.value}>
                {stat.value}
              </span>
            </div>
            <p className="afc-stats__label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
