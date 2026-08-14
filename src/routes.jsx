import { Routes, Route } from 'react-router-dom';
import SiteShell from './components/layout/SiteShell.jsx';
import Home from './pages/Home/Home.jsx';
import HowTheEftcWorks from './pages/HowTheEftcWorks/HowTheEftcWorks.jsx';
import ResourceCenter from './pages/ResourceCenter/ResourceCenter.jsx';
import AboutUs from './pages/AboutUs/AboutUs.jsx';
import Stories from './pages/Stories/Stories.jsx';
import ForParents from './pages/ForParents/ForParents.jsx';
import ForSchools from './pages/ForSchools/ForSchools.jsx';
import AmericanHeroesFund from './pages/AmericanHeroesFund/AmericanHeroesFund.jsx';
import StoryExample from './pages/StoryExample/StoryExample.jsx';
import BlankPage from './pages/Placeholder/BlankPage.jsx';
import DonationFlowLayout from './pages/Donate/DonationFlowLayout.jsx';
import DonateScrollFlow from './pages/Donate/DonateScrollFlow.jsx';
import ThankYou from './pages/ThankYou/ThankYou.jsx';
import PrototypeScenarios from './pages/Prototype/PrototypeScenarios.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/how-it-works" element={<HowTheEftcWorks />} />
        <Route path="/resource-center" element={<ResourceCenter />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/for-parents" element={<ForParents />} />
        <Route path="/for-schools" element={<ForSchools />} />
        <Route path="/funds/american-heroes" element={<AmericanHeroesFund />} />
        <Route path="/stories/example" element={<StoryExample />} />
        <Route path="/eligibility-calculator" element={<BlankPage title="Eligibility Calculator" />} />
        <Route path="/impact-calculator" element={<BlankPage title="Impact Calculator" />} />
        <Route path="/donate" element={<DonationFlowLayout />}>
          <Route index element={<DonateScrollFlow />} />
        </Route>
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/prototype" element={<PrototypeScenarios />} />
        <Route path="*" element={<BlankPage title="Page not found" />} />
      </Route>
    </Routes>
  );
}
