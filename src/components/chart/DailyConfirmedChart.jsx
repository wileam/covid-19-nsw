import React from 'react';
import ReactEcharts from 'echarts-for-react';

const getOptions = (dailyHistorys, predicts) => {
  let todayData = dailyHistorys.map(({ date, todayNewNumber }) => [
    new Date(date),
    todayNewNumber
  ]);
  let totalData = dailyHistorys.map(({ date, totalConfirmedNumber }) => [
    new Date(date),
    totalConfirmedNumber
  ]);
  let predictData = predicts.map(({ date, predictedTotalConfirmedNumber }) => [
    new Date(date),
    predictedTotalConfirmedNumber
  ]);
  return {
    legend: {
      show: true,
      selected: {
        total: true,
        'predicted total': false,
        'new': true
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
        data: totalData,
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
        data: predictData,
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
        name: 'new',
        data: todayData,
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

export const DailyConfirmedChart = ({ dailyHistorys, predicts }) => (
  <>
    <ReactEcharts option={getOptions(dailyHistorys, predicts)} />
  </>
);
