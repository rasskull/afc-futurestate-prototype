import Hero from '../../components/Hero/Hero.jsx';
import Stats from '../../components/Stats/Stats.jsx';
import FeaturedStory from '../../components/FeaturedStory/FeaturedStory.jsx';
import Faq from '../../components/Faq/Faq.jsx';
import DonateInline from '../Home/DonateInline.jsx';
import DonateFooter from '../Home/DonateFooter.jsx';
import HowScholarshipsHelp from './HowScholarshipsHelp.jsx';
import WhatCanBeCovered from './WhatCanBeCovered.jsx';
import parentsHeroImage from '../../assets/photos/parents-hero-bg.webp';
import parentsHappensNextBg from '../../assets/photos/parents-happens-next-bg.webp';

const HAPPENS_NEXT_STATS = [
  { value: 'NOW', label: 'Join the list. Register your interest in two minutes.', offsetTop: 55 },
  { value: 'JAN- 2027', label: 'Funding starts. The EFTC is officially live.', offsetTop: 30 },
  { value: 'MID- 2027', label: 'Windows open. Scholarship applications go live.', offsetTop: -30 },
  { value: 'DONE', label: 'We notify you. We email you the moment you can apply.', offsetTop: 20 },
];

export default function ForParents() {
  return (
    <>
      <Hero
        backgroundImage={parentsHeroImage}
        theme="light"
        title={
          <>
            For <strong>Parents</strong>
          </>
        }
        subtitle=""
        lead="Find the right school for your child — and a scholarship to help pay for it."
        ctaLabel="APPLY FOR A SCHOLARSHIP"
        modalTitle="Apply for a Scholarship"
        modalCopy="Sign up to be notified as soon as the Education Freedom Tax Credit launches and scholarship applications open."
      />
      <HowScholarshipsHelp />
      <WhatCanBeCovered />
      <Stats
        heading={
          <>
            Here’s What <strong>Happens Next</strong>
          </>
        }
        intro="Register today, and we’ll let you know the moment scholarship application windows open. The Education Freedom Tax Credit activates January 1, 2027."
        stats={HAPPENS_NEXT_STATS}
        backgroundImage={parentsHappensNextBg}
        backgroundOffsetY={110}
      />
      <DonateInline />
      <FeaturedStory />
      <Faq />
      <DonateFooter />
    </>
  );
}
