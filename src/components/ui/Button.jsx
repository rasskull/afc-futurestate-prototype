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
