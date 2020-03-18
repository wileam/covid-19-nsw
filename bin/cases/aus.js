const { dailyHistory, writeDataFile } = require('./utils');
const predict = require('../predict.js');

module.exports = async function(records) {
  let dailyHistorys = dailyHistory(records);
  // Hide the hidden records
  dailyHistorys = dailyHistorys.filter(({ hide }) => !hide);
  const predicts = predict(dailyHistorys, 'AUS');
  await writeDataFile('AUS', dailyHistorys, predicts);
};
