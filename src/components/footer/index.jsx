import React from 'react';
import { AuthorModal } from './AuthorModal';
import { DisclaimerModal } from './DisclaimerModal';
import { BuyCoffeeModal } from './BuyCoffeeModal';
import './index.scss';

export const Footer = () => (
  <footer>
    <p>
        If you found this site helpful, consider{' '}
        <BuyCoffeeModal />
    </p>
    <p>
      <small>
        Made by <AuthorModal />, <DisclaimerModal />
      </small>
    </p>
  </footer>
);
