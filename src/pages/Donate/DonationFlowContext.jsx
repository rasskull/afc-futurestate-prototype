import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const DonationFlowContext = createContext(null);

const STORAGE_KEY = 'afc-donation-flow';

// sessionStorage (not localStorage) — an in-progress donation should survive
// navigating around the site and coming back, but not linger indefinitely
// once the tab is closed.
function readStoredState() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function DonationFlowProvider({ children }) {
  const [fundId, setFundId] = useState(() => readStoredState().fundId ?? null);
  const [stateCode, setStateCode] = useState(() => readStoredState().stateCode ?? null);
  const [schoolId, setSchoolId] = useState(() => readStoredState().schoolId ?? null);

  // Add any future donation flow fields (gift amount, ...) to both this
  // saved object and their own useState above — everything here is restored
  // on mount and kept in sync automatically.
  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ fundId, stateCode, schoolId }));
    } catch {
      // Storage unavailable (private browsing, quota, etc.) — the flow still
      // works for the current page load, it just won't survive navigating away.
    }
  }, [fundId, stateCode, schoolId]);

  const value = useMemo(
    () => ({ fundId, setFundId, stateCode, setStateCode, schoolId, setSchoolId }),
    [fundId, stateCode, schoolId]
  );

  return <DonationFlowContext.Provider value={value}>{children}</DonationFlowContext.Provider>;
}

export function useDonationFlow() {
  const context = useContext(DonationFlowContext);
  if (!context) {
    throw new Error('useDonationFlow must be used within a DonationFlowProvider');
  }
  return context;
}
