import StoryListingCta from '../../components/StoryListingCta/StoryListingCta.jsx';
import storyTwoBrothers from '../../assets/photos/explore2-two-brothers-college.jpg';
import storyAllenThompson from '../../assets/photos/explore2-allen-thompson.jpg';
import storyClay from '../../assets/photos/story-clay-thumb.jpg';
import storyGoldStarFamily from '../../assets/photos/story-gold-star-family.jpg';
import storyVeteranDaughter from '../../assets/photos/explore2-veteran-daughter.jpg';
import storyMilitaryFamilyLife from '../../assets/photos/story-military-family-life.jpg';
import storySamMyers from '../../assets/photos/story-sam-myers.jpg';
import storyValiantCross from '../../assets/photos/explore2-valiant-cross-academy.jpg';
import storyTragedyStrikes from '../../assets/photos/story-tragedy-strikes.jpg';
import storyMothersInstinct from '../../assets/photos/story-mothers-instinct.jpg';
import storyMya from '../../assets/photos/story-mya.jpg';
import listingCtaBg from '../../assets/photos/more-from-author-cta-bg.jpg';
import './AllStories.css';

const DEFAULT_STORIES = [
  {
    image: storyTwoBrothers,
    headline: 'Their Parents Never Finished Sixth Grade. A Scholarship Helped Send Both Sons to College',
    snippet:
      'Some parents want their kids to have an education. Antoine and Manny’s parents needed an education but never got the chance to finish one. That didn’t stop them from building their whole lives around getting it for their sons.',
  },
  {
    image: storyAllenThompson,
    headline: 'School Choice Gave Allen Thompson a Second Chance. Now He’s Giving It to His Students',
    snippet:
      'Allen Thompson waited four years for a magnet school seat while his mom sacrificed every morning to get him there. Today he’s the teacher he once needed.',
  },
  {
    image: storyClay,
    headline: 'From Falling Behind to Team Captain: How School Choice Changed Clay’s Life',
    snippet:
      'Clay’s public school told his mom his goals weren’t “appropriate for second grade.” As a teacher, she knew better. A scholarship gave her the chance to prove it, and today her son is thriving in a classroom built around how he learns.',
  },
  {
    image: storyGoldStarFamily,
    headline: 'Gold Star Family Finds Relief Through School Choice',
    snippet:
      'When Jessica lost her husband in the line of duty, she became the sole decision-maker for her two daughters. She says the Opportunity Scholarship doesn’t just help with tuition — it gives her back something grief tried to take: the ability to choose.',
  },
  {
    image: storyVeteranDaughter,
    headline: 'A Veteran’s Fight for Her Daughter’s Future',
    snippet:
      'Tonya Johnston served in the military to build a better future for her family. When her daughter Joy began struggling in public school, Tonya felt like she was out of options — until a conversation across the fence introduced her to a life-changing opportunity.',
  },
  {
    image: storyMilitaryFamilyLife,
    // Renamed live (2026-08-12 sync) from "School Choice Is Transforming
    // Military Family Life" — same Carol Day/Savannah story, unchanged
    // excerpt, just a new headline/slug on the live site.
    headline: 'School Choice Changed Everything for This Military Family',
    snippet:
      'Carol Day’s family made sacrifice after sacrifice for military service. School choice — and the Education Freedom Tax Credit — made sure their daughter Savannah didn’t have to sacrifice her education too.',
  },
  {
    image: storySamMyers,
    headline: 'How School Choice Changed Sam Myers’ Life and Opened Doors for Thousands More',
    snippet:
      'Samuel Myers works two jobs. He has a girlfriend. He started his own card-making business. He even met the President. But more than 30 years ago, none of this seemed possible.',
  },
  {
    image: storyValiantCross,
    headline: 'Valiant Cross Academy: Brotherhood, Opportunity, and a Better Future',
    snippet:
      'Across America, millions of children walk into classrooms every day that were chosen for them, not by their families, but by circumstance. That is why schools like Valiant Cross Academy exist — founded to love, educate, and empower young African American men and boys of color.',
  },
  {
    image: storyTragedyStrikes,
    headline: 'When Tragedy Strikes, School Choice Is a Lifeline for Families',
    snippet: 'When tragedy changes everything, access to the right school can make all the difference.',
  },
  {
    image: storyMothersInstinct,
    headline: 'A Mother’s Instinct Led to School Choice—And More Families Will Soon Have That Opportunity',
    snippet:
      'One mother’s belief—and the power of school choice—gave her son the environment he needed to connect, grow, and become exactly who he’s meant to be.',
  },
  {
    image: storyMya,
    headline: 'She Almost Didn’t Go: How School Choice Helped Mya Reach a Top School',
    snippet:
      'One mother’s belief—and the power of school choice—set Mya on a path to one of the top boarding schools in the country.',
  },
  // Added via sync-live-content skill (2026-08-14) — a second, separately
  // published live post about the same Carol Day/Savannah story (distinct
  // slug/image from the "Changed Everything" entry above), so it's a real
  // addition, not a duplicate. Image referenced by live URL directly rather
  // than vendored locally, per that skill's convention for frequently-
  // changing story content.
  {
    image: 'https://afcscholarshipfund.org/wp-content/uploads/2026/03/School-Choice-Is-Transforming-Military-Family-Life.jpg',
    headline: 'School Choice Is Transforming Military Family Life',
    snippet:
      'Carol Day’s family made sacrifice after sacrifice for military service. School choice — and the Education Freedom Tax Credit — made sure their daughter Savannah didn’t have to sacrifice her education too.',
  },
  // Added via sync-live-content skill (2026-08-12) — images referenced by
  // live URL directly rather than vendored locally, per that skill's
  // convention for frequently-changing story content.
  {
    image:
      'https://afcscholarshipfund.org/wp-content/uploads/2026/07/07.02-07.02-Kingdom-Life-Academy_-A-Christian-Micro-School-Preparing-Students-for-Real-Life.jpg',
    headline: 'Kingdom Life Academy: A Christian Micro-School Preparing Students for Real Life',
    snippet:
      'For many low-income families, finding the right school can mean the difference between a child dropping out — or discovering their purpose.',
  },
  {
    image:
      'https://afcscholarshipfund.org/wp-content/uploads/2026/07/07.02-07.02-From-Wrestling-Mat-to-Classroom_-How-the-Right-School-Helped-Unlock-Bo-Bassetts-Potential.jpg',
    headline: 'From Wrestling Mat to Classroom: How the Right School Helped Unlock Bo Bassett’s Potential',
    snippet: 'For Bo Bassett, the right school didn’t just support his goals — it helped him reach his full potential.',
  },
  {
    image: 'https://afcscholarshipfund.org/wp-content/uploads/2026/06/mom-and-daughter-school-story.jpg',
    headline: 'When School Broke Her Confidence, School Choice Helped Rebuild It',
    snippet:
      'When her daughter started falling behind, one Oklahoma mom refused to accept it as the end of the story — and the school she found changed everything.',
  },
  {
    image:
      'https://afcscholarshipfund.org/wp-content/uploads/2026/06/mother-son-student-teen-school-story-banner.jpg',
    headline: 'A Mother’s Fight: When Every Door Closes, School Choice Opens One',
    snippet:
      'When Tamica’s son George was expelled from two public schools, she feared she was out of options. A tax credit scholarship changed everything.',
  },
  {
    image: 'https://afcscholarshipfund.org/wp-content/uploads/2026/06/teen-student-private-christian-school.jpg',
    headline: 'More Than a Transfer: How School Choice Restores Confidence and Opportunity',
    snippet:
      'O’Brian was on the honors track but losing confidence in the wrong environment. After transferring to Valiant Cross, he rediscovered his love of learning and his leadership potential.',
  },
  {
    image: 'https://afcscholarshipfund.org/wp-content/uploads/2026/06/daughter-father-family-school-home-story.jpg',
    headline: 'A Different Path, A Stronger Future: How School Choice Helped Makensie Thrive',
    snippet: 'When Makensie moved into a smaller classroom setting at Pope John Paul II Catholic High School, everything shifted.',
  },
];

// Ground truth: the real afc/story-listing block (confirmed live on
// /stories/) — a paginated 4-up .afc-content-grid--4 with a fielded CTA card
// spliced into the 4th grid cell (11 real stories + 1 CTA = 12 cells) and an
// .afc-listing__pagination bar below (prev disabled on page 1, "Page" +
// number input, "of 2", next). Only page 1's data exists in this prototype,
// so the pager is inert — same established convention as the EFTC page's
// "More to Explore" grid this is modeled on.
export default function AllStories({
  heading = (
    <>
      <strong>All</strong> Stories
    </>
  ),
  stories = DEFAULT_STORIES,
  page = 1,
  pageCount = 2,
}) {
  return (
    <section className="afc-all-stories">
      <div className="afc-wide">
        <div className="afc-all-stories__header">
          <h2 className="afc-all-stories__heading">{heading}</h2>
        </div>

        <div className="afc-all-stories__grid">
          {stories.slice(0, 3).map((story) => (
            <a
              className="afc-all-stories__card"
              href="#"
              onClick={(e) => e.preventDefault()}
              key={story.headline}
            >
              <div className="afc-all-stories__image-wrap">
                <img className="afc-all-stories__image" src={story.image} alt="" loading="lazy" />
              </div>
              <h3 className="afc-all-stories__headline">{story.headline}</h3>
              <p className="afc-all-stories__snippet">{story.snippet}</p>
            </a>
          ))}

          <StoryListingCta backgroundImage={listingCtaBg} />

          {stories.slice(3).map((story) => (
            <a
              className="afc-all-stories__card"
              href="#"
              onClick={(e) => e.preventDefault()}
              key={story.headline}
            >
              <div className="afc-all-stories__image-wrap">
                <img className="afc-all-stories__image" src={story.image} alt="" loading="lazy" />
              </div>
              <h3 className="afc-all-stories__headline">{story.headline}</h3>
              <p className="afc-all-stories__snippet">{story.snippet}</p>
            </a>
          ))}
        </div>

        <nav className="afc-all-stories__pagination" aria-label="Listing pagination">
          <button
            type="button"
            className="afc-all-stories__arrow afc-all-stories__arrow--prev"
            aria-label="Previous page"
            disabled
          >
            <span aria-hidden="true">←</span>
          </button>
          <label className="afc-all-stories__page-label" htmlFor="afc-all-stories-page-input">
            Page
          </label>
          <input
            type="number"
            inputMode="numeric"
            className="afc-all-stories__page-input"
            id="afc-all-stories-page-input"
            defaultValue={page}
            min="1"
            max={pageCount}
            aria-label="Current page — type a number and press Enter to jump"
          />
          <span className="afc-all-stories__page-of">of {pageCount}</span>
          <button
            type="button"
            className="afc-all-stories__arrow afc-all-stories__arrow--next"
            aria-label="Next page"
            onClick={(e) => e.preventDefault()}
          >
            <span aria-hidden="true">→</span>
          </button>
        </nav>
      </div>
    </section>
  );
}
