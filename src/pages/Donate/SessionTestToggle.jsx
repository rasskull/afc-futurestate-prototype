import { useState } from 'react';
import { isSessionPersistDisabled, setSessionPersistDisabled } from './sessionPersistFlag.js';
import './SessionTestToggle.css';

export default function SessionTestToggle() {
  const [disabled, setDisabled] = useState(() => isSessionPersistDisabled());

  function handleChange(event) {
    const next = event.target.checked;
    setDisabled(next);
    setSessionPersistDisabled(next);
  }

  return (
    <div className="afc-session-test-toggle">
      <label>
        <input type="checkbox" checked={disabled} onChange={handleChange} />
        Disable session saving (testing only)
      </label>
      <p className="afc-session-test-toggle__hint">
        {disabled
          ? 'Session saving is off — refresh the page to start the flow blank.'
          : 'Session saving is on — selections persist across page loads.'}
      </p>
    </div>
  );
}
