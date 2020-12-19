import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { commonConfig, formatPercentDataFromNSWApi } from '../commonConfig';
import { NSW_AGE_MAP } from './DailyAgeChart';

export const NSWAgeGroupSorter = (a, b) => {
  return convert(a.name) - convert(b.name);
};

const convert = ageGroup => {
  if (ageGroup === '70+') {
    return 70;
  } else {
    return ageGroup.split('-')[0];
  }
};

const getOptions = (pageId, age) => {
  let keys = [];
  let chartData = [];
  let data = formatPercentDataFromNSWApi(age, 'age_group', NSW_AGE_MAP);
  data = data.filter(d => d.name).sort(NSWAgeGroupSorter);

  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    keys.push(d.name);
    chartData.push([d.name, d.value]);
  }

  return {
    title: {
      ...commonConfig.title,
      show: true,
      text: 'Confirmed cases by age group'
    },
    legend: {
      show: true,
      top: 30
    },
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      type: 'category',
      data: keys
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'bar',
        name: 'age_group',
        data: chartData,
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        }
      }
    ]
  };
};

export const AgeChart = ({ pageId, age }) => (
  <>
    <ReactEcharts option={getOptions(pageId, age)} theme='custom_theme' />
  </>
);
