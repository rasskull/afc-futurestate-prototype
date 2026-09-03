import { states } from '../../data/states.js';

export const STATE_OPTIONS = states.map((s) => ({ value: s.value, label: s.label }));

// "No preference" is its own standalone button now (see StateSection.jsx),
// not a STATE_OPTIONS entry — shared here so its label stays in sync
// between that button and anywhere else it needs to be displayed (e.g. the
// donation summary panel's State row).
export const NO_PREFERENCE_LABEL = 'No preference — send my gift where it’s most needed';
