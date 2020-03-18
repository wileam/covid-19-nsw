const moment = require('moment');
const uniq = require('lodash.uniq');
const fs = require('fs').promises;
const path = require('path');
const mkdirp = require('mkdirp-promise');
const { existsSync } = require('fs');

const { base } = require('../airtable.js');
const consts = require('../../src/consts.json');

const MAX_RECORDS = 2000;

function getSummaryByDate(records, dateString) {
  const date = moment(dateString);
  // all records before the date
  records = records.filter(record => {
    const d = moment(record.DIAGNOSIS);
    if (date.isAfter(d)) {
      return true;
    }

    if (!date.isAfter(d) && !date.isBefore(d)) {
      return true;
    }

    return false;
  });

  const summary = {
    date: date.format('MMM DD, Y'),
    totalConfirmedNumber: records.length,
    totalRecoveredNumber: 0,
    totalDeathNumber: 0,
    totalRemianNumber: 0,
    todayNewNumber: 0,
    otherStateNumber: {
      all: 0,
      active: 0,
      death: 0,
      discharged: 0
    },
    hide: false,
    hasOtherState: false
  };

  records.forEach(record => {
    if (dateString === record.DIAGNOSIS) {
      summary.todayNewNumber++;
      if (record.HIDE) {
        summary.hide = true;
      }
    }
    if ('discharged' === record.STATUS) {
      summary.totalRecoveredNumber++;
    }
    if ('death' === record.STATUS) {
      summary.totalDeathNumber++;
    }
    if (record.OTHER_STATE_RESIDENT) {
      summary.hasOtherState = true;
      // status default to `active` if not specified
      summary.otherStateNumber[record.STATUS || 'active']++;
      summary.otherStateNumber.all++;
    }
  });

  const totalRemianNumber =
    summary.totalConfirmedNumber -
    summary.totalRecoveredNumber -
    summary.totalDeathNumber;

  summary.totalRemianNumber = totalRemianNumber;
  return summary;
}

async function fetchAllCases() {
  console.log('fetching all confirmed cases...');
  let records = await base('Cases')
    .select({
      maxRecords: MAX_RECORDS,
      view: 'All confirmed cases'
    })
    .all();
  return records.map(({ fields }) => {
    return {
      NO: fields[consts.NO],
      DIAGNOSIS: fields[consts.DIAGNOSIS],
      STATUS: fields[consts.STATUS],
      DETAILS: fields[consts.DETAILS],
      SOURCE: fields[consts.SOURCE],
      STATE: fields[consts.STATE],
      UPDATED: fields[consts.UPDATED],
      HIDE: fields[consts.HIDE],
      ORIGINATE_TYPE: fields[consts.ORIGINATE_TYPEO],
      OTHER_STATE_RESIDENT: fields[consts.OTHER_STATE_RESIDENT],
      SUBURB: fields[consts.SUBURB],
      GENDER: fields[consts.GENDER],
      AGE: fields[consts.AGE]
    };
  });
}

/**
 * records:
    {
      NO: '210',
      DIAGNOSIS: '2020-03-17',
      STATUS: 'active',
      DETAILS: 'an additional 39 cases of COVID-19 have been diagnosed since our last update at 11am, March 16',
      SOURCE: 'https://www.health.nsw.gov.au/news/Pages/20200317_01.aspx',
      STATE: 'NSW',
      UPDATED: '2020-03-17T13:33:32.000Z',
      HIDE: undefined,
      ORIGINATE_TYPE: undefined,
      OTHER_STATE_RESIDENT: undefined,
      SUBURB: undefined,
      GENDER: undefined,
      AGE: undefined
    }
 */
function dailyHistory(records) {
  const uniqDates = uniq(records.map(({ DIAGNOSIS }) => DIAGNOSIS));
  const dailyHistory = [];
  for (let i = uniqDates.length - 1; i >= 0; i--) {
    const date = uniqDates[i];
    dailyHistory.push(getSummaryByDate(records, date));
  }
  return dailyHistory;
}

async function ensureExist(filePath) {
  const dirname = path.dirname(filePath);
  if (!existsSync(dirname)) {
    console.log(`${dirname} not exist, creating...`);
    await mkdirp(dirname);
  }
}

async function writeDataFile(state, dailyHistory, predict) {
  /* ############### dailyHistory START ############### */
  const dailyHistoryTpl = `
export const dailyHistorys = ${JSON.stringify(dailyHistory, null, 2)};
    `;
  const dailyHistoryPath = path.join(
    process.cwd(),
    `src/data/${state.toUpperCase()}/dailyHistory.js`
  );
  await ensureExist(dailyHistoryPath);
  await fs.writeFile(dailyHistoryPath, dailyHistoryTpl.trim());
  /* ############### dailyHistory END ############### */

  /* ############### predict START ############### */
  const predictPath = path.join(process.cwd(), `src/data/${state}/predict.js`);
  await ensureExist(predictPath);
  const predictTpl = `
export const predicts = ${JSON.stringify(predict, null, 2)};
    `;
  await fs.writeFile(predictPath, predictTpl.trim());
  /* ############### predict END ############### */

  /* ############### index START ############### */
  const indexPath = path.join(process.cwd(), `src/data/${state}/index.js`);
  await ensureExist(indexPath);
  const indexTpl = `
import { dailyHistorys } from './dailyHistory';
import * as moment from 'moment';
let todaySummarys = dailyHistorys[dailyHistorys.length - 1];
const todayDateString = moment()
  .format('MMM DD, Y')
  .toString();
if (todayDateString !== todaySummarys.date) {
  todaySummarys = JSON.parse(JSON.stringify(todaySummarys));
  todaySummarys.date = todayDateString;
  todaySummarys.todayNewNumber = 0;
}
export { todaySummarys, dailyHistorys };
export * from './predict';
  `;
  await fs.writeFile(indexPath, indexTpl.trim());
  /* ############### index END ############### */
}

module.exports = {
  getSummaryByDate,
  fetchAllCases,
  dailyHistory,
  writeDataFile
};
