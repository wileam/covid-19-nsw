import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { commonConfig } from '../commonConfig';
import { Icon, Checkbox } from 'semantic-ui-react';

const getTotalChartOptions = (id, data, predictData, useLog) => {
  let yAxis = commonConfig.yAxis;
  let dataZoom = commonConfig.dataZoom;
  let series = [
    {
      type: 'line',
      name: 'total',
      data: data,
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
    },
    {
      type: 'line',
      name: 'predicted',
      data: predictData,
      smooth: false,
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: 'top',
            formatter: ({ value, dataIndex }) => {
              if (dataIndex > predictData.length - 3) {
                return value[2];
              }
              return '';
            }
          },
          lineStyle: {
            width: 2,
            type: 'dotted' //'dotted'虚线 'solid'实线
          }
        }
      }
    }
  ];
  if (useLog) {
    yAxis = { ...yAxis, type: 'log' };
    dataZoom = [{ disabled: true, startValue: data[0][1] }];
    series[0].itemStyle.normal.label.show = false;
  }

  return {
    ...commonConfig,
    title: {
      ...commonConfig.title,
      show: true,
      text: 'Total confirmed cases'
    },
    legend: {
      show: true,
      selected: {
        total: true,
        predicted: false
      },
      top: 30
    },
    yAxis,
    dataZoom,
    series
  };
};

export const TotalChart = ({ pageId, totalData, predictData }) => {
  let [useLog, setUseLog] = useState(false);
  return (
    <>
      <ReactEcharts
        option={getTotalChartOptions(pageId, totalData, predictData, useLog)}
        theme='custom_theme'
      />
      <div style={{ textAlign: 'center' }}>
        <Checkbox
          toggle
          label='use log scale'
          onChange={() => setUseLog(prev => !prev)}
          checked={useLog}
        />
        <a
          className='ui'
          target='_blank'
          rel='noopener noreferrer'
          href='https://blog.datawrapper.de/weeklychart-logscale/'
          title='how to read log scale chart'
        >
          <Icon name='question circle outline'></Icon>
        </a>
      </div>
    </>
  );
};
