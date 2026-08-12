import Hero from '../../components/Hero/Hero.jsx';
import NarrativeBlock from '../../components/NarrativeBlock/NarrativeBlock.jsx';
import Stats from '../../components/Stats/Stats.jsx';
import SignupFooter from '../Home/SignupFooter.jsx';
import AboutCards from './AboutCards.jsx';
import People from './People.jsx';
import aboutHeroImage from '../../assets/photos/about-hero-bg.webp';

export default function AboutUs() {
  return (
    <>
      <Hero
        backgroundImage={aboutHeroImage}
        theme="light"
        title="America’s"
        subtitle="Scholarship Network"
        lead="AFC Scholarship Fund is the most connected path between donors and students — powered by Odyssey’s national scholarship infrastructure and AFC’s footprint across multiple states — so that every American family can reach the school that’s right for their child."
        ctaLabel=""
      />
      <NarrativeBlock
        heading={
          <>
            Built for <strong>this moment</strong>
          </>
        }
        subheading="By people who’ve done this for decades"
        lead=""
        body={[
          'For over two decades, the American Federation for Children has worked so that a child’s zip code doesn’t decide the quality of their education. AFC Scholarship Fund carries that work into a new era.',
          'The Education Freedom Tax Credit is the largest opportunity in a generation to put real choice in parents’ hands. We built AFC Scholarship Fund as a network — not a single program in a single state — so the families who need it most can be reached wherever they live.',
        ]}
        checklistItems={[]}
      />
      <AboutCards />
      <Stats staggered />
      <People />
      <SignupFooter
        heading={
          <>
            Be Part of <strong>What Comes Next</strong>
          </>
        }
      />
    </>
  );
}
