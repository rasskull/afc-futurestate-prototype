import Hero from '../../components/Hero/Hero.jsx';
import NarrativeBlock from '../../components/NarrativeBlock/NarrativeBlock.jsx';
import Video from '../../components/Video/Video.jsx';
import HowItWorks from '../../components/HowItWorks/HowItWorks.jsx';
import SignupInline from './SignupInline.jsx';
import EligibilityPromo from '../../components/EligibilityPromo/EligibilityPromo.jsx';
import FeaturedStory from '../../components/FeaturedStory/FeaturedStory.jsx';
import StoriesGrid from '../../components/StoriesGrid/StoriesGrid.jsx';
import AudienceRouting from './AudienceRouting.jsx';
import Faq from '../../components/Faq/Faq.jsx';
import SignupFooter from './SignupFooter.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <NarrativeBlock />
      <Video paddingTop="0" />
      <HowItWorks />
      <SignupInline />
      <EligibilityPromo />
      <FeaturedStory />
      <StoriesGrid />
      <AudienceRouting />
      <Faq />
      <SignupFooter />
    </>
  );
}
