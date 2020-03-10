import React from 'react';
import { AuthorModal } from './AuthorModal';
import { ContributeModal } from './ContributeModal';

export const Footer = () => (
  <p>
    <small>
      Made by <AuthorModal />, <ContributeModal />
    </small>
  </p>
);
