import React from 'react';
import echarts from 'echarts';
import { theme } from './theme/custom';
import { Location } from './location';
import { Trend } from './trend';
import { Source } from './source';
import { Age } from './age';
import { Tested } from './tested';

// register theme object
echarts.registerTheme('custom_theme', theme);

export const Chart = ({ pageId, data }) => {
  let {
    dailyHistorys,
    predicts,
    source,
    statistics,
    age,
    location,
    totalTestedReport,
    confirmedCasesByLocationAndSource,
    suburbMapping
  } = data;
  let dailyData = dailyHistorys.map(({ date, newConfirmed }) => [
    new Date(date),
    newConfirmed
  ]);
  let totalData = dailyHistorys.map(({ date, totalConfirmed }) => [
    new Date(date),
    totalConfirmed
  ]);
  let predictData = predicts.map(({ date, predictedTotalConfirmed }) => [
    new Date(date),
    predictedTotalConfirmed
  ]);

  return (
    <div>
      {
        // eslint-disable-next-line
        <a id='trending' className='target'></a>
      }
      <Trend
        pageId={pageId}
        totalData={totalData}
        predictData={predictData}
        dailyData={dailyData}
      />
      {((pageId === 'NSW' && confirmedCasesByLocationAndSource) ||
        (source && source[0])) && (
        <Source
          pageId={pageId}
          source={source}
          confirmedCasesByLocationAndSource={confirmedCasesByLocationAndSource}
        />
      )}
      {pageId === 'NSW' && totalTestedReport && (
        <Location
          pageId={pageId}
          location={location}
          totalTestedReport={totalTestedReport}
          suburbMapping={suburbMapping}
        />
      )}
      <Tested pageId={pageId} statistics={statistics} />
      {age && age[0] && <Age pageId={pageId} age={age} />}
    </div>
  );
};
