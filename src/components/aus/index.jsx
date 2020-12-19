import React from 'react';
import { AusSummary } from './AusSummary';
import { TotalChart } from '../chart/trend/TotalChart';
import { DailyChart } from '../chart/trend/DailyChart';
import './index.scss';
import { Header, Segment } from 'semantic-ui-react';
import { StatesTotalTrendingChart } from './StatesTotalTrendingChart';

export const AusPage = ({ pageId, data, active, setActive }) => {
  let dailyData = data[pageId].dailyHistorys.map(({ date, newConfirmed }) => {
    return [new Date(date), newConfirmed];
  });
  let totalData = data[pageId].dailyHistorys.map(({ date, totalConfirmed }) => [
    new Date(date),
    totalConfirmed
  ]);
  let predictData = data[
    pageId
  ].predicts.map(({ date, predictedTotalConfirmed }) => [
    new Date(date),
    predictedTotalConfirmed
  ]);
  return (
    <>
      <AusSummary
        pageId={pageId}
        data={data}
        active={active}
        setActive={setActive}
      />
      <Segment>
        {
          // eslint-disable-next-line
          <a id='trending' className='target'></a>
        }
        <Header>Trending: </Header>
        <small>
          * Click label to show/hide series, hover/touch point to see detail
          tooltip.
        </small>
        <TotalChart
          pageId={pageId}
          totalData={totalData}
          predictData={predictData}
        />

        <DailyChart pageId={pageId} dailyData={dailyData} />

        <StatesTotalTrendingChart pageId={pageId} data={data} />
      </Segment>
    </>
  );
};
