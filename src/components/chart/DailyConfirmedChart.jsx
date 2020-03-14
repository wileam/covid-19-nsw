import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { dailyHistorys } from '../../data/dailyHistory';
// import { dailyData, predictedData } from '../../data';


const dailyChartData = {
  todayData: dailyHistorys.slice(2).map(({date, todayNewNumber}) => [new Date(date), todayNewNumber]),
  totalData: dailyHistorys.slice(2).map(({date, totalConfirmedNumber}) => [new Date(date), totalConfirmedNumber]),
  // predictData: predictedData.map(([date, predictedTotal]) => [
  //   new Date(date),
  //   Math.round(predictedTotal)
  // ]),
};

const getOptions = data => {
  return {
    legend: {
      show: true,
      selected: {
        total: true,
        // 'predicted total': false,
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
      // {
      //   type: 'line',
      //   name: 'predicted total',
      //   data: data.predictData,
      //   smooth: false,
      //   itemStyle: {
      //     normal: {
      //       label: {
      //         show: true,
      //         position: 'right'
      //       },
      //       lineStyle: {
      //         width: 2,
      //         type: 'dotted' //'dotted'虚线 'solid'实线
      //       }
      //     }
      //   }
      // },
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
