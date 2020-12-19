import React from 'react';
import { AuthorModal } from './AuthorModal';
import { DisclaimerModal } from './DisclaimerModal';
import { BuyCoffeeModal } from './BuyCoffeeModal';
import { ShareModal } from './ShareModal';
import './index.scss';
import { getToggle, TOGGLES } from '../../toggles';

// const filterByCurrency = (data, currency) => {
//   return data
//     .filter(d => d.Currency === currency)
//     .map(d => d.Amount)
//     .reduce((a, b) => a + b)
//     .toFixed(2);
// };

// {
//   "Name": "Dat",
//   "Date": "2020-03-17",
//   "Amount": 9,
//   "Platform": "card",
//   "Comments": "Thanks you for making the covid19 chart.",
//   "Currency": "AUD"
// }
export const Footer = ({ pageId }) => {
  // const sponsorSummary = {
  //   AUD: filterByCurrency(sponsors, 'AUD'),
  //   CNY: filterByCurrency(sponsors, 'CNY')
  // };
  return (
    <footer className='ui container'>
      <p>
        {getToggle(TOGGLES.SHOW_SHARE) ? (
          <ShareModal pageId={pageId} />
        ) : (
          <small>If you found this site helpful, consider</small>
        )}
        <BuyCoffeeModal />
      </p>
      <p>
        <small>
          Made by <AuthorModal />, <DisclaimerModal />
        </small>
      </p>
    </footer>
  );
};
