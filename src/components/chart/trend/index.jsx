import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { TotalChart } from './TotalChart';
import { DailyChart } from './DailyChart';

export const Trend = ({ pageId, totalData, predictData, dailyData }) => {
  return (
    <>
      <Segment>
        <Header>Trending: </Header>
        <small>
          * Click label to show/hide series, hover/touch point to see detail
          tooltip.
        </small>
        <TotalChart
          id={pageId}
          totalData={totalData}
          predictData={predictData}
        />
        <DailyChart id={pageId} dailyData={dailyData} />
      </Segment>
    </>
  );
};
