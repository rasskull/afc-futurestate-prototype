import Hero from '../../components/Hero/Hero.jsx';
import NarrativeBlock from '../../components/NarrativeBlock/NarrativeBlock.jsx';
import Stats from '../../components/Stats/Stats.jsx';
import SignupInline from '../Home/SignupInline.jsx';
import SignupFooter from '../Home/SignupFooter.jsx';
import StoriesGrid from '../../components/StoriesGrid/StoriesGrid.jsx';
import Faq from '../../components/Faq/Faq.jsx';
import WhoWeServe from './WhoWeServe.jsx';
import MilitaryChallenges from './MilitaryChallenges.jsx';
import heroBg from '../../assets/photos/american-heroes-hero-bg.jpg';
import storyMilitaryFamilyLife from '../../assets/photos/story-military-family-life.jpg';
import storyGoldStarFamily from '../../assets/photos/story-gold-star-family.jpg';
import storyVeteranDaughter from '../../assets/photos/explore2-veteran-daughter.jpg';

const STATS = [
  { value: '1.2M', label: 'MILITARY-CONNECTED CHILDREN IN K–12 ACROSS THE COUNTRY' },
  { value: '6-9', label: 'SCHOOLS THE AVERAGE MILITARY CHILD ATTENDS BEFORE GRADUATING' },
  { value: '1 in 3', label: 'ACTIVE-DUTY FAMILIES SAY A CHILD’S EDUCATION AFFECTS WHETHER THEY STAY IN SERVICE' },
  { value: '90%+', label: 'OF EVERY QUALIFYING DONATION GOES TO SCHOLARSHIPS, BY FEDERAL RULE' },
];

const MILITARY_STORIES = [
  {
    image: storyMilitaryFamilyLife,
    headline: 'School Choice Is Transforming Military Family Life',
    snippet:
      'Carol Day’s family made sacrifice after sacrifice for military service. School choice — and the Education Freedom Tax Credit — made sure their daughter Savannah didn’t have to sacrifice her education too.',
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
];

const FAQS = [
  {
    question: 'How does the Education Freedom Tax Credit Work',
    answer:
      'You make a charitable donation to a Scholarship Granting Organization like the AFC Scholarship Fund. When you file your federal taxes, you claim a dollar-for-dollar tax credit of up to $1,700 per filer. Credits activate January 1, 2027. Married couples filing jointly share a single $1,700 household credit.',
  },
  {
    question: 'Who qualifies as a “military-connected” student?',
    answer:
      'Children of active-duty service members across all branches, National Guard and Reserve members, Veterans, and Gold Star families. We work with program partners to verify eligibility at the time of scholarship award.',
  },
  {
    question: 'Can scholarships be used at any school?',
    answer:
      'Scholarships from the American Heroes Fund can be used at participating private, parochial, and qualifying specialty schools. Eligible schools must meet AFC Scholarship Fund standards and federal requirements under the EFTC framework.',
  },
  {
    question: 'What if my family moves mid-year?',
    answer:
      'Portability is core to this fund’s design. Scholarships are structured to follow the student when families make a Permanent Change of Station (PCS) or relocate, subject to school enrollment availability at the new location.',
  },
  {
    question: 'Is the AFC Scholarship Fund a registered nonprofit?',
    answer: 'Yes. The AFC Scholarship Fund is a federally qualified (SGO) and 501(c)(3) nonprofit. All donations are tax-deductible to the extent permitted by law.',
  },
  {
    question: 'When can I donate',
    answer:
      'EFTC credits activate January 1, 2027. You can register your interest today — we’ll notify you the moment giving opens and walk you through the process.',
  },
  {
    question: 'How is my gift used, and can I direct it to military families?',
    answer:
      'Your gift funds K–12 scholarships through participating Scholarship Granting Organizations. You can direct it to our Military & Veterans Fund (or by state/school), but federal law bars directing to a specific family. The SGO makes all award decisions independently.',
  },
];

export default function AmericanHeroesFund() {
  return (
    <>
      <Hero
        backgroundImage={heroBg}
        theme="light"
        title="The American Heroes"
        subtitle="Scholarship Fund"
        lead="Honor those who serve by investing in the education of their children. Support military-connected K–12 students through every transition, deployment, and new school."
        ctaLabel="Donate Now"
        ctaTo="/donate?fund=american-heroes"
        secondaryCtaLabel="How the EFTC Works"
        secondaryCtaTo="/how-it-works"
      />

      <NarrativeBlock
        heading={
          <>
            Built for <strong>Every Family</strong> That Serves.
          </>
        }
        lead="The American Heroes Scholarship Fund is designed for the children of every American who wears, has worn, or supported the uniform — regardless of branch, service status, or where they live."
        body={[]}
        checklistItems={[]}
        showLines={false}
      />
      <WhoWeServe />

      <Stats stats={STATS} />

      <SignupInline />

      <NarrativeBlock
        heading={
          <>
            Military Families <strong>Face Challenges</strong> Most Don&rsquo;t.
          </>
        }
        lead="Education continuity is one of the top stressors for military households. The American Heroes Scholarship Fund directly addresses what families have been asking for."
        body={[]}
        checklistItems={[]}
        showLines={false}
      />
      <MilitaryChallenges />

      <StoriesGrid
        heading="Military Stories"
        subheading=""
        ctaLabel="View More Stories"
        stories={MILITARY_STORIES}
        columns={3}
      />

      <Faq faqs={FAQS} />

      <SignupFooter
        heading={
          <>
            Be Part of <strong>What Comes Next</strong>
          </>
        }
        supportCopy="Register your interest and we’ll keep you close to the network as giving opens in 2027."
      />
    </>
  );
}
