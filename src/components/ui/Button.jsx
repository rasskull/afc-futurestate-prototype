import { Link } from 'react-router-dom';
import './Button.css';

export default function Button({
  variant = 'solid',
  to,
  href,
  onClick,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const classes = `afc-button afc-button--${variant} ${className}`.trim();

  // An absolute URL passed as `to` (e.g. a real live-site page like the
  // eligibility calculator, which isn't part of this prototype's own
  // routes) isn't a route react-router's <Link> can resolve — render a
  // real anchor that opens it in a new tab instead.
  if (to && /^https?:\/\//.test(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
