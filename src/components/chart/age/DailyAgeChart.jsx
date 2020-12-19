import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { commonConfig, formatDailyDataFromNSWApi } from '../commonConfig';

export const NSW_AGE_MAP = ageGroup => {
  return ageGroup.split('_')[1];
};

export const NSW_AGE_KEYS = ['0-4', '5-9', '10-14', '15-19', '70+'];

const getTodayChartOptions = (id, age) => {
  const data = formatDailyDataFromNSWApi(age, 'age_group', NSW_AGE_MAP, null, [
    '70+',
    '0-4',
    '5-9',
    '10-14',
    '15-19'
  ]);
  let dates = [];
  let series = [];
  let chartData = {};
  for (let i = data.length - 1; i >= 0; i--) {
    const d = data[i];
    dates.push(d.Date);
    for (let i = 0; i < NSW_AGE_KEYS.length; i++) {
      const key = NSW_AGE_KEYS[i];
      if (!chartData[key]) chartData[key] = [];
      chartData[key].push(d[key] ? d[key] : 0);
    }
  }

  for (const key in chartData) {
    if (chartData.hasOwnProperty(key)) {
      const d = chartData[key];
      series.push({
        type: 'bar',
        name: key,
        data: d,
        stack: 'age'
      });
    }
  }
  return {
    title: {
      ...commonConfig.title,
      show: true,
      text: 'Daily young and senior cases trend'
    },
    legend: {
      show: true,
      top: 30,
      selected: {}
    },
    grid: {
      top: 80
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow' // 'line' | 'shadow'
      }
    },
    xAxis: {
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

export const DailyAgeChart = ({ pageId, age }) => {
  return (
    <>
      <ReactEcharts
        option={getTodayChartOptions(pageId, age)}
        theme='custom_theme'
      />
    </>
  );
};
