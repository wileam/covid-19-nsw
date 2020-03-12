import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { sourceData } from '../../data';

const getOptions = data => {
  return {
    legend: {
      orient: 'vertical',
      left: 0
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
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '12',
              fontWeight: 'bold'
            }
          }
        }
      }
    ]
  };
};

export const SourcePieChart = () => (
  <>
    <ReactEcharts option={getOptions(sourceData)} />
  </>
);
