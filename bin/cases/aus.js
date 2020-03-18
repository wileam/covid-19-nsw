const { dailyHistory, writeDataFile } = require('./utils');
const predict = require('../predict.js');

module.exports = async function(records) {
  const dailyHistorys = dailyHistory(records);
  const predicts = predict(dailyHistorys, 'AUS');
  await writeDataFile('AUS', dailyHistorys, predicts);
};
