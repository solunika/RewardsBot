const { simplifyId } = require('../../common/utils')
const db = require('nedb-promise')({
  // these options are passed through to nedb.Datastore
  filename: 'users.json',
  autoload: true // so that we don't have to call loadDatabase()
})

module.exports.findUserWallet = async (usrId, svr) => {
  usrId = simplifyId(usrId);
  const svrId = simplifyId(svr.id),
    walletPath = `wallets.${svrId}`,
    user = await db.findOne({ uid: usrId, [walletPath]: { $exists: true } });
  return user ? user.wallets[svrId] : null
}

module.exports.deposit = async (usrId, svr, amount) => {
  usrId = simplifyId(usrId);
  const svrId = simplifyId(svr.id),
    walletPath = `wallets.${svrId}`;
  // This update create the wallet if not exists & add credits
  await db.update(
    { uid: usrId },
    {
      $inc: { [walletPath + ".amount"]: amount },
      $set: { [walletPath + ".name"]: svr.name }
    },
    { upsert: true })
}

module.exports.transfer = async (from, to, svr, amount) => {
  from = simplifyId(from);
  to = simplifyId(to);
  const svrId = simplifyId(svr.id),
    walletPath = `wallets.${svrId}`;
  // This update create the wallet if not exists & add credits
  const upd = await db.update(
    { uid: from, [walletPath + ".amount"]: { $gte: amount } },
    {
      $inc: { [walletPath + ".amount"]: -amount },
      $set: { [walletPath + ".name"]: svr.name }
    });
  if (upd) await db.update(
    { uid: to },
    {
      $inc: { [walletPath + ".amount"]: amount },
      $set: { [walletPath + ".name"]: svr.name }
    },
    { upsert: true })
  return upd;
}