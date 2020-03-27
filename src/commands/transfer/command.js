const WaletsDb = require("../../db/wallets")


module.exports.transfer = async (msg, dest, amount) => {
  amount = parseInt(amount)
  msg.channel.startTyping();
  let wallet = await WaletsDb.findOne({ user: new RegExp(msg.author.id), amount: { $gt: amount } });
  if (wallet) {

    await WaletsDb.update({ user: new RegExp(msg.author.id) }, { $inc: { amount: amount * -1 } }, { upsert: true });
    await WaletsDb.update({ user: dest }, { $inc: { amount } }, { upsert: true });
    msg.channel.stopTyping();
    msg.channel.send(`Se transfirio $${amount} a ${dest}`);
  } else {
    msg.channel.stopTyping();
    msg.channel.send(`Saldo insuficiente`);
  }
}

module.exports.description = `
\`\`\`Transfer: Give money from your wallet to user.
Use - @RewardsBot transfer <@User> <amount>\`\`\`\n
`