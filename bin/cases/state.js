const states = require('../../src/states.json');
const { dailyHistory, writeDataFile } = require('./utils');
const predict = require('../predict.js');

function filterRecordsByState(records, state) {
  return records.filter(({ STATE }) => STATE === state);
}

async function generateDataByState(records, state) {
  records = filterRecordsByState(records, state);
  let dailyHistorys = dailyHistory(records);
  // Hide the hidden records
  dailyHistorys = dailyHistorys.filter(({ hide }) => !hide);
  const predicts = predict(dailyHistorys, state);
  await writeDataFile(state, dailyHistorys, predicts);
}

module.exports = async function(records) {
  for (const state of states) {
    await generateDataByState(records, state);
  }
};
