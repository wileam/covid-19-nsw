import React from 'react';
import Iframe from 'react-iframe';
import { Label, Segment, Responsive } from 'semantic-ui-react';

const STATE_KEY_MAP = {
  NSW: 'shrHnMyzvf1Nk5BPT',
  VIC: 'shryP6pmTPm1Hi6Nt',
  QLD: 'shr7Kd0OWiUd6qNLT',
  WA: 'shr2IAnS3MD3V5X6m',
  SA: 'shrPSFdpFVlS9Id0k',
  TAS: 'shrNeRFhnBF6TPZh8',
  NT: 'shrMN0rzKqccZlkkz',
  ACT: 'shrVyShDBACC74FbQ',
  AUS: 'shrYL7eNqRcCkbM2t'
};

export const DetailTable = ({ pageId }) => (
  <Segment>
    {// eslint-disable-next-line
    pageId === 'NT' ? (
      <a id='detail' className='target'></a>
    ) : (
      <a id='death' className='target'></a>
    )}
    <div className='title' style={{ marginBottom: '10px' }}>
      {pageId === 'AUS' ? (
        <>
          <Label as='a' color='red' ribbon>
            New
          </Label>
          <span className='ui small header'>
            Death cases details
            <Responsive as='span' {...Responsive.onlyMobile}>
              (best view on desktop)
            </Responsive>
            :
          </span>
        </>
      ) : (
        <h2 className='ui small header'>
          Confirmed cases details
          <Responsive as='span' {...Responsive.onlyMobile}>
            (best view on desktop)
          </Responsive>
          :
        </h2>
      )}
    </div>
    <Iframe
      className='airtable-embed'
      url={`https://airtable.com/embed/${STATE_KEY_MAP[pageId]}?backgroundColor=teal`}
      frameborder='0'
      onmousewheel=''
      width='100%'
      height='500'
    />
  </Segment>
);
