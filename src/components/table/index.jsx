import React from 'react';
import Iframe from 'react-iframe';

const STATE_KEY_MAP = {
  NSW: 'shrHnMyzvf1Nk5BPT',
  VIC: 'shryP6pmTPm1Hi6Nt',
  QLD: 'shr7Kd0OWiUd6qNLT',
  WA: 'shr2IAnS3MD3V5X6m',
  SA: 'shrPSFdpFVlS9Id0k',
  TAS: 'shrNeRFhnBF6TPZh8',
  NT: 'shrMN0rzKqccZlkkz',
  ACT: 'shrVyShDBACC74FbQ'
};

export const DetailTable = ({ id }) => (
  <>
    <h2 className='ui small header'>
      Confirmed cases details(best view on desktop):
    </h2>
    <Iframe
      className='airtable-embed'
      url={`https://airtable.com/embed/${STATE_KEY_MAP[id]}?backgroundColor=teal`}
      frameborder='0'
      onmousewheel=''
      width='100%'
      height='500'
    />
  </>
);
