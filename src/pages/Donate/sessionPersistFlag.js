// Testing-only escape hatch (see SessionTestToggle.jsx) — lets someone
// repeatedly test the fresh-visitor experience without manually clearing
// sessionStorage every time. localStorage (not sessionStorage) for the flag
// itself, since it needs to survive the very reload it's meant to affect.
const DISABLE_PERSIST_KEY = 'afc-donation-flow-disable-persist';
const STORAGE_KEY = 'afc-donation-flow';

// Defaults to disabled (opt-in persistence) until someone explicitly
// unchecks the toggle — so a brand-new visitor/browser never has session
// saving on without choosing it.
export function isSessionPersistDisabled() {
  try {
    const raw = window.localStorage.getItem(DISABLE_PERSIST_KEY);
    return raw === null ? true : raw === 'true';
  } catch {
    return true;
  }
}

export function setSessionPersistDisabled(disabled) {
  try {
    // Always written explicitly (never removed) — "enabled" is the
    // non-default state now, so it has to persist across reloads too.
    window.localStorage.setItem(DISABLE_PERSIST_KEY, disabled ? 'true' : 'false');
    if (disabled) {
      // Clear immediately so it takes effect without needing a reload first.
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // ignore — storage unavailable
  }
}
