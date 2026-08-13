import { Link } from 'react-router-dom';
import { utilityNavLinks } from '../nav-links.js';

export default function UtilityNav({ className = 'afc-utility-nav', onNavigate }) {
  return (
    <nav className={className} aria-label="Utility">
      <Link className="afc-utility-nav__link" to={utilityNavLinks[0].to} onClick={onNavigate}>
        {utilityNavLinks[0].label}
      </Link>
      <span className="afc-utility-nav__divider" aria-hidden="true" />
      <Link className="afc-utility-nav__link" to={utilityNavLinks[1].to} onClick={onNavigate}>
        {utilityNavLinks[1].label}
      </Link>
    </nav>
  );
}
