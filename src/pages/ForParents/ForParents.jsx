import Hero from '../../components/Hero/Hero.jsx';
import Stats from '../../components/Stats/Stats.jsx';
import FeaturedStory from '../../components/FeaturedStory/FeaturedStory.jsx';
import Faq from '../../components/Faq/Faq.jsx';
import SignupInline from '../Home/SignupInline.jsx';
import SignupFooter from '../Home/SignupFooter.jsx';
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
        lead="Find the right school for your child — and a scholarship to help pay for it. Register your interest and we’ll keep you posted on when applications open and how to apply."
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
      <SignupInline
        heading={
          <>
            <strong>Get Notified</strong> When Applications Open
          </>
        }
        supportCopy="Scholarship application windows open after the Education Freedom Tax Credit activates in 2027. Register now and we’ll email you the moment applications open in your state — with everything you need to apply."
        formClassName="afc-signup-form--compact-heading"
      />
      <FeaturedStory />
      <Faq />
      <SignupFooter
        heading={
          <>
            Get Notified <strong>When Applications Open</strong>
          </>
        }
        supportCopy="Register now and we’ll email you the moment applications open in your state."
      />
    </>
  );
}
