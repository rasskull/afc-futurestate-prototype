import { useMemo, useState } from 'react';
import { states } from '../../data/states.js';
import { UNAVAILABLE_STATE_VALUES } from './state-options.js';
import { SearchIcon } from '../../components/icons/DonationIcons.jsx';
import './StateSearch.css';

// Mirrors SchoolSearch.jsx's type-ahead pattern (type to filter, click a
// result) but stays a plain flat list — no city-style grouping or
// result-cap truncation, since the states dataset is nowhere near
// SchoolSearch's need to cap a much larger one.
// Unlike SchoolSearch, this component does NOT render its own "selected"
// state — StateSection.jsx owns that instead, since the selected pill there
// has to represent either a real state OR "no preference" uniformly, a
// merge that's specific to this feature rather than generic search
// behavior worth building into the search field itself.
//
// Searches the full `states` list (not STATE_OPTIONS) so a not-opted-in
// state like California still surfaces here — it's just rendered as a
// disabled row rather than a clickable option (see UNAVAILABLE_STATE_VALUES
// in state-options.js). Plain informational text, no link — the donor picks
// "no state preference" from the standalone card below the field instead.
export default function StateSearch({ id, onChange, placeholder = 'Enter State name' }) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];
    return states.filter((option) => option.label.toLowerCase().startsWith(trimmed));
  }, [query]);

  return (
    <div className="afc-state-search">
      <div className="afc-state-search__field">
        <input
          id={id}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Search states"
        />
        <SearchIcon className="afc-state-search__icon" />
      </div>

      {query.trim() && (
        <div className="afc-state-search__results">
          {results.length === 0 ? (
            <p className="afc-state-search__empty">No states found for &ldquo;{query.trim()}&rdquo;.</p>
          ) : (
            results.map((option) =>
              UNAVAILABLE_STATE_VALUES.includes(option.value) ? (
                <div
                  key={option.value}
                  className="afc-state-search__option afc-state-search__option--unavailable"
                >
                  <p className="afc-state-search__unavailable-name">{option.label}</p>
                  <p className="afc-state-search__unavailable-note">
                    State is not opted in. Choose another state, or select{' '}
                    <strong>No State Preference</strong> below
                  </p>
                </div>
              ) : (
                <button
                  key={option.value}
                  type="button"
                  className="afc-state-search__option"
                  onClick={() => onChange(option.value)}
                >
                  {option.label}
                </button>
              )
            )
          )}
        </div>
      )}
    </div>
  );
}
