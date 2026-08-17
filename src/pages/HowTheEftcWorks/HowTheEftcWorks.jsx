import Hero from '../../components/Hero/Hero.jsx';
import HowItWorks from '../../components/HowItWorks/HowItWorks.jsx';
import Video from '../../components/Video/Video.jsx';
import EligibilityPromo from '../../components/EligibilityPromo/EligibilityPromo.jsx';
import Faq from '../../components/Faq/Faq.jsx';
import DonateFooter from '../Home/DonateFooter.jsx';
import FeaturedArticlesBlue from './FeaturedArticlesBlue.jsx';
import StoriesGrid from './StoriesGrid.jsx';
import eftcHeroImage from '../../assets/photos/eftc-hero.webp';

export default function HowTheEftcWorks() {
  return (
    <>
      <Hero
        backgroundImage={eftcHeroImage}
        title={
          <>
            How the <strong>EFTC</strong> Works
          </>
        }
        subtitle="The Education Freedom Tax Credit"
        lead="Starting in 2027, a new federal tax credit lets you fund a scholarship for a child — and claim up to $1,700 back, dollar for dollar. Here’s exactly how it works."
        ctaLabel="Check My Eligibility"
        ctaTo="/eligibility-calculator"
      />
      <HowItWorks />
      <Video
        heading={
          <>
            VIDEO <strong>OVERVIEW</strong>
          </>
        }
        body="Watch our video to learn more about how the EFTC works."
      />
      <EligibilityPromo />
      <FeaturedArticlesBlue />
      <StoriesGrid pageCount={7} />
      <Faq />
      <DonateFooter />
    </>
  );
}
