import { states } from '../../data/states.js';

export const STATE_OPTIONS = [
  { value: 'no-preference', label: "No preference — send my gift where it's most needed" },
  ...states.map((s) => ({ value: s.value, label: s.label })),
];
