import peopleBg from '../../assets/photos/about-people-bg.webp';
import seanCliffordPhoto from '../../assets/photos/about-person-sean-clifford.jpg';
import tommySchultzPhoto from '../../assets/photos/about-person-tommy-schultz.jpg';
import gregAllumPhoto from '../../assets/photos/about-person-greg-allum.jpg';
import './People.css';

const DEFAULT_PEOPLE = [
  {
    id: 'sean-clifford',
    photo: seanCliffordPhoto,
    name: 'Sean Clifford',
    title: 'President, AFC Scholarship Fund',
    bio: 'Sean Clifford is President of the AFC Scholarship Fund, the national scholarship-granting organization built to administer the first federal school choice tax credit in U.S. history. He brings two decades of experience founding and leading organizations across education, technology, and public policy, including as CEO of Canopy and Chief Strategy Officer at The Tikvah Fund. He holds an MBA from The Wharton School.',
  },
  {
    id: 'tommy-schultz',
    photo: tommySchultzPhoto,
    name: 'Tommy Schultz',
    title: 'Chief Executive Officer',
    bio: 'Tommy Schultz is CEO of the American Federation for Children (AFC). He is Stanford graduate with more than a decade of experience at all levels of AFC. In his time at AFC, Tommy has been the organization’s primary public voice during the most prolific era of school choice lawmaking in American history. During his time as CEO, AFC has raised and deployed $179 million across half of the country. During that time, private school choice program enrollment grew from 540,000 to 1.6 million today as AFC passed 80 laws across 30 states, including the Education Freedom Tax Credit (EFTC).',
  },
  {
    id: 'greg-allum',
    photo: gregAllumPhoto,
    name: 'Greg Allum',
    title: 'Chief Marketing Officer',
    bio: 'Greg Allum is Chief Marketing Officer of the AFC Scholarship Fund, where he leads the marketing infrastructure and data strategy behind the Education Freedom Tax Credit — the first federal school choice tax credit in U.S. history. He brings over 15 years of marketing and growth leadership from organizations including Stand Together, GrowthDay, Fuzzy, Jellyfish, and Sony Electronics. Greg holds an MFA in Creative Writing from Pacific University and a BS in Business Administration from Capella University, and is also a published poet and Founder of Ink & Ribbon Press.',
  },
];

// Arrow-right icon — ported verbatim from the real block's inline SVG.
function ArrowIcon() {
  return (
    <svg width="14" height="12" viewBox="0 0 27.9844 23.9844" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M27.375 13.4219L17.375 23.4219C17 23.7969 16.5 23.9844 16 23.9844C15.4375 23.9844 14.9375 23.7969 14.5625 23.4219C13.75 22.6719 13.75 21.3594 14.5625 20.6094L21.125 13.9844H2C0.875 13.9844 0 13.1094 0 11.9844C0 10.9219 0.875 9.98438 2 9.98438H21.125L14.5625 3.42188C13.75 2.67188 13.75 1.35938 14.5625 0.609375C15.3125 -0.203125 16.625 -0.203125 17.375 0.609375L27.375 10.6094C28.1875 11.3594 28.1875 12.6719 27.375 13.4219Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Real source: afc/about-people (afc-core/blocks-src/about-people/) — a
// full-bleed brand-navy band, plain 3-up grid (2-up tablet, 1-up mobile,
// NO column dividers), centered circular headshots with a subtle white
// ring, and a white "See All Authors" pill CTA below the grid. Bio text
// and social links are real-source mobile-only (`display:none` above
// 768px) — kept that way here. Social icons themselves are omitted (no
// author social links modeled in this prototype); "Author Profile" stays
// an inert `href="#"` placeholder link, same convention as every other
// no-destination link in this app.
export default function People({
  heading = 'The People Behind the Network',
  intro = 'AFC Scholarship Fund brings together leaders in education, scholarship operations, and family support — united by one belief: every family deserves a real choice.',
  people = DEFAULT_PEOPLE,
  ctaLabel = 'See All Authors',
}) {
  return (
    <section className="afc-about-people" style={{ '--afc-about-people-bg': `url(${peopleBg})` }}>
      <div className="afc-about-people__inner">
        <div className="afc-about-people__header">
          <h2 className="afc-about-people__heading">{heading}</h2>
          {intro && <p className="afc-about-people__intro">{intro}</p>}
        </div>

        <ul className="afc-about-people__grid" role="list">
          {people.map((person) => (
            <li className="afc-about-people__person" key={person.id}>
              <div className="afc-about-people__headshot" aria-hidden="true">
                <img className="afc-about-people__headshot-img" src={person.photo} alt="" />
              </div>
              <h3 className="afc-about-people__name">{person.name}</h3>
              <p className="afc-about-people__role">{person.title}</p>
              <p className="afc-about-people__bio">{person.bio}</p>
              <a className="afc-about-people__profile-link" href="#" onClick={(e) => e.preventDefault()}>
                Author Profile
                <ArrowIcon />
              </a>
            </li>
          ))}
        </ul>

        {ctaLabel && (
          <div className="afc-about-people__cta">
            <a className="afc-about-people__cta-link" href="#" onClick={(e) => e.preventDefault()}>
              {ctaLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
