const { Config } = require("docenv")
const WaletsDb = require("../../db/nedb/wallets")
const TransactionsDb = require("../../db/nedb/transactions")


module.exports.transfer = async (msg, dest, amount) => {
  amount = parseInt(amount)
  msg.channel.startTyping();


  let wallet = await WaletsDb.transfer(msg.author.id, dest, msg.guild, amount)
  msg.channel.stopTyping();
  if (wallet) {
    await TransactionsDb.transfer(msg.guild, msg.author.id, dest, amount);
    msg.channel.send(`Se transfirio $${amount} a ${dest}`);
  }
  else msg.channel.send(`Saldo insuficiente`);
}

module.exports.description = `
\`\`\`Transfer: Give money from your wallet to user.
Use - @${Config.BOT_NAME} transfer <@User> <amount>\`\`\`\n
`