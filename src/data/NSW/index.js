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
