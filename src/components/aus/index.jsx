import React from 'react';
import { DailyConfirmedChart } from '../chart/DailyConfirmedChart';
import { AusSummary } from './AusSummary';
import './index.scss';

export const AusPage = ({ id, data }) => {
  return (
    <>
      <AusSummary id={id} data={data} />
      <DailyConfirmedChart
        id={id}
        dailyHistorys={data[id].dailyHistorys}
        predicts={data[id].predicts}
      />
    </>
  );
};
