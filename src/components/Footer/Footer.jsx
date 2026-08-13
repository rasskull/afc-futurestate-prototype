import { Link } from 'react-router-dom';
import { mainNavLinks, footerLegalLinks } from '../nav-links.js';
import logoWhite from '../../assets/logos/afc-horizontal-white.png';
import './Footer.css';

export default function Footer({ className = '' }) {
  return (
    <footer className={`afc-footer ${className}`.trim()}>
      <div className="afc-wide afc-footer-stack">
        <div className="afc-footer-top">
          <Link className="afc-footer-logo" to="/" aria-label="AFC Scholarship Fund — home">
            <img src={logoWhite} alt="AFC Scholarship Fund" width="628" height="112" />
          </Link>

          <nav className="afc-footer-nav" aria-label="Footer">
            <ul>
              {mainNavLinks.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link to={link.to}>{link.label}</Link>
                  ) : (
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
              <li>
                {/* Same "Donate" pathway as the header CTA. */}
                <Link to="/donate">Donate</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="afc-footer-bottom">
          <p className="afc-footer-tagline">
            Building a scalable future for education through scholarship tax credits and community
            support.
          </p>
          <p className="afc-footer-legal">
            &copy; 2026 AFC Scholarship Fund. All rights reserved. EIN: 41-3421652
          </p>
          <ul className="afc-footer-legal-links">
            {footerLegalLinks.map((link) => (
              <li key={link.label}>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
