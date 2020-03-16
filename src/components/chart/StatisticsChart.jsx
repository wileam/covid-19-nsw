import React from 'react';
import ReactEcharts from 'echarts-for-react';

const getOptions = statistics => {
  let totalConfirmed = [],
    wip = [],
    excluded = [],
    totalTested = [];
  for (let i = 0; i < statistics.length; i++) {
    const data = statistics[i];
    const date = new Date(data.Date);

    totalConfirmed.push([date, data.confirmed]);
    wip.push([date, data['under investigation']]);
    excluded.push([date, data.excluded]);
    totalTested.push([date, data['total tested']]);
  }
  return {
    legend: {
      show: true
    },
    tooltip: {
      show: true
    },
    xAxis: {
      type: 'time'
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: value => {
          if (value >= 1000) {
            return `${value / 1000}k`;
          }
          return value;
        }
      }
    },
    series: [
      {
        type: 'line',
        name: 'total confirmed',
        data: totalConfirmed
      },
      { type: 'line', name: 'under investigation', data: wip },
      { type: 'line', name: 'tested and excluded', data: excluded },
      { type: 'line', name: 'total tested', data: totalTested }
    ]
  };
};

export const StatisticsChart = ({ statistics }) => (
  <>
    <ReactEcharts option={getOptions(statistics)} />
  </>
);
