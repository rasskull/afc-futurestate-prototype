import { useRef } from 'react';
import { useSignupForm } from './useSignupForm.js';
import LeadFields, { EmailField } from './SignupFormFields.jsx';
import Button from '../ui/Button.jsx';
import './SignupForm.css';

export default function SignupForm({
  variant = 'inline',
  theme = 'light',
  heading,
  supportCopy,
  submitLabel = 'SIGN UP',
  // Extra class(es) for the root element — lets a specific instance apply a
  // scoped style override (e.g. a smaller heading) without affecting every
  // other SignupForm usage sitewide.
  className = '',
}) {
  const { values, errors, status, expanded, expand, handleChange, handleSubmit } = useSignupForm({
    // Progressive disclosure (collapsed email-only state) is an email-signup
    // block behavior — the modal variant (afc/fluent-form-modal) shows every
    // field at once, matching the real site's popup UX.
    initiallyExpanded: variant === 'modal',
  });
  const firstLeadFieldRef = useRef(null);

  const classes = [
    'afc-signup-form',
    `afc-signup-form--${variant}`,
    `afc-signup-form--${theme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (status === 'success') {
    return (
      <div className={classes}>
        <p className="afc-signup-form__success">
          Thank you for your message. We will get in touch with you shortly.
        </p>
      </div>
    );
  }

  const handleEmailKeyDown = (event) => {
    if (event.key === 'Enter' && !expanded) {
      event.preventDefault();
      expand();
      requestAnimationFrame(() => firstLeadFieldRef.current?.focus());
    }
  };

  return (
    <div className={classes}>
      {heading && <h2 className="afc-signup-form__heading">{heading}</h2>}
      {supportCopy && <p className="afc-signup-form__support-copy">{supportCopy}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <EmailField
          value={values.email}
          error={errors.email}
          onChange={(value) => handleChange('email', value)}
          onFocus={expand}
          onKeyDown={handleEmailKeyDown}
        />

        <div
          className={`afc-signup-form__lead-wrap${expanded ? ' afc-signup-form__lead-wrap--expanded' : ''}`}
          aria-hidden={!expanded}
        >
          <LeadFields
            values={values}
            errors={errors}
            onChange={handleChange}
            firstFieldRef={firstLeadFieldRef}
          />
          <Button type="submit" variant="solid" className="afc-signup-form__submit">
            {status === 'submitting' ? 'Signing up…' : submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}
