import { useMemo, useState } from 'react';
import { getSchoolsForState } from '../../data/schools.js';
import './SchoolSearch.css';

const RESULTS_CAP = 40;

function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M17 17L13.4 13.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M1 1L15 15M15 1L1 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SchoolSearch({ stateCode, stateName, value, onChange }) {
  const dataset = useMemo(() => getSchoolsForState(stateCode), [stateCode]);
  const selectedSchool = dataset.find((s) => s.id === value) ?? null;

  const [query, setQuery] = useState('');

  function handleClear() {
    onChange(null);
    setQuery('');
  }

  const groups = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    const matches = dataset.filter(
      (school) =>
        school.name.toLowerCase().includes(trimmed) || school.city.toLowerCase().includes(trimmed)
    );
    const byCity = new Map();
    for (const school of matches) {
      if (!byCity.has(school.city)) byCity.set(school.city, []);
      byCity.get(school.city).push(school);
    }

    return Array.from(byCity.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([city, schools]) => ({ city, schools }));
  }, [dataset, query]);

  const totalMatches = groups.reduce((sum, group) => sum + group.schools.length, 0);
  let shown = 0;

  return (
    <div className="afc-school-search">
      {selectedSchool ? (
        <div className="afc-school-search__selected">
          <p className="afc-school-search__selected-name">
            {selectedSchool.name}
            <span className="afc-school-search__selected-city">, {selectedSchool.city}</span>
          </p>
          <button
            type="button"
            className="afc-school-search__selected-close"
            aria-label="Clear selected school"
            onClick={handleClear}
          >
            <CloseIcon />
          </button>
        </div>
      ) : (
        <>
          <div className="afc-school-search__field">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${stateName} Schools`}
              aria-label={`Search ${stateName} schools`}
            />
            <SearchIcon className="afc-school-search__icon" />
          </div>

          {query.trim() && (
            <div className="afc-school-search__results">
              {groups.length === 0 && (
                <p className="afc-school-search__empty">No schools found for &ldquo;{query.trim()}&rdquo;.</p>
              )}

              {groups.map((group) => {
                const remaining = RESULTS_CAP - shown;
                if (remaining <= 0) return null;
                const visibleSchools = group.schools.slice(0, remaining);
                shown += visibleSchools.length;

                return (
                  <div key={group.city} className="afc-school-search__group">
                    <div className="afc-school-search__city-row">
                      <p>{group.city}</p>
                      <p>
                        {group.schools.length} school{group.schools.length === 1 ? '' : 's'}
                      </p>
                    </div>

                    {visibleSchools.map((school) => (
                      <button
                        key={school.id}
                        type="button"
                        className="afc-school-search__option"
                        onClick={() => onChange(school)}
                      >
                        <span>{school.name}</span>
                      </button>
                    ))}
                  </div>
                );
              })}

              {totalMatches > RESULTS_CAP && (
                <p className="afc-school-search__truncated">
                  Showing the first {RESULTS_CAP} of {totalMatches} results — refine your search to see more.
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
