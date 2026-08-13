import { Link } from 'react-router-dom';
import { FUNDS } from './funds-data.js';
import { STATE_OPTIONS } from './state-options.js';
import { findSchool } from '../../data/schools.js';
import { useDonationFlow } from './DonationFlowContext.jsx';
import DonationSummaryPanel from '../../components/DonationSummaryPanel/DonationSummaryPanel.jsx';
import SchoolSearch from './SchoolSearch.jsx';
import GiftAmountHint from './GiftAmountHint.jsx';
import './DonationStep.css';
import './ChooseSchool.css';

export default function ChooseSchool() {
  const { fundId, stateCode, schoolId, setSchoolId } = useDonationFlow();
  const selectedFund = FUNDS.find((fund) => fund.id === fundId) || null;
  const selectedState = STATE_OPTIONS.find((option) => option.value === stateCode) || null;
  const selectedSchool = findSchool(stateCode, schoolId);

  return (
    <div className="afc-donation-step afc-wide">
      <div className="afc-donation-step__col">
        <div className="afc-donation-step__intro">
          <h1 className="afc-donation-step__heading">
            CHOOSE A <strong>SCHOOL</strong>
          </h1>
          <p className="afc-donation-step__subtext">
            You can choose to direct your gift to a specific school, or let AFC send it where it&rsquo;s
            needed most.
          </p>
        </div>

        <div className="afc-choose-school__field">
          <p className="afc-choose-school__label">School (optional)</p>
          <SchoolSearch
            stateCode={selectedState?.value}
            stateName={selectedState?.label || 'State'}
            value={schoolId}
            onChange={(school) => setSchoolId(school ? school.id : null)}
          />
        </div>

        <GiftAmountHint>
          {selectedSchool ? (
            <>Skip school selection and select gift amount.</>
          ) : (
            <>
              If you&rsquo;re not choosing a school, you can <strong>Select Gift Amount</strong> to change a
              child&rsquo;s life.
            </>
          )}
        </GiftAmountHint>

        <Link to="/donate/gift-amount" className="afc-choose-school__cta afc-pulse">
          Select gift amount
        </Link>
      </div>

      <DonationSummaryPanel
        step={3}
        fund={selectedFund}
        stateLabel={selectedState?.label}
        schoolLabel={selectedSchool?.name}
      />
    </div>
  );
}
