import { useNavigate } from 'react-router-dom';
import { FUNDS } from './funds-data.js';
import { STATE_OPTIONS } from './state-options.js';
import { findSchool } from '../../data/schools.js';
import { useDonationFlow } from './DonationFlowContext.jsx';
import DonationSummaryPanel from '../../components/DonationSummaryPanel/DonationSummaryPanel.jsx';
import Dropdown from '../../components/ui/Dropdown.jsx';
import GiftAmountHint from './GiftAmountHint.jsx';
import './DonationStep.css';
import './ChooseState.css';

export default function ChooseState() {
  const navigate = useNavigate();
  const { fundId, stateCode, setStateCode, schoolId } = useDonationFlow();
  const selectedFund = FUNDS.find((fund) => fund.id === fundId) || null;
  const selectedState = STATE_OPTIONS.find((s) => s.value === stateCode) || null;
  const selectedSchool = findSchool(stateCode, schoolId);

  function handleStateChange(value) {
    setStateCode(value);
    navigate('/donate/school');
  }

  return (
    <div className="afc-donation-step afc-wide">
      <div className="afc-donation-step__col">
        <div className="afc-donation-step__intro">
          <h1 className="afc-donation-step__heading">
            CHOOSE A <strong>STATE</strong>
          </h1>
          <p className="afc-donation-step__subtext">Your gift stays within the state you choose.</p>
        </div>

        <div className="afc-choose-state__field">
          <label htmlFor="donate-state">
            State <span className="afc-choose-state__required">*</span>
          </label>
          <Dropdown
            id="donate-state"
            options={STATE_OPTIONS}
            value={stateCode}
            onChange={handleStateChange}
            placeholder="Choose a state"
          />
        </div>

        {selectedState && (
          <GiftAmountHint>
            If you&rsquo;re not choosing a school, you can <strong>Select Gift Amount</strong> to change a
            child&rsquo;s life.
          </GiftAmountHint>
        )}
      </div>

      <DonationSummaryPanel
        step={2}
        fund={selectedFund}
        stateLabel={selectedState?.label}
        schoolLabel={selectedSchool?.name}
      />
    </div>
  );
}
