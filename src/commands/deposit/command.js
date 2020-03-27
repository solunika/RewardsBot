const WaletsDb = require("../../db/wallets");

module.exports.deposit = async (msg, dest, amount) => {
  amount = parseInt(amount)
  msg.channel.startTyping();
  await WaletsDb.update({ user: dest }, { $inc: { amount } }, { upsert: true })
  msg.channel.stopTyping();
  msg.channel.send(`Se deposito $${amount} en la billetera de  ${dest}`);
}

module.exports.description = `
\`\`\`Deposit: Give money to user (only for admins).
Use - @RewardsBot deposit <@User> <amount>\`\`\`\n
`