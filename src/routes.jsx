import { Routes, Route } from 'react-router-dom';
import SiteShell from './components/layout/SiteShell.jsx';
import Home from './pages/Home/Home.jsx';
import HowTheEftcWorks from './pages/HowTheEftcWorks/HowTheEftcWorks.jsx';
import ResourceCenter from './pages/ResourceCenter/ResourceCenter.jsx';
import AboutUs from './pages/AboutUs/AboutUs.jsx';
import Stories from './pages/Stories/Stories.jsx';
import ForParents from './pages/ForParents/ForParents.jsx';
import ForSchools from './pages/ForSchools/ForSchools.jsx';
import BlankPage from './pages/Placeholder/BlankPage.jsx';
import DonationFlowLayout from './pages/Donate/DonationFlowLayout.jsx';
import ChooseFund from './pages/Donate/ChooseFund.jsx';
import ChooseState from './pages/Donate/ChooseState.jsx';
import ChooseSchool from './pages/Donate/ChooseSchool.jsx';

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
        <Route path="/eligibility-calculator" element={<BlankPage title="Eligibility Calculator" />} />
        <Route path="/impact-calculator" element={<BlankPage title="Impact Calculator" />} />
        <Route path="/donate" element={<DonationFlowLayout />}>
          <Route index element={<ChooseFund />} />
          <Route path="state" element={<ChooseState />} />
          <Route path="school" element={<ChooseSchool />} />
          <Route path="gift-amount" element={<BlankPage title="Select Gift Amount" />} />
        </Route>
        <Route path="*" element={<BlankPage title="Page not found" />} />
      </Route>
    </Routes>
  );
}
