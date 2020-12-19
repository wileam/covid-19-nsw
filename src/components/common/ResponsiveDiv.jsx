import React from 'react';
import { Responsive } from 'semantic-ui-react';

export const ResponsiveDiv = ({ children }) => (
  <>
    <Responsive as='div' maxWidth={Responsive.onlyTablet.minWidth - 1}>
      {children}
    </Responsive>
    <Responsive as='span' minWidth={Responsive.onlyTablet.minWidth}>
      {children}
    </Responsive>
  </>
);
