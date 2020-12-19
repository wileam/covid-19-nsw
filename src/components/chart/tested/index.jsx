import React from 'react';
import { TestedTable } from './TestedTable';
import { StatisticsChart } from './TestedChart';
import { Segment, Header } from 'semantic-ui-react';

export const Tested = ({ pageId, statistics }) => {
  for (let i = 0; i < statistics.length; i++) {
    statistics[i]['positive rate'] =
      statistics[i].confirmed / statistics[i]['total tested'];
    if (i >= 1) {
      const tested = statistics[i];
      const todayTested = statistics[i - 1];
      statistics[i - 1]['new tested'] =
        todayTested['total tested'] - tested['total tested'];
      statistics[i - 1]['new confirmed'] =
        todayTested['confirmed'] - tested['confirmed'];
      statistics[i - 1]['daily positive rate'] =
        statistics[i - 1]['new confirmed'] / statistics[i - 1]['new tested'];
    }
  }
  statistics = statistics.filter(s => s['new tested'] !== 0);
  return (
    <Segment>
      {
        // eslint-disable-next-line
        <a id='tests' className='target'></a>
      }
      <Header>Tested data:</Header>
      <StatisticsChart id={pageId} statistics={statistics} />
      <TestedTable id={pageId} statistics={statistics} />
    </Segment>
  );
};
