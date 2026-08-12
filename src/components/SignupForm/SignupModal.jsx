import { useEffect, useRef } from 'react';
import SignupForm from './SignupForm.jsx';
import './SignupForm.css';

export default function SignupModal({ open, onClose, modalTitle, modalCopy, submitLabel }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="afc-signup-modal"
      onClose={onClose}
      onCancel={onClose}
    >
      <button
        type="button"
        className="afc-signup-modal__close"
        aria-label="Close"
        onClick={onClose}
      >
        &times;
      </button>
      <SignupForm
        variant="modal"
        theme="light"
        heading={modalTitle}
        supportCopy={modalCopy}
        submitLabel={submitLabel}
      />
    </dialog>
  );
}
