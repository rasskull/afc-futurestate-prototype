import { useDonationFlow } from './DonationFlowContext.jsx';
import { FUNDS } from './funds-data.js';
import { SparkleIcon, CheckIcon } from '../../components/icons/DonationIcons.jsx';
import './DonationStep.css';
import './FundSection.css';

const DEFAULT_FUND = FUNDS.find((fund) => fund.isDefault);
const OTHER_FUNDS = FUNDS.filter((fund) => !fund.isDefault);

export default function FundSection({ sectionRef, headingRef, onSelectFund }) {
  const { fundId } = useDonationFlow();
  const selectedFund = FUNDS.find((fund) => fund.id === fundId) || null;

  return (
    <section className="afc-scroll-section afc-fund-section" data-section="fund" ref={sectionRef}>
      <div className="afc-donation-step__intro">
        <h3 className="afc-donation-step__heading" ref={headingRef}>
          CHOOSE A <strong>FUND</strong>
        </h3>
        <p className="afc-donation-step__subtext">
          Pick a focus, this is your gift to direct where it goes.
        </p>
      </div>

      <div className="afc-fund-card-list">
        <FundCard
          fund={DEFAULT_FUND}
          isSelected={selectedFund?.id === DEFAULT_FUND.id}
          onSelect={onSelectFund}
        />

        <div className="afc-fund-card-grid">
          {OTHER_FUNDS.map((fund) => (
            <FundCard
              key={fund.id}
              fund={fund}
              isSelected={selectedFund?.id === fund.id}
              onSelect={onSelectFund}
            />
          ))}
        </div>
      </div>
    </section>
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
      <div className="afc-fund-card__desc-row">
        <p className="afc-fund-card__desc">{fund.description}</p>
        <span className={`afc-fund-card__selected-icon${isSelected ? ' is-visible' : ''}`}>
          {isSelected && <CheckIcon />}
        </span>
      </div>
    </button>
  );
}
