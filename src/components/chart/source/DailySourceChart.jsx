import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { getSeriesFromData, commonConfig } from '../commonConfig';
import { sourceKeysMap } from './const';
// import * as moment from 'moment'

const getTodayChartOptions = (id, data) => {
  let { dates, series } = getSeriesFromData(data, 'source', 'bar');
  // console.log(dates, series);

  return {
    title: {
      ...commonConfig.title,
      show: true,
      text: 'Daily cases by source'
    },
    legend: {
      show: true,
      top: 30,
      selected: {
        overseas: false,
        'contact of a confirmed case': false,
        interstate: false
      }
    },
    grid: {
      top: 80
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow' // 'line' | 'shadow'
      }
    },
    xAxis: {
      ...commonConfig.xAxis,
      splitLine: {
        show: true
      },
      type: 'category',
      data: dates
    },
    yAxis: {
      ...commonConfig.yAxis,
      type: 'value'
    },
    dataZoom: [
      {
        disabled: false
      },
      {
        type: 'inside',
        zoomOnMouseWheel: false
      }
    ],
    series
  };
};

const formatDailySourceFromAirtable = source => {
  let dailySourceData = [];
  for (let i = 1; i < source.length; i++) {
    const yesterdaySource = source[i];
    const todaySource = source[i - 1];
    let todayDailySource = {
      Date: todaySource.Date
    };
    for (const key in todaySource) {
      if (
        todaySource.hasOwnProperty(key) &&
        typeof todaySource[key] === 'number'
      ) {
        todayDailySource[key] = todaySource[key] - yesterdaySource[key];
      }
    }
    dailySourceData.push(todayDailySource);
  }
  return dailySourceData;
};

const formatDailySourceFromNSWApi = casesBySourceAndDate => {
  return casesBySourceAndDate.map(d => {
    // d.date = moment(d.date, 'DD/MM/YYYY').toDate();
    for (const [key, value] of sourceKeysMap.entries()) {
      if (typeof d[key] === 'undefined') {
        if (typeof d[value] === 'undefined') {
          d[value] = 0;
        }
      } else {
        d[value] = d[key];
        delete d[key];
      }
    }
    return d;
  });
};

const formatDailySource = (id, source) => {
  if (id === 'NSW') {
    return formatDailySourceFromNSWApi(source.casesBySourceAndDate);
  } else {
    return formatDailySourceFromAirtable(source);
  }
};

export const DailySourceChart = ({ id, source }) => {
  let dailySourceData = formatDailySource(id, source);
  // console.log(dailySourceData);

  return (
    <>
      <ReactEcharts
        option={getTodayChartOptions(id, dailySourceData)}
        theme='custom_theme'
      />
    </>
  );
};
