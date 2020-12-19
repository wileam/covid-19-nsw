import React from 'react';
import { Responsive } from 'semantic-ui-react';
import { Facebook, Twitter } from 'react-social-sharing';

export const ShareButton = () => {
  const url = `https://covid-19.wileam.com/`;
  return (
    <Responsive {...Responsive.onlyComputer}>
      <div style={{ textAlign: 'right' }}>
        Share the page:
        <Facebook link={url} />
        <Twitter link={url} />
      </div>
    </Responsive>
  );
};
