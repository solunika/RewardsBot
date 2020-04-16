const { simplifyId } = require('../../common/utils')
const db = require('nedb-promise')({
  // these options are passed through to nedb.Datastore
  filename: 'shop.json',
  autoload: true // so that we don't have to call loadDatabase()
})

module.exports.createProduct = async (owner, svr, productName, productAmount, productQty = 1) => {
  owner = simplifyId(owner);
  const svrId = simplifyId(svr.id),
    created = await db.update(
      { server: svrId },
      { $push: { products: { owner, creationDate: new Date(), name: productName, amount: productAmount, qty: productQty } } },
      { upsert: true })
  return created;
}

module.exports.listProducts = async (svr) => {
  const svrId = simplifyId(svr.id),
    productList = await db.findOne({ server: svrId });
  return productList?productList.products: null;
}

module.exports.getProduct = async (svr, index) => {
  const svrId = simplifyId(svr.id);
  return (await db.findOne({ server: svrId })).products[index];
}

module.exports.buyProduct = async (svr, index) => {
  const svrId = simplifyId(svr.id);
  return await db.update(
    { server: svrId },
    { $pop: { products: index } }
  );
}