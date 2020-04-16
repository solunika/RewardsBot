const { Config } = require("docenv")
const WaletsDb = require("../../db/nedb/wallets");
const TransactionsDb = require("../../db/nedb/transactions");

module.exports.deposit = async (msg, dest, amount) => {
  amount = parseInt(amount)
  msg.channel.startTyping();
  await WaletsDb.deposit(dest, msg.guild, amount)
  await TransactionsDb.deposit(msg.guild, msg.author.id, dest, amount);
  msg.channel.stopTyping();
  msg.channel.send(`Se deposito $${amount} en la billetera de  ${dest}`);
}

module.exports.description = `
\`\`\`Deposit: Give money to user (only for admins).
Use - @${Config.BOT_NAME} deposit <@User> <amount>\`\`\`\n
`