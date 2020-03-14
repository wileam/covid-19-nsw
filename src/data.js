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
  ['March 11, 2020', 4, 65, 0],
  ['March 12, 2020', 13, 78, 0],
  ['March 13, 2020', 14, 92, 0],
  ['March 13, 2020', 20, 112, 0],
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
  ['March 11, 2020 13:00:00', 65, 1004, 9152, 10221],
  ['March 12, 2020 13:00:00', 78, 1831, 11040, 12949], // nsw health said total tested is 14856, which is off the calculated total by 1907, corrected with calculation
  ['March 13, 2020 11:00:00', 92, 1928, 14665, 16685],
  ['March 14, 2020 11:00:00', 112, 1668, 18716, 20496]
];

export const sourceData = [
  {
    name: 'overseas',
    value: 34+7
  },
  {
    name: 'contact of confirmed case',
    value: 32+1
  },
  {
    name: 'under investigation',
    value: 10+5
  },
  {
    name: 'not identified',
    value: 2+1
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

// Exponential Regression prediction
function predictTotalResultWithExpR(day) {
  const regA = 9.351789611;
  const regB = 0.1793492611;
  return regA * Math.exp(regB * day)
}

// ploymomial regression prediction, assume the model to be y = ax^2 + bx + c
// function predictTotalResultWithPR(nextDay) {
//   const regA = 0.36063936;
//   const regB = 1.731268731;
//   const regC = 5.622377622;
//   return regA * nextDay * nextDay + regB * nextDay + regC;
// }


// generate predicted data
export let predictedData = [];

function addPredictionData(dailyData, predictedData, predictTotalResult) {
  for (let curDay = 0; curDay < dailyData.length; curDay++) {
    let curDayName = dailyData[curDay][0];
    let curPredictResult = predictTotalResult(curDay + 1);
    predictedData.push([curDayName, curPredictResult]);
  }
  // predict next 3 days
  const lastIndex = dailyData.length -1;
  const tomorrowDate = new Date(dailyData[lastIndex][0]);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const nextTowDate = new Date(dailyData[lastIndex][0]);
  nextTowDate.setDate(nextTowDate.getDate() + 2);
  const nextThreeDate = new Date(dailyData[lastIndex][0]);
  nextThreeDate.setDate(nextThreeDate.getDate() + 3);

  predictedData.push([tomorrowDate.toDateString(), predictTotalResult(dailyData.length + 1)]);
  predictedData.push([nextTowDate.toDateString(), predictTotalResult(dailyData.length + 2)]);
  predictedData.push([nextThreeDate.toDateString(), predictTotalResult(dailyData.length + 3)]);
}

// add prediction with selected model
addPredictionData(dailyData, predictedData, predictTotalResultWithExpR);


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
