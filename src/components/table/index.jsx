import React from 'react';
import Iframe from 'react-iframe';

export const DetailTable = () => (
  <>
    <h2 className='ui small header'>
      Confirmed cases details(best view on desktop):
    </h2>
    <Iframe
      className='airtable-embed'
      url='https://airtable.com/embed/shr289gFl44ZlCYnC?backgroundColor=teal'
      frameborder='0'
      onmousewheel=''
      width='100%'
      height='500'
    />
  </>
);
