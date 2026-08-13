import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';

export default function SiteShell() {
  const location = useLocation();
  const isDonationFlow = location.pathname.startsWith('/donate');

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer className={isDonationFlow ? 'afc-footer--hide-mobile' : ''} />
    </>
  );
}
