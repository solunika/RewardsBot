const mongoose = require('mongoose');
mongoose.connect('mongodb://rewards:Rewards01@ds253348.mlab.com:53348/rewards', { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', {
  uid: String,
  wallets: [{
    uid: String,
    amount: Number,
    name: String
  }]
});

module.exports.findUserWallet = async (usrId, svrId) => {
  const user = await User.findOne({ uid: new RegExp(usrId) })
  return user ? user.wallets.find(w => w.uid === svrId) : null
}
module.exports.deposit = async (usrId, svr, amount) => {
  usrId = usrId.replace(/[^0-9.]/g, "");
  const svrId = svr.id.replace(/[^0-9.]/g, "");
  const walletPath = `wallets.${svrId}`
  const user = await User.update(
    { uid: usrId },
    {
      $inc: { [walletPath + ".amount"]: amount },
      $set: { [walletPath + ".name"]: svr.name }
    },
    { upsert: true })

  // return null
}