import React from 'react';
import Iframe from 'react-iframe';

const STATE_KEY_MAP = {
  NSW: 'shrHnMyzvf1Nk5BPT',
  VIC: 'shrKh4I4XuWbUr0mh',
  QLD: 'shrqzrS1Px0JXrM4h',
  WA: 'shrY62a2829RpTIfn',
  SA: 'shrGGCzlLOETWFzNd',
  TAS: 'shrfEwUbg7HbtyIOm',
  NT: 'shrrueAhnuETjOJVW',
  ACT: 'shrmTt5x64kBoIHOs'
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
