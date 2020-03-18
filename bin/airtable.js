const Airtable = require('airtable');
const assert = require('assert');

assert(process.env.BASE_ID, 'Please set BASE_ID!');
assert(process.env.AIRTABLE_API_KEY, 'Please set AIRTABLE_API_KEY!');

module.exports = { base: Airtable.base(process.env.BASE_ID) };
