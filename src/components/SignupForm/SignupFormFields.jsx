import { states } from '../../data/states.js';

export function EmailField({ value, error, onChange, onFocus, onKeyDown }) {
  return (
    <div className="afc-signup-field">
      <label htmlFor="signup-email">Email Address</label>
      <input
        id="signup-email"
        type="email"
        placeholder="Email Address"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
      />
      {error && <p className="afc-signup-field__error">{error}</p>}
    </div>
  );
}

export default function LeadFields({ values, errors, onChange, firstFieldRef }) {
  return (
    <>
      <div className="afc-signup-field-row">
        <div className="afc-signup-field">
          <label htmlFor="signup-first-name">First Name</label>
          <input
            ref={firstFieldRef}
            id="signup-first-name"
            type="text"
            placeholder="First"
            value={values.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
          />
          {errors.firstName && <p className="afc-signup-field__error">{errors.firstName}</p>}
        </div>
        <div className="afc-signup-field">
          <label htmlFor="signup-last-name">Last Name</label>
          <input
            id="signup-last-name"
            type="text"
            placeholder="Last"
            value={values.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
          />
          {errors.lastName && <p className="afc-signup-field__error">{errors.lastName}</p>}
        </div>
      </div>

      <div className="afc-signup-field-row">
        <div className="afc-signup-field">
          <label htmlFor="signup-state">State</label>
          <select
            id="signup-state"
            value={values.state}
            onChange={(e) => onChange('state', e.target.value)}
          >
            <option value="">&ndash; Select &ndash;</option>
            {states.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="afc-signup-field">
          <label htmlFor="signup-phone">Phone Number</label>
          <input
            id="signup-phone"
            type="text"
            placeholder="(555) 000-0000"
            value={values.phone}
            onChange={(e) => onChange('phone', e.target.value)}
          />
        </div>
      </div>

      <div className="afc-signup-field afc-signup-field--checkbox">
        <label>
          <input
            type="checkbox"
            checked={values.updatesOptIn}
            onChange={(e) => onChange('updatesOptIn', e.target.checked)}
          />
          <span>
            Sign me up to receive text message updates from the AFC Scholarship Fund about school
            choice and the Education Freedom Tax Credit.
          </span>
        </label>
        {errors.updatesOptIn && <p className="afc-signup-field__error">{errors.updatesOptIn}</p>}
      </div>

      <p className="afc-signup-disclaimer">
        Disclaimer: Opt-in disclaimer: By providing your phone number and submitting this form, you
        are subscribing/consenting to receive SMS/MMS messages to that number, including donation
        asks, newsletters, and school choice news from the AFC Growth Fund and AFC Scholarship Fund.
        Message and data rates may apply. Message frequency varies. Reply STOP to opt-out at any
        time, reply HELP for help. The AFC Growth Fund and AFC Scholarship Fund are happy to help
        at <a href="tel:18004587313">1-800-458-7313</a>. SMS opt-in will not be sold, rented, or
        shared with any third parties/affiliates unless required by law. You can view our{' '}
        <a href="https://afcscholarshipfund.org/privacy-policy/" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a
          href="https://afcscholarshipfund.org/mobile-terms-conditions/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mobile Terms and Conditions
        </a>{' '}
        here.
      </p>
    </>
  );
}
