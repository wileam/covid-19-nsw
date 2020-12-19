import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { getSeriesFromData, commonConfig } from '../commonConfig';

const getTodayChartOptions = (id, data) => {
  data = data.filter(d => d.Gender === 'All');

  let { dates, series } = getSeriesFromData(data, 'age');

  series.sort((a, b) => a.name.localeCompare(b.name));

  return {
    title: {
      ...commonConfig.title,
      show: true,
      text: 'Age Trending'
    },
    legend: {
      show: true,
      top: 30
    },
    grid: {
      top: 80
    },
    toolbox: {
      feature: {
        restore: {
          title: 'restore'
        }
      }
    },
    dataZoom: [
      {
        disabled: false
      },
      { type: 'inside' }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow' // 'line' | 'shadow'
      }
    },
    xAxis: {
      ...commonConfig.xAxis,
      type: 'category',
      data: dates
    },
    yAxis: {
      ...commonConfig.yAxis,
      type: 'value'
    },
    series
  };
};

export const TotalAgeChart = ({ id, age }) => {
  return (
    <>
      <ReactEcharts
        option={getTodayChartOptions(id, age)}
        theme='custom_theme'
      />
    </>
  );
};
