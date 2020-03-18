const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const str = fs.readFileSync(path.join(__dirname, 'data.ejs'), 'utf8');

module.exports = function tpl(states, tables) {
  const tpl = ejs.render(str, { states, tables }, {});
  return tpl;
};
