import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { dailyHistorys } from '../../data/dailyHistory';
import { predicts } from '../../data/predict';

const dailyChartData = {
  todayData: dailyHistorys.map(({date, todayNewNumber}) => [new Date(date), todayNewNumber]),
  totalData: dailyHistorys.map(({date, totalConfirmedNumber}) => [new Date(date), totalConfirmedNumber]),
  predictData: predicts.map(({date, predictedTotalConfirmedNumber}) => [
    new Date(date),
    predictedTotalConfirmedNumber
  ]),
};

const getOptions = data => {
  return {
    legend: {
      show: true,
      selected: {
        total: true,
        'predicted total': false,
        'new cases on the day': true
      }
    },
    tooltip: {
      show: true
    },
    xAxis: {
      type: 'time'
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'line',
        name: 'total',
        data: data.totalData,
        itemStyle: {
          normal: {
            label: {
              show: true
            }
          }
        }
      },
      {
        type: 'line',
        name: 'predicted total',
        data: data.predictData,
        smooth: false,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'right'
            },
            lineStyle: {
              width: 2,
              type: 'dotted' //'dotted'虚线 'solid'实线
            }
          }
        }
      },
      {
        type: 'bar',
        name: 'new cases on the day',
        data: data.todayData,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'top'
            }
          }
        }
      }
    ]
  };
};

export const DailyConfirmedChart = () => (
  <>
    <ReactEcharts option={getOptions(dailyChartData)} />
  </>
);
