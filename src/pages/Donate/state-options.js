import { states } from '../../data/states.js';

// States not opted in to receive donations through this flow — excluded
// from STATE_OPTIONS (so they can't actually be selected/scrolled-to as a
// real destination), but StateSearch.jsx still surfaces them in search
// results so a donor can find their state and see its status, rather than
// it silently not appearing at all. California is a placeholder test case
// standing in for whatever the real "not opted in" list turns out to be
// live — swap this out once that's known.
export const UNAVAILABLE_STATE_VALUES = ['CA'];

export const STATE_OPTIONS = states
  .filter((s) => !UNAVAILABLE_STATE_VALUES.includes(s.value))
  .map((s) => ({ value: s.value, label: s.label }));

// "No preference" is its own standalone button now (see StateSection.jsx),
// not a STATE_OPTIONS entry — shared here so its label stays in sync
// between that button and anywhere else it needs to be displayed (e.g. the
// donation summary panel's State row).
export const NO_PREFERENCE_LABEL = 'No preference — send my gift where it’s most needed';
