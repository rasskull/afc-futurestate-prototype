import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';

export default function SiteShell() {
  const location = useLocation();
  const isDonationFlow = location.pathname.startsWith('/donate');

  // Client-side route changes keep whatever scroll position the previous
  // page was at — a real page load wouldn't. Keyed on pathname only (not
  // the full location) so in-page hash links like the skip-link above don't
  // trigger this; any page needing a different landing spot (e.g. the
  // donation flow's own prefill-scroll) still gets the final word since its
  // own effect runs after this one settles.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
