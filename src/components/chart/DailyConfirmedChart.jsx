import React from 'react';
import ReactEcharts from 'echarts-for-react';

const getOptions = (id, dailyHistorys, predicts) => {
  let todayData = dailyHistorys.map(({date, todayNewNumber}) => [new Date(date), todayNewNumber]);
  let totalData = dailyHistorys.map(({date, totalConfirmedNumber}) => [new Date(date), totalConfirmedNumber]);
  let predictData = predicts.map(({date, predictedTotalConfirmedNumber}) => [
    new Date(date),
    predictedTotalConfirmedNumber
  ]);
  const series = [
    {
      type: "line",
      name: "total",
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
      type: "bar",
      name: "new cases on the day",
      data: todayData,
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: "top"
          }
        }
      }
    }
  ];

    series.push({
      type: "line",
      name: "predicted total",
      data: predictData,
      smooth: false,
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: "right"
          },
          lineStyle: {
            width: 2,
            type: "dotted" //'dotted'虚线 'solid'实线
          }
        }
      }
    });
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
    series,
  };
};

export const DailyConfirmedChart = ({id, dailyHistorys, predicts}) => (
  <>
    <ReactEcharts option={getOptions(id, dailyHistorys, predicts)} />
  </>
);
