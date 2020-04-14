const { Config } = require("docenv")
const WaletsDb = require("../../db/nedb/wallets")

module.exports.balance = async (msg) => {
  msg.channel.startTyping();
  let wallet = await WaletsDb.findUserWallet(msg.author.id, msg.guild); // La busqueda es por regex porque puede aparecer como <@[id]> o [id]
  msg.channel.stopTyping();
  msg.channel.send(wallet ? `Su saldo es $${wallet.amount}` : "No tiene saldo disponible en su billetera");
}

module.exports.description = `
\`\`\`Balance: Get your current balance.
Use - @${Config.BOT_NAME} balance\`\`\`\n
`