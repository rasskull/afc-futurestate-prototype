import { Link } from 'react-router-dom';
import SessionTestToggle from '../Donate/SessionTestToggle.jsx';
import './PrototypeScenarios.css';

// Internal testing page only — not linked from the site nav. Each card drops
// straight into a specific mid-flow state of the donation form via the same
// ?fund=&state=&school= GET-param prefill the real flow already supports
// (see DonateScrollFlow.jsx), so QA/demoing a particular scenario doesn't
// require manually clicking through the whole form every time.
const DONATION_SCENARIOS = [
  {
    title: 'Fresh start',
    description: 'Nothing pre-filled. Fund is the first thing to answer.',
    to: '/donate',
  },
  {
    title: 'Fund',
    description: 'Fund is already answered — lands ready to pick a State.',
    to: '/donate?fund=american-promise',
  },
  {
    title: 'Fund + State',
    description: 'Fund and State are both answered — lands ready to pick a School.',
    to: '/donate?fund=catholic-schools&state=VA',
  },
  {
    title: 'State',
    description:
      'State is set with no Fund — State shows populated even though it stays locked/dimmed until a Fund is chosen, and the page still lands on Fund.',
    to: '/donate?state=VA',
  },
  {
    title: 'State + School',
    description:
      'State and School are set (Alton El, Brenham) but Fund is not — School shows populated even though it stays locked/dimmed until a Fund is chosen.',
    to: '/donate?state=TX&school=481128000602',
  },
  {
    title: 'Fund + State + School',
    description: 'Everything is answered — Select Gift Amount is unlocked.',
    to: '/donate?fund=american-promise&state=TX&school=480744000010',
  },
];

const PAGE_ENTRIES = [
  {
    title: 'Fund Example Page',
    description: 'A standalone fund detail page (American Heroes Scholarship Fund), ported from the live site.',
    to: '/funds/american-heroes',
  },
  {
    title: 'Story Example Page',
    description: 'A standalone story detail page (Mya’s story), ported from the live site. Every story/article card sitewide links here.',
    to: '/stories/example',
  },
];

const THANK_YOU_SCENARIOS = [
  {
    title: 'Thank you — standard',
    description: 'Default state: prompts the donor to set up a yearly reminder.',
    to: '/thank-you',
  },
  {
    title: 'Thank you — give again',
    description: 'Repeat-donor prompt: support a different fund, state, or school.',
    to: '/thank-you?variant=give-again',
  },
  {
    title: 'Thank you — remaining credit',
    description: 'Donor gave less than the federal credit cap ($500 of $1,700) — prompts them to give the rest.',
    to: '/thank-you?variant=remaining-credit&amount=500',
  },
];

function ScenarioCard({ title, description, to }) {
  return (
    <Link className="afc-prototype-scenarios__card" to={to}>
      <p className="afc-prototype-scenarios__card-title">{title}</p>
      <p className="afc-prototype-scenarios__card-description">{description}</p>
      <p className="afc-prototype-scenarios__card-path">{to}</p>
    </Link>
  );
}

export default function PrototypeScenarios() {
  return (
    <div className="afc-prototype-scenarios afc-wide">
      <div className="afc-prototype-scenarios__intro">
        <p className="afc-prototype-scenarios__eyebrow">Internal — prototype only</p>
        <h1 className="afc-prototype-scenarios__heading">Donation flow test scenarios</h1>
        <p className="afc-prototype-scenarios__subheading">
          Each card jumps straight to a specific mid-flow state of the donation form for testing,
          instead of clicking through it from scratch every time.
        </p>
      </div>

      <div className="afc-prototype-scenarios__section">
        <h2 className="afc-prototype-scenarios__section-heading">Donation form</h2>
        <div className="afc-prototype-scenarios__grid">
          {DONATION_SCENARIOS.map((scenario) => (
            <ScenarioCard key={scenario.to} {...scenario} />
          ))}
        </div>
      </div>

      <div className="afc-prototype-scenarios__section">
        <h2 className="afc-prototype-scenarios__section-heading">Page entries</h2>
        <div className="afc-prototype-scenarios__grid">
          {PAGE_ENTRIES.map((scenario) => (
            <ScenarioCard key={scenario.to} {...scenario} />
          ))}
        </div>
      </div>

      <div className="afc-prototype-scenarios__section">
        <h2 className="afc-prototype-scenarios__section-heading">Thank you page</h2>
        <div className="afc-prototype-scenarios__grid">
          {THANK_YOU_SCENARIOS.map((scenario) => (
            <ScenarioCard key={scenario.to} {...scenario} />
          ))}
        </div>
      </div>

      <SessionTestToggle />
    </div>
  );
}
