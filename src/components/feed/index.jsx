import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import './index.scss';

const TWITTER_BY_STATE = {
  AUS: 'healthgovau',
  NSW: 'NSWHEALTH',
  VIC: 'vicgovdhhs',
  QLD: 'qldhealthnews',
  WA: 'WAHealth',
  SA: 'SAHealth',
  TAS: 'PubHealthTas',
  ACT: 'ACTHealth'
};

export const Feed = ({ id }) => (
  <>
    {TWITTER_BY_STATE[id] && (
      <TwitterTimelineEmbed
        sourceType='profile'
        screenName={TWITTER_BY_STATE[id]}
        options={{ height: '40rem' }}
      />
    )}
  </>
);
