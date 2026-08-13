import texasSchools from './schools/schools-tx.json';

// This is a testing/demo prototype — every state resolves to the same Texas
// dataset rather than each state having its own real school list.
export function getSchoolsForState() {
  return texasSchools;
}

export function findSchool(stateCode, schoolId) {
  if (!stateCode || !schoolId) return null;
  return texasSchools.find((s) => s.id === schoolId) || null;
}
