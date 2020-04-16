const { simplifyId } = require('../../common/utils')
const db = require('nedb-promise')({
  // these options are passed through to nedb.Datastore
  filename: 'transactions.json',
  autoload: true // so that we don't have to call loadDatabase()
})

module.exports.buyProduct = async (svr, buyerId, product) => {
  let amount = parseFloat(product.amount);
  const svrId = simplifyId(svr.id);
  buyerId = simplifyId(buyerId);
  const transaction = await db.update(
    { server: svrId },
    { $push: { transactions: { description: `Product purchase: ${product.name}`, amount, origin: product.owner, destination: buyerId, creationDate: new Date() } } },
    { upsert: true })
}

module.exports.deposit = async (svr, from, to, amount) => {
  const svrId = simplifyId(svr.id);
  amount = parseFloat(amount);
  from = simplifyId(from);
  to = simplifyId(to);
  const transaction = await db.update(
    { server: svrId },
    { $push: { transactions: { description: `Deposit`, amount, origin: from, destination: to, creationDate: new Date() } } },
    { upsert: true })
}

module.exports.transfer = async (svr, from, to, amount) => {
  const svrId = simplifyId(svr.id);
  amount = parseFloat(amount);
  from = simplifyId(from);
  to = simplifyId(to);
  const transaction = await db.update(
    { server: svrId },
    { $push: { transactions: { description: `Transfer`, amount, origin: from, destination: to, creationDate: new Date() } } },
    { upsert: true })
}