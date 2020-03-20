const Airtable = require('airtable');
const assert = require('assert');

assert(process.env.NEW_BASE_ID, 'Please set NEW_BASE_ID!');
assert(process.env.AIRTABLE_API_KEY, 'Please set AIRTABLE_API_KEY!');

module.exports = { base2: Airtable.base(process.env.NEW_BASE_ID) };
