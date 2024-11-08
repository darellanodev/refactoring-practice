const invoices = require('./invoices.json');
const games = require('./games.json');
const statement = require('./statement.js');



const result = statement(invoices[0], games);
console.log(result);