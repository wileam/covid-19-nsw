export const DEFAULT_DAYS = 60;
export const commonConfig = {
  title: {
    textStyle: {
      fontSize: 12,
      fontWeight: 'normal'
    }
  },
  legend: {
    show: true,
    top: 30
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow' // 'line' | 'shadow'
    }
  },
  toolbox: {
    feature: {
      restore: {
        title: 'restore'
      }
    }
  },
  xAxis: {
    type: 'time',
    minInterval: 3600 * 24 * 1000,
    splitLine: {
      show: false
    },
    axisLabel: {
      rotate: 45,
      formatter: value => {
        var date = new Date(value);
        var texts = [date.getMonth() + 1, date.getDate()];
        return texts.join('/');
      }
    }
  },
  yAxis: {
    type: 'value',
    formatter: value => {
      if (value >= 1000) {
        return `${value / 1000}k`;
      }
      return value;
    },
    splitLine: {
      show: true
    },
    axisLabel: {
      formatter: value => {
        if (value >= 1000) {
          return `${value / 1000}k`;
        }
        return value;
      }
    }
  },

  dataZoom: [
    {
      disabled: false,
      startValue: new Date(Date.now() - DEFAULT_DAYS * 24 * 60 * 60 * 1000)
    },
    {
      type: 'inside',
      zoomOnMouseWheel: false
    }
  ]
};

export const getSeriesFromData = (data, name, chartType = 'line') => {
  let dates = [];
  let chartData = {};
  for (let i = data.length - 1; i >= 0; i--) {
    const d = data[i];
    dates.push(d.Date || d.date);
    for (const key in d) {
      if (
        d.hasOwnProperty(key) &&
        key !== 'total' &&
        typeof d[key] === 'number'
      ) {
        if (!chartData[key]) chartData[key] = [];
        chartData[key].push(d[key] ? d[key] : 0);
      }
    }
  }

  let series = [];
  for (const key in chartData) {
    if (chartData.hasOwnProperty(key)) {
      const d = chartData[key];
      series.push({
        type: chartType,
        areaStyle: {},
        name: key,
        data: d,
        stack: name,
        itemStyle: {
          normal: {
            label: {
              show: false,
              position: 'right inside'
            }
          }
        }
      });
    }
  }

  return {
    dates,
    series
  };
};

export const formatDailyDataFromNSWApi = (
  data,
  key,
  MAP,
  dateFormatter,
  includesKey
) => {
  let dailyData = {};
  let dailyDataForChart = [];
  for (let i = 0; i < data.length; i++) {
    const record = data[i];
    let displayKey = MAP ? MAP(record[key]) : record[key];
    if (includesKey && !includesKey.includes(displayKey)) {
      continue;
    }
    if (!dailyData[record.notification_date]) {
      dailyData[record.notification_date] = {};
    }
    if (!dailyData[record.notification_date][displayKey]) {
      dailyData[record.notification_date][displayKey] = 1;
    } else {
      dailyData[record.notification_date][displayKey] += 1;
    }
  }
  for (const date in dailyData) {
    if (dailyData.hasOwnProperty(date)) {
      dailyDataForChart.push({
        Date: dateFormatter ? dateFormatter(date) : date,
        ...dailyData[date]
      });
    }
  }

  dailyDataForChart.reverse();

  return dailyDataForChart;
};

export const formatPercentDataFromNSWApi = (data, key, MAP) => {
  let dataMap = {};
  let chartData = [];
  for (let i = 0; i < data.length; i++) {
    const record = data[i];
    if (!dataMap[record[key]]) {
      dataMap[record[key]] = 1;
    } else {
      dataMap[record[key]] += 1;
    }
  }

  for (const key in dataMap) {
    if (dataMap.hasOwnProperty(key)) {
      chartData.push({
        name: MAP ? MAP(key) : key,
        value: dataMap[key]
      });
    }
  }

  return chartData;
};
