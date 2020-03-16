import React from 'react';
import { AuthorModal } from './AuthorModal';
import { DisclaimerModal } from './DisclaimerModal';
import './index.scss';

export const Footer = () => (
  <footer>
    <p>
        If you found this site helpful, consider{' '}
        <a
          className='bmc-button'
          target='_blank'
          rel='noopener noreferrer'
          href='https://www.buymeacoffee.com/6bpOFt7'
        >
          <img
            src='https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg'
            alt='Buy me a coffee'
          />
          <span style={{ marginLeft: '7px', fontSize: '14px' }}>
            Buy me a coffee
          </span>
        </a>
    </p>
    <p>
      <small>
        Made by <AuthorModal />, <DisclaimerModal />
      </small>
    </p>
  </footer>
);
