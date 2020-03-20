import React from 'react';
import ReactEcharts from 'echarts-for-react';

const getOptions = statistics => {
  let data = {};
  let keys = [];
  let series = [];
  for (let i = 0; i < statistics.length; i++) {
    const statistic = statistics[i];
    for (const key in statistic) {
      if (statistic.hasOwnProperty(key) && typeof statistic[key] === 'number') {
        if (!data[key]) {
          data[key] = [];
        }
        keys.push(key);
        data[key].push([new Date(statistic.Date), statistic[key]]);
      }
    }
  }

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    series.push({ type: 'line', name: key, data: data[key] });
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
    series
  };
};

export const StatisticsChart = ({ statistics }) => (
  <>
    <ReactEcharts option={getOptions(statistics)} />
  </>
);
