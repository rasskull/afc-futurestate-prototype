import Button from '../ui/Button.jsx';
import goldStarFamilyImage from '../../assets/photos/story-gold-star-family.jpg';
import samMyersImage from '../../assets/photos/story-sam-myers.jpg';
import kingdomLifeAcademyImage from '../../assets/photos/story-kingdom-life-academy.jpg';
import myaImage from '../../assets/photos/story-mya.jpg';
import './StoriesGrid.css';

const DEFAULT_STORIES = [
  {
    image: goldStarFamilyImage,
    alt: 'Gold Star mother Jessica with her daughters Elizabeth and Caroline',
    headline: 'GOLD STAR FAMILY FINDS RELIEF THROUGH SCHOOL CHOICE',
    snippet:
      'When Jessica lost her husband in the line of duty, she became the sole decision-maker for her two daughters. She says the Opportunity Scholarship doesn’t just help with tuition — it gives her back something grief tried to take: the ability to choose.',
  },
  {
    image: samMyersImage,
    alt: '',
    headline: 'HOW SCHOOL CHOICE CHANGED SAM MYERS’ LIFE AND OPENED DOORS FOR THOUSANDS MORE',
    snippet:
      'Samuel Myers works two jobs. He has a girlfriend. He started his own card-making business. He even met the President. But more than 30 years ago, none of this seemed possible.',
  },
  {
    image: kingdomLifeAcademyImage,
    alt: 'Students at Kingdom Life Academy, a Christian micro-school, engaged in hands-on classroom learning',
    headline: 'KINGDOM LIFE ACADEMY: A CHRISTIAN MICRO-SCHOOL PREPARING STUDENTS FOR REAL LIFE',
    snippet:
      'For many low-income families, finding the right school can mean the difference between a child dropping out — or discovering their purpose.',
  },
  {
    image: myaImage,
    alt: 'Mya, a Washington School for Girls student, smiling in her school uniform',
    headline: 'SHE ALMOST DIDN’T GO: HOW SCHOOL CHOICE HELPED MYA REACH A TOP SCHOOL',
    snippet:
      'One mother’s belief—and the power of school choice—set Mya on a path to one of the top boarding schools in the country.',
  },
];

export default function StoriesGrid({
  heading = 'Stories',
  subheading = 'Stay informed with our latest articles, news, and scholarship stories.',
  stories = DEFAULT_STORIES,
  ctaLabel = 'View More Stories',
  // Desktop column count — 4 by default (matches every current usage);
  // lower it when there are fewer stories to show so the grid doesn't leave
  // a dangling empty column. Mobile's 2-up/1-up breakpoints are unaffected.
  columns = 4,
}) {
  return (
    <section className="afc-stories">
      <div className="afc-wide">
        <div className="afc-stories__header">
          <div className="afc-stories__header-left">
            <h2 className="afc-stories__heading">
              <strong>{heading}</strong>
            </h2>
            {subheading && <p className="afc-stories__subheading">{subheading}</p>}
          </div>
          <div className="afc-stories__header-right">
            <Button
              className="afc-stories__cta"
              variant="solid"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              {ctaLabel}
            </Button>
          </div>
        </div>

        <div className="afc-stories__grid" style={{ '--afc-stories-columns': columns }}>
          {stories.map((story) => (
            <a
              className="afc-stories__card"
              href="#"
              onClick={(e) => e.preventDefault()}
              key={story.headline}
            >
              <div className="afc-stories__image-wrap">
                <img
                  className="afc-stories__image"
                  src={story.image}
                  alt={story.alt}
                  loading="lazy"
                />
              </div>
              <h3 className="afc-stories__headline">{story.headline}</h3>
              <p className="afc-stories__snippet">{story.snippet}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
