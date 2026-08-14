import StoryHero from './StoryHero.jsx';
import StoriesGrid from '../../components/StoriesGrid/StoriesGrid.jsx';
import Button from '../../components/ui/Button.jsx';
import videoPoster from '../../assets/photos/story-example-video-poster.jpg';
import classroomImage from '../../assets/photos/story-example-classroom.jpg';
import authorPhoto from '../../assets/photos/about-person-tommy-schultz.jpg';
import storyTwoBrothers from '../../assets/photos/explore2-two-brothers-college.jpg';
import storyAllenThompson from '../../assets/photos/explore2-allen-thompson.jpg';
import storyClay from '../../assets/photos/story-clay-thumb.jpg';
import storyGoldStarFamily from '../../assets/photos/story-gold-star-family.jpg';
import './StoryExample.css';

const RELATED_STORIES = [
  {
    image: storyTwoBrothers,
    headline: 'Their Parents Never Finished Sixth Grade. A Scholarship Helped Send Both Sons to College',
    snippet:
      'Some parents want their kids to have an education. Antoine and Manny’s parents needed an education but never got the chance to finish one. That didn’t stop them from building their whole lives around getting it for their sons.',
  },
  {
    image: storyClay,
    headline: 'From Falling Behind to Team Captain: How School Choice Changed Clay’s Life',
    snippet:
      'Clay’s public school told his mom his goals weren’t “appropriate for second grade.” As a teacher, she knew better. A scholarship gave her the chance to prove it, and today her son is thriving in a classroom built around how he learns.',
  },
  {
    image: storyAllenThompson,
    headline: 'School Choice Gave Allen Thompson a Second Chance. Now He’s Giving It to His Students',
    snippet:
      'Allen Thompson waited four years for a magnet school seat while his mom sacrificed every morning to get him there. Today he’s the teacher he once needed.',
  },
  {
    image: storyGoldStarFamily,
    headline: 'Gold Star Family Finds Relief Through School Choice',
    snippet:
      'When Jessica lost her husband in the line of duty, she became the sole decision-maker for her two daughters. She says the Opportunity Scholarship doesn’t just help with tuition — it gives her back something grief tried to take: the ability to choose.',
  },
];

export default function StoryExample() {
  return (
    <>
      <StoryHero />

      <div className="afc-content afc-story-body">
        <p className="afc-story-body__lead">
          One mother’s belief—and the power of school choice—set Mya on a path to one of the top
          boarding schools in the country.
        </p>

        <figure className="afc-story-body__video">
          <video
            className="afc-story-body__video-el"
            controls
            poster={videoPoster}
            aria-label="Mya’s story"
            src="https://afcscholarshipfund.org/wp-content/uploads/2026/06/STORY_Mya_AFCSF_V1_1080p.mp4"
          />
        </figure>

        <p>
          At first, Mya didn’t want to go. “My mom found out about WSG, not me,” she says. “At
          first, I wasn’t really liking the idea.” Like many students, she was comfortable where
          she was, and change felt uncertain. But her mother saw something more—something Mya
          hadn’t fully discovered yet.
        </p>

        <blockquote className="afc-story-body__quote">
          <p>“She knew I had that leadership aspect in me. It just needed to be opened more.”</p>
        </blockquote>

        <p>
          That belief—and the power of school choice—led her family to the Washington School for
          Girls (WSG).
        </p>

        <h2>When School Choice Unlocks Potential</h2>

        <p>
          At her previous school, Mya’s potential was there, but it hadn’t fully taken shape. Her
          mom believed a different environment could make the difference, and through school
          choice, she was able to explore options beyond the default assignment and find a school
          that matched her daughter’s needs.
        </p>

        <figure className="afc-story-body__image">
          <img
            src={classroomImage}
            alt="Mya showing her grade to a classmate at Washington School for Girls"
            loading="lazy"
          />
        </figure>

        <p>
          “And I think she knew that WSG would be the best place for me to be more open to new
          things and really find myself as a person,” Mya says. At WSG, that transformation began
          to take hold.
        </p>

        <h2>A School Built on Opportunity</h2>

        <p>
          “Mya is an amazing eighth grade student,” one school leader shares. “She has taken the
          opportunity to really lean into all of the activities and opportunities that the school
          offers.”
        </p>

        <p>
          Those opportunities are what make schools like WSG so powerful. “My favorite thing about
          this school is the opportunities they present,” Mya says. “They open me up to
          experience new things—like going to Thailand, playing the piano, and learning
          basketball.”
        </p>

        <p>
          From partnerships with organizations like the Boys and Girls Club and the Levine School
          of Music to extracurricular and cultural experiences, WSG helps students grow far beyond
          the classroom. This is what school choice makes possible: access to environments where
          students can explore, grow, and lead.
        </p>

        <h2>Finding Confidence—and a Future</h2>

        <p>
          Over time, Mya began to see herself differently. “She really deepened her own leadership
          within herself and found her voice,” her teacher explains. That growth didn’t just
          change her present—it reshaped her future.
        </p>

        <p>
          “Well, I’m going to one of the top five boarding schools in the USA,” Mya says. What once
          may have felt out of reach is now her reality.
        </p>

        <h2>Why School Choice and K–12 Scholarships Matter</h2>

        <p>
          Mya’s story reflects what happens when families are given real educational options. For
          many families, access to schools like the Washington School for Girls depends on
          financial support—and that’s where K–12 scholarships come in. Scholarships make school
          choice accessible—not just theoretical—ensuring families can choose the school that
          works best for their child, regardless of income or zip code.
        </p>

        <h2>Expanding School Choice Through the Education Freedom Tax Credit</h2>

        <p>
          Beginning January 1, 2027, more families will be able to access opportunities like Mya’s
          through the Education Freedom Tax Credit (EFTC). The EFTC allows eligible donors to
          contribute to scholarship granting organizations (SGOs) and receive a dollar-for-dollar
          federal tax credit of up to $1,700. Contributions above $1,700 qualify as a standard
          501(c)(3) charitable deduction. There is no cap on how much you can give.
        </p>

        <p>
          Those contributions fund K–12 scholarships, expanding school choice nationwide. This
          means more families can access the right school, more students can find environments
          where they thrive, and more stories like Mya’s become possible.
        </p>

        <h2>The Power of One Choice</h2>

        <p>
          Mya didn’t choose WSG at first—her mom did. But that one decision, made possible through
          school choice, changed everything. It opened doors, built confidence, and set her on a
          path to one of the top boarding schools in the country.
        </p>

        <p>
          That’s the impact of school choice, and that’s what expanding K–12 scholarships through
          the Education Freedom Tax Credit can do for millions more students.
        </p>

        <p>
          Students like Mya thrive when families have the freedom to choose the right school.
          Through the AFC Scholarship Fund, donors can help expand school choice by supporting
          K–12 scholarships for students across the country.
        </p>

        <div className="afc-story-body__whats-next">
          <p>
            <strong>What’s Next:</strong> Contributions to a qualifying scholarship granting
            organization (SGO) can be made at any point during the 2027 calendar year. When your
            2027 federal return is filed, you will claim the Education Freedom Tax Credit and it
            will be applied directly against your federal tax liability.
          </p>
        </div>

        <div className="afc-story-body__cta">
          <p className="afc-story-body__cta-eyebrow">Make an impact</p>
          <h2 className="afc-story-body__cta-heading">Help fund the next story like Mya’s</h2>
          <p className="afc-story-body__cta-body">
            Your gift funds a K–12 scholarship, and gives eligible donors a dollar-for-dollar
            federal tax credit of up to $1,700 when the Education Freedom Tax Credit launches.
          </p>
          <Button variant="solid" to="/donate">
            Donate Now
          </Button>
        </div>

        <div className="afc-story-body__author">
          <img className="afc-story-body__author-photo" src={authorPhoto} alt="" />
          <div className="afc-story-body__author-content">
            <p className="afc-story-body__author-eyebrow">About the Author</p>
            <p className="afc-story-body__author-name">Tommy Schultz</p>
            <p className="afc-story-body__author-role">Chief Executive Officer</p>
            <p className="afc-story-body__author-bio">
              Tommy Schultz is CEO of the American Federation for Children (AFC). He is Stanford
              graduate with more than a decade of experience at all levels of AFC. In his time at
              AFC, Tommy has been the organization’s primary public voice during the most prolific
              era of school choice lawmaking in American history. During his time as CEO, AFC has
              raised and deployed $179 million across half of the country. During that time,
              private school choice program enrollment grew from 540,000 to 1.6 million today as
              AFC passed 80 laws across 30 states, including the Education Freedom Tax Credit
              (EFTC).
            </p>
          </div>
        </div>
      </div>

      <StoriesGrid
        heading="Related Stories"
        subheading=""
        ctaLabel="View More Stories"
        stories={RELATED_STORIES}
      />
    </>
  );
}
