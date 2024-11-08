const statement = require('../statement')
const invoices = require('./invoices.json')
const games = require('./games.json')

test('generates a statement for an invoice', () => {
  const invoice = invoices[0]
  const result = statement(invoice, games)
  expect(result).toContain(`Statement for michael123`)
  expect(result).toContain(`Gif Tower Defense: $2.70 (12 days)`)
  expect(result).toContain(`Task Eater Manager: $10.20 (20 days)`)
  expect(result).toContain(`Amount owed is $12.90`)
});


