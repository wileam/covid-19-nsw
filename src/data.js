// date, new today, total confirmed, total death
export const dailyData = [
  // ['January 24, 2020', 0, 0, 0],
  // ['January 25, 2020', 3, 3, 0],
  // ['January 27, 2020', 1, 4, 0],
  ['March 1, 2020', 2, 6, 0],
  ['March 2, 2020', 3, 9, 0],
  ['March 3, 2020', 6, 15, 0],
  ['March 4, 2020', 7, 22, 1],
  ['March 5, 2020', 8, 25, 0],
  ['March 6, 2020', 3, 28, 0],
  ['March 7, 2020', 8, 36, 0],
  ['March 8, 2020', 4, 40, 1],
  ['March 9, 2020', 7, 47, 0],
  ['March 10, 2020', 14, 61, 0],
  ['March 11, 2020', 4, 65, 0]
];

// date, total confirmed, total wip, total excluded, total tested
export const stastics = [
  ['March 7, 2020 09:00:00', 34, 545, 6217, 6796],
  ['March 7, 2020 21:00:00', 36, 488, 6690, 7214],
  ['March 8, 2020 09:00:00', 38, 488, 6690, 7216],
  ['March 8, 2020 21:00:00', 40, 576, 7361, 7977], // nsw health said total tested is 8008, however that seems a mistake, I updated with the calculation total
  ['March 9, 2020 16:32:00', 47, 476, 7848, 8371],
  ['March 10, 2020 07:00:00', 55, 618, 8361, 9034],
  ['March 10, 2020 21:00:00', 61, 1008, 9096, 10165],
  ['March 11, 2020 13:00:00', 65, 1004, 9152, 10221]
];

export const sourceData = [
  {
    name: 'overseas',
    value: 34
  },
  {
    name: 'contact of confirmed case',
    value: 32
  },
  {
    name: 'under investigation',
    value: 10
  },
  {
    name: 'not identified',
    value: 2
  }
];

const today = dailyData[dailyData.length - 1][1];
const totalConfirmed = dailyData[dailyData.length - 1][2];
const death = dailyData.map(data => data[3]).reduce((a, b) => a + b);
// eslint-disable-next-line
const [_1, _2, wip, excluded, totalTested] = stastics[stastics.length - 1];

// Please manually updating the following data:
const recovered = 4;

const remain = totalConfirmed - death - recovered;

// ploymomial regression prediction, assume the model to be y = ax^2 + bx + c
function predictTotalResult(nextDay) {
  const regA = 0.25874;
  const regB = 2.76783;
  const regC = 3.6727;
  return regA * nextDay * nextDay + regB * nextDay + regC;
}

export let predictedData = [];
for (let curDay = 0; curDay < dailyData.length; curDay++) {
  let curDayName = dailyData[curDay][0];
  let curPredictResult = predictTotalResult(curDay + 1);
  predictedData.push([curDayName, curPredictResult]);
}
predictedData.push(['March 12, 2020', predictTotalResult(12)]);
predictedData.push(['March 13, 2020', predictTotalResult(13)]);
predictedData.push(['March 14, 2020', predictTotalResult(14)]);

export const summaryData = {
  totalConfirmed,
  remain,
  today,
  death,
  recovered,
  wip,
  excluded,
  totalTested
};
