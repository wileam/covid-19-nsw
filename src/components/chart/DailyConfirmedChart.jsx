import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { dailyData, predictedData } from '../../data';

const dailyChartData = {
  todayData: dailyData.map(([date, today]) => [new Date(date), today]),
  totalData: dailyData.map(([date, _today, total]) => [new Date(date), total]),
  predictData: predictedData.map(([date, predictedTotal]) => [
    new Date(date),
    Math.round(predictedTotal)
  ]),
  deathData: dailyData.map(([date, _today, _total, death]) => [
    new Date(date),
    death
  ])
};

const getOptions = data => {
  return {
    legend: {
      show: true,
      selected: {
        total: true,
        'predicted total': false,
        'new cases on the day': true
        // 'new death cases': true
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
        data: data.totalData
      },
      {
        type: 'line',
        name: 'predicted total',
        data: data.predictData,
        smooth: false,
        itemStyle: {
          normal: {
            lineStyle: {
              width: 2,
              type: 'dotted' //'dotted'虚线 'solid'实线
            }
          }
        }
      },
      { type: 'bar', name: 'new cases on the day', data: data.todayData }
      // { type: 'bar', name: 'new death cases', data: data.deathData }
    ]
  };
};

export const DailyConfirmedChart = () => (
  <>
    <ReactEcharts option={getOptions(dailyChartData)} />
  </>
);
