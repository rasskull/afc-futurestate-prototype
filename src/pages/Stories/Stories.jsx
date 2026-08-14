import Hero from '../../components/Hero/Hero.jsx';
import FeaturedStory from '../../components/FeaturedStory/FeaturedStory.jsx';
import AllStories from './AllStories.jsx';
import EligibilityPromo from '../../components/EligibilityPromo/EligibilityPromo.jsx';
import SignupFooter from '../Home/SignupFooter.jsx';
import storiesHeroImage from '../../assets/photos/stories-hero-bg.jpg';
import featuredStoryBg from '../../assets/photos/featured-story-bg-stories.jpg';

export default function Stories() {
  return (
    <>
      <Hero
        backgroundImage={storiesHeroImage}
        theme="light"
        title={<strong>Stories</strong>}
        subtitle={
          <>
            Every Story Begins
            <br />
            With The Student
          </>
        }
        lead="Stay informed with our latest articles, news, and scholarship stories."
        ctaLabel=""
      />
      <FeaturedStory backgroundImage={featuredStoryBg} copyTheme="light" />
      <AllStories />
      <EligibilityPromo
        lead="The Education Freedom Tax Credit gives eligible donors a dollar-for-dollar federal tax credit of up to $1,700 for contributions to qualifying K–12 scholarship organizations. Answer three quick questions to find out if you qualify — and exactly how much your credit could be."
        bullets={['Check your eligibility in under a minute', 'See your estimated credit amount instantly', 'Results emailed directly to you']}
      />
      <SignupFooter />
    </>
  );
}
