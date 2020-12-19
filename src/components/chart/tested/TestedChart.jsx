import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { commonConfig } from '../commonConfig';

// const getOptions = statistics => {
//   let data = {};
//   let keys = [];
//   let series = [];
//   let dataZoom = [];

//   for (let i = 0; i < statistics.length; i++) {
//     const statistic = statistics[i];
//     for (const key in statistic) {
//       if (
//         statistic.hasOwnProperty(key) &&
//         typeof statistic[key] === 'number' &&
//         key !== 'total calc'
//       ) {
//         if (!data[key]) {
//           data[key] = [];
//         }
//         keys.push(key);
//         data[key].push([new Date(statistic.Date), statistic[key]]);
//       }
//     }
//   }

//   for (let i = 0; i < keys.length; i++) {
//     const key = keys[i];
//     series.push({ type: 'line', name: key, data: data[key] });
//   }

//   if (keys.length < 30) {
//     dataZoom = [
//       {
//         disable: true
//       }
//     ];
//   }

//   return {
//     ...commonConfig,
//     title: {
//       ...commonConfig.title,
//       show: true,
//       text: 'Tested'
//     },
//     grid: {
//       top: 80
//     },
//     yAxis: [
//       {
//         ...commonConfig.yAxis
//       }
//     ],
//     legend: {
//       show: true,
//       selected: {
//         'total tested': true,
//         excluded: false,
//         'under investigation': false
//       },
//       top: 30
//     },
//     dataZoom,
//     series
//   };
// };

const getOptionsForPositiveRate = statistics => {
  let positiveRate = statistics.map(s => [
    new Date(s.Date),
    s['positive rate']
  ]);
  let dailyPositiveRate = statistics.map(s => [
    new Date(s.Date),
    s['daily positive rate']
  ]);

  return {
    ...commonConfig,
    title: {
      ...commonConfig.title,
      show: true,
      text: 'Positive rate'
    },
    grid: {
      top: 80
    },
    tooltip: {
      show: true,
      formatter: ({ value }) => {
        return (value[1] * 100).toFixed(2) + '%';
      },
      axisPointer: {
        type: 'shadow' // 'line' | 'shadow'
      }
    },
    legend: {
      show: true,
      selected: {},
      top: 30
    },
    yAxis: {
      ...commonConfig.yAxis,
      name: '%',
      axisLabel: {
        formatter: value => {
          return (value * 100).toFixed(1);
        }
      }
    },
    series: [
      {
        type: 'line',
        name: 'positive rate',
        data: positiveRate,

        formatter: ({ value }) => {
          return (value[1] * 100).toFixed(2) + '%';
        }
      },
      {
        type: 'line',
        name: 'daily positive rate',
        data: dailyPositiveRate,

        formatter: ({ value }) => {
          return (value[1] * 100).toFixed(2) + '%';
        }
      }
    ]
  };
};

export const StatisticsChart = ({ statistics }) => (
  <>
    {/* <ReactEcharts option={getOptions(statistics)} theme='custom_theme'/> */}
    <ReactEcharts
      option={getOptionsForPositiveRate(statistics)}
      theme='custom_theme'
    />
  </>
);
