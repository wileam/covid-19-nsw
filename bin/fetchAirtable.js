#!/usr/bin/env node

const Airtable = require('airtable');
const moment = require('moment');
const tz = require('moment-timezone');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const base = Airtable.base(process.env.BASE_ID);

const todayDateString = tz('Australia/Sydney').format('YYYY-MM-DD');

function getSummaryByDate(records, dateString) {
  const date = moment(dateString);
  records = records.filter(record => {
    const d = moment(record.get('Diagnosis'));
    if (date.isAfter(d)) {
      return true;
    }

    if (!date.isAfter(d) && !date.isBefore(d)) {
      return true;
    }

    return false;
  });

  const todayRecords = [];
  const recoveredRecords = [];
  const deathRecords = [];

  records.forEach(record => {
    if (dateString === record.get('Diagnosis')) {
      todayRecords.push(record);
    }
    if ('discharged' === record.get('Status')) {
      recoveredRecords.push(record);
    }
    if ('death' === record.get('Status')) {
      deathRecords.push(record);
    }
  });

  const totalRemianNumber = records.length - recoveredRecords.length - deathRecords.length;

  return {
    totalConfirmedNumber: records.length,
    totalRecoveredNumber: recoveredRecords.length,
    totalDeathNumber: deathRecords.length,
    totalRemianNumber,
    todayNewNumber: todayRecords.length,
  };
}

function dailyHistory(records) {
  const uniqRecords = _.uniqBy(records, e => e.get('Diagnosis'));
  const dailySummaryHistory = [];
  for (let i = uniqRecords.length - 1; i >= 0; i--) {
    const record = uniqRecords[i];
    const date = record.get('Diagnosis');
    const summary = getSummaryByDate(records, date);
    dailySummaryHistory.push(
      {
        date,
        todayNewNumber: summary.todayNewNumber,
        totalConfirmedNumber: summary.totalConfirmedNumber
      }
    );
  }
  return dailySummaryHistory;
}

(async () => {
  let records = await base('NSW').select({
    maxRecords: 2000,
    view: "All confirmed cases"
  }).all();

  const dailySummaryPath = path.join(process.cwd(), 'src/data/todaySummary.js');
  const todaySummarys = getSummaryByDate(records, todayDateString);
  const dailySummaryTpl = `
export const todaySummarys = ${JSON.stringify(todaySummarys, null, 2)};
  `
  fs.writeFileSync(dailySummaryPath, dailySummaryTpl);

  const dailyHistorys = dailyHistory(records);
  const dailyHistorysTpl = `
export const dailyHistorys = ${JSON.stringify(dailyHistorys, null, 2)};
  `
  const dailyHistoryPath = path.join(process.cwd(), 'src/data/dailyHistory.js');
  fs.writeFileSync(dailyHistoryPath, dailyHistorysTpl);
})().catch(e => {
  console.log(e);
});
