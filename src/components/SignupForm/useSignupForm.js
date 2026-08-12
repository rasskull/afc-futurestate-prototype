import { useState } from 'react';

const initialValues = {
  email: '',
  firstName: '',
  lastName: '',
  state: '',
  phone: '',
  updatesOptIn: false,
};

function validate(values) {
  const errors = {};
  if (!values.email.trim()) {
    errors.email = 'This field is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'This field must contain a valid email';
  }
  if (!values.firstName.trim()) errors.firstName = 'This field is required';
  if (!values.lastName.trim()) errors.lastName = 'This field is required';
  if (!values.updatesOptIn) errors.updatesOptIn = 'This field is required';
  return errors;
}

export function useSignupForm({ initiallyExpanded = false } = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success
  const [expanded, setExpanded] = useState(initiallyExpanded);

  const expand = () => setExpanded(true);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 400);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setStatus('idle');
    setExpanded(initiallyExpanded);
  };

  return { values, errors, status, expanded, expand, handleChange, handleSubmit, reset };
}
