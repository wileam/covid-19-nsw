import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { getSeriesFromData, commonConfig } from '../commonConfig';

const getOptions = (id, source) => {
  let { dates, series } = getSeriesFromData(source, 'source');

  return {
    title: {
      ...commonConfig.title,
      show: true,
      text: 'Source Trending'
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
    legend: {
      show: true,
      selected: {
        overseas: false,
        'contact of a confirmed case': false
      },
      top: 30
    },
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
    dataZoom: commonConfig.dataZoom,
    series
  };
};

export const TotalSourceChart = ({ id, source }) => (
  <>
    <ReactEcharts option={getOptions(id, source)} theme='custom_theme' />
  </>
);
