import React from 'react';
import { Responsive } from 'semantic-ui-react';
import { Facebook, Twitter } from 'react-social-sharing';

export const ShareButton = ({id}) => {
  const url = `https://covid-19.wileam.com/${id}`;
  return (
    <Responsive {...Responsive.onlyComputer}>
      <p style={{textAlign: 'right'}}>
        Share the page:
        <Facebook link={url} />
        <Twitter link={url} />
      </p>
    </Responsive>
  );
};
