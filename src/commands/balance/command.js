const WaletsDb = require("../../db/wallets")


module.exports.balance = async (msg, ) => {
  msg.channel.startTyping();
  let wallet = await WaletsDb.findOne({ user: new RegExp(msg.author.id) });
  msg.channel.stopTyping();
  msg.channel.send(`Su saldo es $${wallet.amount || 0}`);
}

module.exports.description = `
\`\`\`Balance: Get your current balance.
Use - @RewardsBot balance\`\`\`\n
`