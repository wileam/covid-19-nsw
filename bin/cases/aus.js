const { dailyHistory, writeDataFile } = require('./utils');
const predict = require('../predict.js');

module.exports = async function(records) {
  let dailyHistorys = dailyHistory(records);
  dailyHistorys = dailyHistorys.map(dailyHistory => {
    if (dailyHistory.hasOtherState) {
      const { otherStateNumber } = dailyHistory;
      const { all, active, death, discharged } = otherStateNumber;
      dailyHistory.totalConfirmedNumber -= all;
      dailyHistory.totalRemianNumber -= active;
      dailyHistory.totalDeathNumber -= death;
      dailyHistory.totalRecoveredNumber -= discharged;
    }
    return dailyHistory;
  });

  // Hide the hidden records
  dailyHistorys = dailyHistorys.filter(({ hide }) => !hide);
  const predicts = predict(dailyHistorys, 'AUS');
  await writeDataFile('AUS', dailyHistorys, predicts);
};
