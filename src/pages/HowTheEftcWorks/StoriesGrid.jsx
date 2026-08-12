import StoryListingCta from '../../components/StoryListingCta/StoryListingCta.jsx';
import exploreNewEra from '../../assets/photos/explore-new-era.jpg';
import exploreTaxCreditChanging from '../../assets/photos/explore-tax-credit-changing.jpg';
import exploreSchoolChoiceData from '../../assets/photos/explore-school-choice-data.jpg';
import exploreFamiliesHeart from '../../assets/photos/explore-families-heart.jpg';
import exploreAlmostEveryChild from '../../assets/photos/explore-almost-every-child.jpg';
import exploreHomeSchoolQuestion from '../../assets/photos/explore-home-school-question.jpg';
import exploreWhoCanReceive from '../../assets/photos/explore-who-can-receive.jpg';
import exploreWaitingRoom from '../../assets/photos/explore-waiting-room.jpg';
import explore1700ActuallyGives from '../../assets/photos/explore-1700-actually-gives.jpg';
import exploreHurricaneStory from '../../assets/photos/explore-hurricane-story.jpg';
import exploreMapHalfFull from '../../assets/photos/explore-map-half-full.jpg';
import listingCtaBg from '../../assets/photos/listing-cta-bg.jpg';
import './StoriesGrid.css';

const DEFAULT_ARTICLES = [
  {
    image: exploreNewEra,
    headline: 'A New Era in American Education: What the EFTC Means for Your Family',
    snippet: 'It’s officially a new era in American education.',
  },
  {
    image: exploreTaxCreditChanging,
    headline: 'The Tax Credit That’s Changing How We Think About Education',
    snippet: 'American test scores have kept sliding even as per-pupil spending has hit an all-time high.',
  },
  {
    image: exploreSchoolChoiceData,
    headline: 'This School Choice Data May Surprise You',
    snippet:
      'Critics call school choice a zero-sum game. They call it a win for the students who leave, a loss for the students who stay. But real-world data tells a different story.',
  },
  {
    image: exploreFamiliesHeart,
    headline: 'Why We Put Families at the Heart of Everything',
    snippet: 'We recently launched a new website for the AFC Scholarship Fund.',
  },
  {
    image: exploreAlmostEveryChild,
    headline: 'Almost Every American Child Qualifies. The Harder Question Is Who Will Fund Them',
    snippet:
      'A new analysis ran the federal eligibility test against real population data for the first time. The answer surprised almost everyone: the income ceiling for a K-12 scholarship under the Education Freedom Tax Credit reaches nearly nine of every 10 American schoolchildren. Here is what that number does, and does not, tell families, schools and donors.',
  },
  {
    image: exploreHomeSchoolQuestion,
    headline: 'Every Child Is Eligible. Whether a Home Counts as a “School” Is a Different Question',
    snippet:
      'Two families can teach the same curriculum at the same kitchen table and reach different answers about whether a federal scholarship can pay for it. The reason sits in one cross-reference buried in the tax code, and Treasury has now confirmed it in writing.',
  },
  {
    image: exploreWhoCanReceive,
    headline:
      'Who Can Receive a Scholarship Under the Education Freedom Tax Credit? New Report Details Estimates for Every State',
    snippet:
      'This difference between Indiana and Michigan is just one of the contrasts at the center of a report I published this week with the American Federation for Children. It asks a question that sounds simple but turns out to be a bit more complicated upon further investigation:',
  },
  {
    image: exploreWaitingRoom,
    headline: 'The Waiting Room: Why No State Has Certified SGOs Yet — and Why That’s Okay',
    snippet:
      'Thirty states have said yes. The launch date is fixed. And yet, six months out, the number of officially certified scholarship organizations in America is exactly zero. Here’s why that’s the plan working and not failing.',
  },
  {
    image: explore1700ActuallyGives,
    headline: 'What Your $1,700 Actually Gives: A Walk Through the 90% Rule',
    snippet:
      'Every donor has wondered it: how much of my gift actually reaches a kid? For the Education Freedom Tax Credit, Congress didn’t leave the answer to chance. It wrote it into the law.',
  },
  {
    image: exploreHurricaneStory,
    headline: 'Before There Was a Federal Credit, There Was a Hurricane: The 25-Year Story Behind the EFTC',
    snippet:
      'It’s the final chapter of a story that runs through a Phoenix statehouse, a Florida governor’s desk, a catastrophic hurricane, and four Supreme Court decisions.',
  },
  {
    image: exploreMapHalfFull,
    headline: 'The Map Is Half Full: Inside the Year America’s Governors Chose Sides on School Choice',
    snippet:
      'One year ago, not a single state had signed up for the Education Freedom Tax Credit. Today, 30 are on the map — and the story of how they got there involves midnight signatures, three veto overrides, and a few political conversions nobody saw coming.',
  },
];

// Ground truth: the real afc/story-listing block (confirmed live on
// /how-the-eftc-works/) — a paginated 4-up .afc-content-grid--4 with a
// fielded CTA card spliced into the 4th grid cell, plus an
// .afc-listing__pagination bar below (prev arrow, "Page" + number input,
// "of N", next arrow). Only page 1's data exists in this prototype, so the
// pager is rendered inert: prev disabled, next enabled but non-functional,
// matching established convention for controls with no real destination.
export default function StoriesGrid({ heading = (
  <>
    More To <strong>Explore</strong>
  </>
), articles = DEFAULT_ARTICLES, page = 1, pageCount = 6 }) {
  return (
    <section className="afc-explore">
      <div className="afc-wide">
        <div className="afc-explore__header">
          <h2 className="afc-explore__heading">{heading}</h2>
        </div>

        <div className="afc-explore__grid">
          {articles.slice(0, 3).map((article) => (
            <a
              className="afc-explore__card"
              href="#"
              onClick={(e) => e.preventDefault()}
              key={article.headline}
            >
              <div className="afc-explore__image-wrap">
                <img className="afc-explore__image" src={article.image} alt="" loading="lazy" />
              </div>
              <h3 className="afc-explore__headline">{article.headline}</h3>
              <p className="afc-explore__snippet">{article.snippet}</p>
            </a>
          ))}

          <StoryListingCta backgroundImage={listingCtaBg} />

          {articles.slice(3).map((article) => (
            <a
              className="afc-explore__card"
              href="#"
              onClick={(e) => e.preventDefault()}
              key={article.headline}
            >
              <div className="afc-explore__image-wrap">
                <img className="afc-explore__image" src={article.image} alt="" loading="lazy" />
              </div>
              <h3 className="afc-explore__headline">{article.headline}</h3>
              <p className="afc-explore__snippet">{article.snippet}</p>
            </a>
          ))}
        </div>

        <nav className="afc-explore__pagination" aria-label="Listing pagination">
          <button type="button" className="afc-explore__arrow afc-explore__arrow--prev" aria-label="Previous page" disabled>
            <span aria-hidden="true">←</span>
          </button>
          <label className="afc-explore__page-label" htmlFor="afc-explore-page-input">
            Page
          </label>
          <input
            type="number"
            inputMode="numeric"
            className="afc-explore__page-input"
            id="afc-explore-page-input"
            defaultValue={page}
            min="1"
            max={pageCount}
            aria-label="Current page — type a number and press Enter to jump"
          />
          <span className="afc-explore__page-of">of {pageCount}</span>
          <button
            type="button"
            className="afc-explore__arrow afc-explore__arrow--next"
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
