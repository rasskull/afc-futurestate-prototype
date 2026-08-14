import { Outlet } from 'react-router-dom';
import { DonationFlowProvider } from './DonationFlowContext.jsx';

export default function DonationFlowLayout() {
  return (
    <DonationFlowProvider>
      <Outlet />
    </DonationFlowProvider>
  );
}
