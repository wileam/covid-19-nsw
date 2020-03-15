const moment = require("moment");
const PolynomialRegression = require( 'ml-regression-polynomial');
const ExpReg = require('exponential-regression').ExpReg;


const stateModelMapping = {
  'NSW': 'ER',
  'VIC': 'PR',
  'QLD': 'PR',
  'WA': 'PR',
  'SA': 'PR',
  'TAS': 'PR',
  'NT': 'PR',
  'ACT': 'PR'
};

// Exponential Regression prediction
function predictTotalResultWithExpR(day, params) {
  const regA = params['a'];
  const regB = params['b'];
  const regC = params['c'];
  return Math.round(regA + regB * Math.exp(regC * day));
}
// Polynomial Regression
function predictTotalResultWithPR(day, params) {
  const regA = params[0];
  const regB = params[1];
  const regC = params[2];
  return Math.round(regA + regB * day +regC * day * day)
}

function getModelInitAlgorithm(xRaw, yRaw, regressionName) {
  if ('ER' === regressionName) {
    return ExpReg.solve(xRaw, yRaw);
  }
  // by default init PR
  const degree = 2;
  const regression = new PolynomialRegression(xRaw, yRaw, degree);
  return regression.coefficients;
}

function predictTotalResult(day, params, regressionName) {
  if ('ER' === regressionName) {
    return predictTotalResultWithExpR(day, params);
  }
  return predictTotalResultWithPR(day, params);
}

function formatDate(date) {
  return moment(date).format("MMM DD, Y");
}

function predictNext(startDays, startDate, nextDays, params, mappedModel) {
  const predictedData = [];
  for (let i = 1; i <= nextDays; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    predictedData.push({
      date: formatDate(date),
      predictedTotalConfirmedNumber: predictTotalResult(startDays + i, params, mappedModel)
    });
  }
  return predictedData;
}

module.exports = function predict(dailyHistorys, stateName) {
  const predictedData = [];
  const mappedModel = stateModelMapping[stateName];
  // prepare raw data
  const count = dailyHistorys.length;
  // if invalid data, return 0 values
  if (count < 5) {
    for (let curDay = 0; curDay < count; curDay++) {
      let curDayName = dailyHistorys[curDay].date;
      predictedData.push({
        date: curDayName,
        predictedTotalConfirmedNumber: 0
      });
    }
    return predictedData;
  }
  const xRaw = [];
  const yRaw = [];
  for (let curDay = 0; curDay < count; curDay++) {
    xRaw.push(curDay + 1);
    yRaw.push(dailyHistorys[curDay].totalConfirmedNumber);
  }
  // calculate the params
  const params = getModelInitAlgorithm(xRaw, yRaw, mappedModel);
  // generate predicted data
  for (let curDay = 0; curDay < count; curDay++) {
    let curDayName = dailyHistorys[curDay].date;
    let curPredict = predictTotalResult(curDay + 1, params, mappedModel);
    predictedData.push({
      date: curDayName,
      predictedTotalConfirmedNumber: curPredict
    });
  }
  // add next 3 days prediction
  const lastIndex = count - 1;
  const lastDate = dailyHistorys[lastIndex].date;

  // predict next 3 days
  predictedData.push(...predictNext(count, lastDate, 3, params, mappedModel));
  return predictedData;
};
