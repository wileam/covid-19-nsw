var colorPalette = [
  '#E01F54',
  '#38A69F',
  '#306CB3',
  '#E7B526',
  '#BB77C6',
  '#955E3F',
  '#DE7F49',
  '#97CFB8',
  '#3595CB',
  '#BF428D',
  '#9AAD26',
  '#82b6e9',
  '#ff6347',
  '#a092f1',
  '#0a915d',
  '#eaf889',
  '#6699FF',
  '#ff6666',
  '#3cb371',
  '#d5b158',
  '#38b6b6'
];

export const theme = {
  color: colorPalette,

  visualMap: {
    color: ['#e01f54', '#e7dbc3'],
    textStyle: {
      color: '#333'
    }
  },

  candlestick: {
    itemStyle: {
      normal: {
        color: '#e01f54',
        color0: '#001852',
        lineStyle: {
          width: 1,
          color: '#f5e8c8',
          color0: '#b8d2c7'
        }
      }
    }
  },

  graph: {
    color: colorPalette
  },

  gauge: {
    axisLine: {
      lineStyle: {
        color: [
          [0.2, '#E01F54'],
          [0.8, '#b8d2c7'],
          [1, '#001852']
        ],
        width: 8
      }
    }
  }
};
