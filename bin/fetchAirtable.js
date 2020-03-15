#!/usr/bin/env node


const Airtable = require("airtable");
const moment = require("moment");
const tz = require("moment-timezone");
const fs = require("fs");
const path = require("path");
const uniqBy = require("lodash.uniqby");
const assert = require("assert");

assert(process.env.BASE_ID, 'Please set BASE_ID!');
assert(process.env.AIRTABLE_API_KEY, 'Please set AIRTABLE_API_KEY!');

const predict = require('./predict.js');
const tpl = require('./tpl.js');

const base = Airtable.base(process.env.BASE_ID);

const todayDateString = tz.tz('Australia/Sydney').format('YYYY-MM-DD');

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

  const totalRemianNumber =
    records.length - recoveredRecords.length - deathRecords.length;

  return {
    totalConfirmedNumber: records.length,
    totalRecoveredNumber: recoveredRecords.length,
    totalDeathNumber: deathRecords.length,
    totalRemianNumber,
    todayNewNumber: todayRecords.length
  };
}

function dailyHistory(records) {
  const uniqRecords = uniqBy(records, e => e.get("Diagnosis"));
  const dailySummaryHistory = [];
  for (let i = uniqRecords.length - 1; i >= 0; i--) {
    const record = uniqRecords[i];
    const date = record.get('Diagnosis');
    const hide = record.get('hide');
    const summary = getSummaryByDate(records, date);
    dailySummaryHistory.push({
      date: moment(date).format('MMM DD, Y'),
      todayNewNumber: summary.todayNewNumber,
      totalConfirmedNumber: summary.totalConfirmedNumber,
      hide
    });
  }
  return dailySummaryHistory;
}

function sleep(time) {
  return new Promise(r => {
    setTimeout(r, time);
  });
}

const states = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'NT', 'ACT'];

(async () => {
  for (let i = 0; i < states.length; i++) {
    const name = states[i];
    console.log(`fetching ${name}'s data...`);
    let records = await base(name)
      .select({
        maxRecords: 500,
        view: 'All confirmed cases'
      })
      .all();

    /* todaySummarys START */
    const todaySummaryPath = path.join(
      process.cwd(),
      `src/data/${name}/todaySummary.js`
    );
    const todaySummarys = getSummaryByDate(records, todayDateString);
    const todaySummaryTpl = `
  export const todaySummarys = ${JSON.stringify(todaySummarys, null, 2)};
    `;
    fs.writeFileSync(todaySummaryPath, todaySummaryTpl);
    /* todaySummarys END */

    /* dailyHistorys START */
    const dailyHistorys = dailyHistory(records).filter(dailyHistory => !dailyHistory.hide);
    const dailyHistorysTpl = `
  export const dailyHistorys = ${JSON.stringify(dailyHistorys, null, 2)};
    `;
    const dailyHistoryPath = path.join(
      process.cwd(),
      `src/data/${name}/dailyHistory.js`
    );
    fs.writeFileSync(dailyHistoryPath, dailyHistorysTpl);
    /* dailyHistorys END */

    /* predict START */
    const predictPath = path.join(process.cwd(), `src/data/${name}/predict.js`);
    const predicts = predict(dailyHistorys);
    const predictsSummaryTpl = `
    export const predicts = ${JSON.stringify(predicts, null, 2)};
      `;
    fs.writeFileSync(predictPath, predictsSummaryTpl);
    /* predict END */

    /* index START */
    const indexPath = path.join(process.cwd(), `src/data/${name}/index.js`);
    const indexTpl = `
    export * from './dailyHistory';
    export * from './todaySummary';
    export * from './predict';
      `;
    fs.writeFileSync(indexPath, indexTpl);
    /* index END */

    // wait for a while to avoid rate limit
    await sleep(500);
  }

  const dataPath = path.join(
    process.cwd(),
    `src/data/index.js`
  );
  const dataTpl = tpl(states);
  fs.writeFileSync(dataPath, dataTpl);
})().catch(e => {
  console.log(e);
});

(async () => {
  /* statistics START */
  console.log(`fetching statistics' data...`);
  const statisticsPath = path.join(process.cwd(), `src/data/statistics.js`);
  let statistics = await base('Statistics')
    .select({
      maxRecords: 500,
      view: 'Grid view'
    })
    .all();

  statistics = statistics.map(statistic => statistic.fields);
  const statisticsSummaryTpl = `
export const statistics = ${JSON.stringify(statistics, null, 2)};
  `;
  fs.writeFileSync(statisticsPath, statisticsSummaryTpl);
  /* statistics END */
})().catch(e => {
  console.log(e);
});
