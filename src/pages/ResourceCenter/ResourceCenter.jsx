import Hero from '../../components/Hero/Hero.jsx';
import StoriesGrid from '../../components/StoriesGrid/StoriesGrid.jsx';
import DownloadGuides from '../../components/DownloadGuides/DownloadGuides.jsx';
import ResourceTools from './ResourceTools.jsx';
import SignupFooter from '../Home/SignupFooter.jsx';
import resourceHeroImage from '../../assets/photos/resource-center-hero-bg.webp';
import { RESOURCE_CENTER_STORIES } from './StoriesGridContent.js';

export default function ResourceCenter() {
  return (
    <>
      <Hero
        backgroundImage={resourceHeroImage}
        theme="light"
        title={
          <>
            <strong>Resource</strong> Center
          </>
        }
        subtitle=""
        lead="Everything you need to understand the Education Freedom Tax Credit and give with confidence — guides, calculators, and clear answers, all in one place."
        ctaLabel=""
      />
      <ResourceTools />
      <DownloadGuides />
      <StoriesGrid
        heading="More to Explore"
        ctaLabel="Explore More Articles"
        stories={RESOURCE_CENTER_STORIES}
      />
      <SignupFooter />
    </>
  );
}
