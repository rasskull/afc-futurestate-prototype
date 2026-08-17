import Hero from '../../components/Hero/Hero.jsx';
import NarrativeBlock from '../../components/NarrativeBlock/NarrativeBlock.jsx';
import Video from '../../components/Video/Video.jsx';
import HowItWorks from '../../components/HowItWorks/HowItWorks.jsx';
import DonateInline from './DonateInline.jsx';
import EligibilityPromo from '../../components/EligibilityPromo/EligibilityPromo.jsx';
import FeaturedStory from '../../components/FeaturedStory/FeaturedStory.jsx';
import StoriesGrid from '../../components/StoriesGrid/StoriesGrid.jsx';
import AudienceRouting from './AudienceRouting.jsx';
import Faq from '../../components/Faq/Faq.jsx';
import DonateFooter from './DonateFooter.jsx';

export default function Home() {
  return (
    <>
      <Hero ctaLabel="Donate Now" ctaTo="/donate" />
      <NarrativeBlock />
      <Video paddingTop="0" />
      <HowItWorks />
      <DonateInline />
      <EligibilityPromo />
      <FeaturedStory />
      <StoriesGrid />
      <AudienceRouting />
      <Faq />
      <DonateFooter />
    </>
  );
}
