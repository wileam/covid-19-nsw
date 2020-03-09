import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { dailyData } from '../../data';

const dailyChartData = {
  todayData: dailyData.map(([date, today]) => [new Date(date), today]),
  totalData: dailyData.map(([date, _today, total]) => [new Date(date), total]),
  deathData: dailyData.map(([date, _today, _total, death]) => [
    new Date(date),
    death
  ])
};

const getOptions = data => {
  return {
    legend: {
      show: true
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
        name: 'total confirmed cases',
        data: data.totalData
      },
      { type: 'bar', name: 'new cases on the day', data: data.todayData },
      { type: 'bar', name: 'new death cases', data: data.deathData }
    ]
  };
};

export const DailyConfirmedChart = () => (
  <>
    <ReactEcharts option={getOptions(dailyChartData)} />
  </>
);
