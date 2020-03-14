import React from 'react';
import { Facebook, Twitter } from 'react-social-sharing';

export const ShareButton = () => {
  const url = 'https://covid-19.wileam.com';
  return (
    <>
      <p style={{textAlign: 'right'}}>
        Share the page:
        <Facebook link={url} />
        <Twitter link={url} />
      </p>
    </>
  );
};
