const { Config } = require("docenv")
const WaletsDb = require("../../db/nedb/wallets");

module.exports.deposit = async (msg, dest, amount) => {
  amount = parseInt(amount)
  msg.channel.startTyping();
  await WaletsDb.deposit(dest, msg.guild, amount)
  msg.channel.stopTyping();
  msg.channel.send(`Se deposito $${amount} en la billetera de  ${dest}`);
}

module.exports.description = `
\`\`\`Deposit: Give money to user (only for admins).
Use - @${Config.BOT_NAME} deposit <@User> <amount>\`\`\`\n
`