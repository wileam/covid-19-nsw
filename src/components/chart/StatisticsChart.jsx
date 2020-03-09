import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { stastics } from '../../data';

let totalConfirmed = [],
  wip = [],
  excluded = [],
  totalTested = [];

for (let i = 0; i < stastics.length; i++) {
  const data = stastics[i];
  const date = new Date(data[0]);

  totalConfirmed.push([date, data[1]]);
  wip.push([date, data[2]]);
  excluded.push([date, data[3]]);
  totalTested.push([date, data[4]]);
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
      type: 'value'
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
