#!/usr/bin/env node

const { fetchAllCases } = require('./cases/utils');
const fetchState = require('./cases/state');
const fetchAus = require('./cases/aus');

(async () => {
  const allConfirmedCases = await fetchAllCases();
  await fetchState(allConfirmedCases);
  await fetchAus(allConfirmedCases);
})().catch(e => {
  console.log(e);
});
