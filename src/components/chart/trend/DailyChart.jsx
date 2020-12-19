import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { commonConfig } from '../commonConfig';

const getOptions = (id, data) => {
  // console.log('daily chart', data);

  return {
    ...commonConfig,
    title: {
      ...commonConfig.title,
      show: true,
      text: 'Daily confirmed cases'
    },
    series: [
      {
        type: 'bar',
        name: 'new cases',
        data,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'top',
              formatter: ({ value, dataIndex }) => {
                if (dataIndex === data.length - 1) {
                  return value[2];
                }
                return '';
              }
            }
          }
        }
      }
    ]
  };
};

export const DailyChart = ({ pageId, dailyData }) => {
  return (
    <>
      <ReactEcharts
        option={getOptions(pageId, dailyData)}
        theme='custom_theme'
      />
    </>
  );
};
