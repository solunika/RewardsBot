const { simplifyId } = require('../../common/utils')
const db = require('nedb-promise')({
  // these options are passed through to nedb.Datastore
  filename: 'transactions.json',
  autoload: true // so that we don't have to call loadDatabase()
})

module.exports.buyProduct = async (svr, buyerId, product) => {
  const svrId = simplifyId(svr.id);
  buyerId = simplifyId(buyerId);
  const transaction = await db.update(
    { server: svrId },
    { $push: { transactions: { description: `Product purchase: ${product.name}`, amount: product.amount, seller: product.owner, buyer: buyerId, creationDate: new Date() } } }
  );
  return product
}