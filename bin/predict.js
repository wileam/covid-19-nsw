const moment = require("moment");

// Exponential Regression prediction
function predictTotalResultWithExpR(day) {
  const regA = 9.465373537;
  const regB = 0.1776784372;
  return Math.round(regA * Math.exp(regB * day));
}

function formatDate(date) {
  return moment(date).format("MMM DD, Y");
}

function predictNext(startDays, startDate, nextDays) {
  const predictedData = [];
  for (let i = 1; i <= nextDays; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    predictedData.push({
      date: formatDate(date),
      predictedTotalConfirmedNumber: predictTotalResultWithExpR(startDays + i)
    });
  }
  return predictedData;
}

module.exports = function predict(dailyHistorys) {
  const predictedData = [];
  const count = dailyHistorys.length;
  for (let curDay = 0; curDay < count; curDay++) {
    let curDayName = dailyHistorys[curDay].date;
    let curPredict = predictTotalResultWithExpR(curDay + 1);
    predictedData.push({
      date: curDayName,
      predictedTotalConfirmedNumber: curPredict
    });
  }

  const lastIndex = count - 1;
  const lastDate = dailyHistorys[lastIndex].date;

  // predict next 3 days
  predictedData.push(...predictNext(count, lastDate, 3));
  return predictedData;
};
