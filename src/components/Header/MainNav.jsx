import { Link } from 'react-router-dom';
import { mainNavLinks } from '../nav-links.js';
import Button from '../ui/Button.jsx';

export default function MainNav({ className = '', ctaClassName = 'afc-nav-cta', onNavigate }) {
  return (
    <div className={`afc-main-nav ${className}`.trim()}>
      <ul className="afc-main-nav__list">
        {mainNavLinks.map((link) => (
          <li key={link.label}>
            {link.to ? (
              <Link to={link.to} onClick={onNavigate}>
                {link.label}
              </Link>
            ) : (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.();
                }}
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
      <Link to="/donate" className={ctaClassName} onClick={onNavigate}>
        Donate
      </Link>
    </div>
  );
}
