import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { statistics } from '../../data/statistics';

let totalConfirmed = [],
  wip = [],
  excluded = [],
  totalTested = [];

for (let i = 0; i < statistics.length; i++) {
  const data = statistics[i];
  const date = new Date(data[0]);

  totalConfirmed.push([date, data.confirmed]);
  wip.push([date, data['under investigation']]);
  excluded.push([date, data.excluded]);
  totalTested.push([date, data['total tested']]);
}

const stasticsData = {
  totalConfirmed,
  wip,
  excluded,
  totalTested
};

const getOptions = data => {
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
        data: data.totalConfirmed
      },
      { type: 'line', name: 'under investigation', data: data.wip },
      { type: 'line', name: 'tested and excluded', data: data.excluded },
      { type: 'line', name: 'total tested', data: data.totalTested }
    ]
  };
};

export const StatisticsChart = () => (
  <>
    <ReactEcharts option={getOptions(stasticsData)} />
  </>
);
