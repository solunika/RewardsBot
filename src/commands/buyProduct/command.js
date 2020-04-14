const { Config } = require("docenv")
const ShopDb = require("../../db/nedb/shop")
const UserDb = require("../../db/nedb/wallets")
const TransactionsDb = require("../../db/nedb/transactions")

module.exports.buy = async (msg, index) => {
  msg.channel.startTyping();
  let product = await ShopDb.getProduct(msg.guild, index - 1),
    transfer;
  if (product) transfer = await UserDb.transfer(msg.author.id, product.owner, msg.guild, parseFloat(product.amount));
  msg.channel.stopTyping();
  if (transfer) {
    await ShopDb.buyProduct(msg.guild, index - 1);
    await TransactionsDb.buyProduct(msg.guild, msg.author.id, product);
    msg.channel.send(`Product selled: ${product.name}`);
  } else msg.channel.send("Can't buy this product");
}

module.exports.description = `
\`\`\`buy: buy product available.
Use - @${Config.BOT_NAME} buy <productIndex>\`\`\`\n
`