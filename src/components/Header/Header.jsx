import { useState } from 'react';
import { Link } from 'react-router-dom';
import UtilityNav from './UtilityNav.jsx';
import MainNav from './MainNav.jsx';
import { useHeaderScroll } from './useHeaderScroll.js';
import { useHeaderHeightVar } from './useHeaderHeightVar.js';
import logo from '../../assets/logos/afc-primary-gradient.png';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useHeaderScroll();
  const headerRef = useHeaderHeightVar();

  return (
    <div ref={headerRef} className={`afc-header-wrapper ${isScrolled ? 'is-scrolled' : ''}`.trim()}>
      <div className="afc-utility-row">
        <div className="afc-wide afc-utility-row__inner">
          <UtilityNav />
        </div>
      </div>

      <header className={`afc-header ${isScrolled ? 'is-scrolled' : ''}`.trim()}>
        <div className="afc-wide afc-header__inner">
          <Link className="afc-site-logo" to="/" aria-label="AFC Scholarship Fund — home">
            <img src={logo} alt="AFC Scholarship Fund" width="628" height="112" />
          </Link>

          <MainNav className="afc-main-nav--desktop" />

          <button
            type="button"
            className="afc-hamburger"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {isMenuOpen && (
          <div className="afc-mobile-panel">
            <Link
              className="afc-site-logo afc-site-logo--mobile"
              to="/"
              aria-label="AFC Scholarship Fund — home"
              onClick={() => setIsMenuOpen(false)}
            >
              <img src={logo} alt="AFC Scholarship Fund" width="628" height="112" />
            </Link>
            <UtilityNav
              className="afc-utility-nav afc-utility-nav--mobile"
              onNavigate={() => setIsMenuOpen(false)}
            />
            <MainNav className="afc-main-nav--mobile" onNavigate={() => setIsMenuOpen(false)} />
          </div>
        )}
      </header>
    </div>
  );
}
