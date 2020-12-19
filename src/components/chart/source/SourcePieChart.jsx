import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { commonConfig } from '../commonConfig';
import * as moment from 'moment';
import { sourceKeysMap } from './const';

const getSourceDataFromAirtable = source => {
  let data = [];
  for (const key in source) {
    if (source.hasOwnProperty(key) && typeof source[key] === 'number') {
      data.push({
        name: key,
        value: source[key]
      });
    }
  }
  return data;
};

const getOptions = (id, source) => {
  let data;
  if (id !== 'NSW') {
    data = getSourceDataFromAirtable(source[0]);
  } else {
    data = source.casesBySource.map(d => ({
      name: sourceKeysMap.get(d.source),
      value: d.count
    }));
  }
  return {
    title: {
      ...commonConfig.title,
      show: true,
      text: 'Confirmed cases percentage by source'
    },
    grid: {
      top: 80
    },
    legend: {
      show: false,
      top: 30
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: true,
        left: 50,
        name: 'source',
        data,
        label: {
          formatter: '{b}\n{c}({d}%)'
        }
      }
    ]
  };
};

export const SourcePieChart = ({ id, source }) => {
  return (
    <>
      <ReactEcharts option={getOptions(id, source)} theme='custom_theme' />
      {id !== 'NSW' && (
        <small>
          Source data updated at {moment(source[0].Date).format('MMM DD')}.
        </small>
      )}
    </>
  );
};
