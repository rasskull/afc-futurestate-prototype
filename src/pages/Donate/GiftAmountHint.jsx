import { CheckIcon } from '../../components/icons/DonationIcons.jsx';
import './GiftAmountHint.css';

export default function GiftAmountHint({ children }) {
  return (
    <div className="afc-gift-amount-hint">
      <span className="afc-gift-amount-hint__icon">
        <CheckIcon />
      </span>
      <p>{children}</p>
    </div>
  );
}
