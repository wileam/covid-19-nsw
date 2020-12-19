import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { default as states } from '../../states.json';
import { commonConfig } from '../chart/commonConfig';
import { Icon, Checkbox } from 'semantic-ui-react';

const getOptions = (id, data, useLog) => {
  let yAxis = commonConfig.yAxis;
  let dataZoom = commonConfig.dataZoom;

  if (useLog) {
    yAxis = { type: 'log', max: 'dataMax' };
    dataZoom = [{ disabled: false, startValue: data[id].dailyHistorys[0][0] }];
  }

  let series = [];
  for (let i = 0; i < states.length; i++) {
    const state = states[i];
    const stateTotal = data[
      state
    ].dailyHistorys.map(({ date, totalConfirmed }) => [
      new Date(date),
      totalConfirmed
    ]);
    let stateSerie = {
      type: 'line',
      name: state,
      data: stateTotal,
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: 'right',
            formatter: ({ value, dataIndex }) => {
              if (dataIndex === stateTotal.length - 1) {
                return value[2];
              }
              return '';
            }
          }
        }
      }
    };
    if (useLog) {
      stateSerie.itemStyle.normal.label.show = false;
    }
    series.push(stateSerie);
  }
  return {
    ...commonConfig,
    title: {
      ...commonConfig.title,
      show: true,
      text: 'Trending by state',
      padding: 10
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow' // 'line' | 'shadow'
      }
    },
    yAxis,
    dataZoom,
    grid: {
      top: 80
    },
    legend: {
      show: true,
      top: 30
    },
    series
  };
};

export const StatesTotalTrendingChart = ({ pageId, data }) => {
  let [useLog, setUseLog] = useState(false);
  return (
    <div>
      <ReactEcharts
        option={getOptions(pageId, data, useLog)}
        style={{ height: 400 }}
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
    </div>
  );
};
