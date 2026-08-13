import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { DonationFlowProvider, useDonationFlow } from './DonationFlowContext.jsx';
import { FUNDS } from './funds-data.js';
import { STATE_OPTIONS } from './state-options.js';
import { findSchool } from '../../data/schools.js';

// Lets a link into the flow pre-fill fund/state/school via GET params
// (?fund=<id>&state=<code>&school=<id>) — for testing/demo entry points, not
// a real query-string API. Also acts as a route guard for direct/refresh
// navigation with no query string at all: /donate/state requires a fund
// already chosen, and /donate/school requires both a fund and a state —
// visiting either without its prerequisites bounces back to the first
// incomplete step, same ordering as the prefill jump-forward logic below.
function DonationFlowPrefill() {
  const location = useLocation();
  const navigate = useNavigate();
  const { fundId, setFundId, stateCode, setStateCode, setSchoolId } = useDonationFlow();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hasParams = params.has('fund') || params.has('state') || params.has('school');

    const fundParam = params.get('fund');
    const stateParam = params.get('state')?.toUpperCase();
    const schoolParam = params.get('school');

    let resolvedFundId = fundId;
    if (fundParam && FUNDS.some((fund) => fund.id === fundParam)) {
      resolvedFundId = fundParam;
      setFundId(fundParam);
    }

    let resolvedStateCode = stateCode;
    if (stateParam && STATE_OPTIONS.some((option) => option.value === stateParam)) {
      resolvedStateCode = stateParam;
      setStateCode(stateParam);
    }

    if (schoolParam && resolvedStateCode && findSchool(resolvedStateCode, schoolParam)) {
      setSchoolId(schoolParam);
    }

    if (hasParams) {
      // Fund, then state, then school (optional) — land on whichever of the
      // first two is still missing, or school once both are filled in.
      const target = !resolvedFundId ? '/donate' : !resolvedStateCode ? '/donate/state' : '/donate/school';
      navigate(target, { replace: true });
      return;
    }

    // No query string — pure route guard against landing on a step whose
    // prerequisites aren't met (manual URL entry, refresh, back/forward).
    if (location.pathname === '/donate/state' && !resolvedFundId) {
      navigate('/donate', { replace: true });
    } else if (location.pathname === '/donate/school' && (!resolvedFundId || !resolvedStateCode)) {
      navigate(!resolvedFundId ? '/donate' : '/donate/state', { replace: true });
    }
  }, [location.pathname, location.search, fundId, stateCode, setFundId, setStateCode, setSchoolId, navigate]);

  return null;
}

export default function DonationFlowLayout() {
  return (
    <DonationFlowProvider>
      <DonationFlowPrefill />
      <Outlet />
    </DonationFlowProvider>
  );
}
