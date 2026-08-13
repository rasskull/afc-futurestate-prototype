import { Link, useNavigate } from 'react-router-dom';
import { useDonationFlow } from './DonationFlowContext.jsx';
import { FUNDS } from './funds-data.js';
import { STATE_OPTIONS } from './state-options.js';
import { findSchool } from '../../data/schools.js';
import DonationSummaryPanel from '../../components/DonationSummaryPanel/DonationSummaryPanel.jsx';
import GiftAmountHint from './GiftAmountHint.jsx';
import { SparkleIcon, CheckIcon } from '../../components/icons/DonationIcons.jsx';
import './DonationStep.css';
import './ChooseFund.css';

const DEFAULT_FUND = FUNDS.find((fund) => fund.isDefault);
const OTHER_FUNDS = FUNDS.filter((fund) => !fund.isDefault);

export default function ChooseFund() {
  const navigate = useNavigate();
  const { fundId, setFundId, stateCode, schoolId } = useDonationFlow();
  const selectedFund = FUNDS.find((fund) => fund.id === fundId) || null;
  const selectedState = STATE_OPTIONS.find((option) => option.value === stateCode) || null;
  const selectedSchool = findSchool(stateCode, schoolId);
  // Once state is already set, the next incomplete step is school, not state.
  const continueHref = selectedState ? '/donate/school' : '/donate/state';
  // Once fund + state are both set, the gift-amount CTA is active and should
  // be the primary focus — drop the "Continue with" link entirely.
  const continueFund = selectedState ? null : selectedFund;
  // Same condition, but for the gift-amount hint that replaces it.
  const showGiftAmountHint = Boolean(selectedFund) && Boolean(selectedState);

  function handleSelect(fund) {
    setFundId(fund.id);
    navigate(continueHref);
  }

  return (
    <div className="afc-donation-step afc-wide">
      <div className="afc-donation-step__col">
        <div className="afc-donation-step__intro">
          <h1 className="afc-donation-step__heading">
            CHOOSE A <strong>FUND</strong>
          </h1>
          <p className="afc-donation-step__subtext">
            Pick a focus, this is your gift to direct where it goes.
          </p>
        </div>

        <ContinueLink fund={continueFund} href={continueHref} className="afc-choose-fund__continue--mobile" />

        {showGiftAmountHint && (
          <GiftAmountHint>
            If you&rsquo;re not choosing a school, you can <strong>Select Gift Amount</strong> to change a
            child&rsquo;s life.
          </GiftAmountHint>
        )}

        <div className="afc-fund-card-list">
          <FundCard
            fund={DEFAULT_FUND}
            isSelected={selectedFund?.id === DEFAULT_FUND.id}
            onSelect={handleSelect}
          />

          <div className="afc-fund-card-grid">
            {OTHER_FUNDS.map((fund) => (
              <FundCard
                key={fund.id}
                fund={fund}
                isSelected={selectedFund?.id === fund.id}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>

        {showGiftAmountHint && (
          <GiftAmountHint>
            If you&rsquo;re not choosing a school, you can <strong>Select Gift Amount</strong> to change a
            child&rsquo;s life.
          </GiftAmountHint>
        )}

        <ContinueLink fund={continueFund} href={continueHref} className="afc-choose-fund__continue--mobile" />
      </div>

      <div className="afc-choose-fund__sidebar">
        <DonationSummaryPanel
          step={1}
          fund={selectedFund}
          stateLabel={selectedState?.label}
          schoolLabel={selectedSchool?.name}
        />
        <ContinueLink fund={continueFund} href={continueHref} className="afc-choose-fund__continue--desktop" />
      </div>
    </div>
  );
}

function ContinueLink({ fund, href, className }) {
  if (!fund) return null;

  return (
    <p className={`afc-choose-fund__continue ${className}`}>
      Continue with:
      <Link to={href} className="afc-choose-fund__continue-link">
        {fund.name} &rarr;
      </Link>
    </p>
  );
}

function FundCard({ fund, isSelected, onSelect }) {
  const classes = ['afc-fund-card'];
  if (fund.isDefault) classes.push('afc-fund-card--default');
  if (isSelected) classes.push('afc-fund-card--selected');

  return (
    <button type="button" className={classes.join(' ')} onClick={() => onSelect(fund)}>
      {fund.isDefault && (
        <p className="afc-fund-card__badge">
          <SparkleIcon className="afc-fund-card__badge-icon" />
          Most people choose this fund
        </p>
      )}
      <p className="afc-fund-card__name">{fund.name}</p>
      <p className="afc-fund-card__desc">{fund.description}</p>
      {isSelected && (
        <p className="afc-fund-card__selected">
          <span className="afc-fund-card__selected-icon">
            <CheckIcon />
          </span>
          Fund selected
        </p>
      )}
    </button>
  );
}
