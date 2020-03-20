import React from 'react';
import { DailyConfirmedChart } from '../chart/DailyConfirmedChart';
import { AusSummary } from './AusSummary';
import './index.scss';
import { Divider } from 'semantic-ui-react';

export const AusPage = ({ id, data }) => {
  return (
    <>
      <AusSummary id={id} data={data} />
      <Divider />
      <h2 className='ui small header'>Trending:</h2>
      <small>Click label to show/hide series:</small>
      <DailyConfirmedChart
        id={id}
        dailyHistorys={data[id].dailyHistorys}
        predicts={data[id].predicts}
      />
    </>
  );
};
