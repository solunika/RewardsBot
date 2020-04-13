const ShopDb = require("../../db/nedb/shop")

module.exports.sell = async (msg, ...params) => {
  msg.channel.startTyping();
  let product = await ShopDb.createProduct(msg.author.id, msg.guild, ...params); // La busqueda es por regex porque puede aparecer como <@[id]> o [id]
  msg.channel.stopTyping();
  msg.channel.send(product ? `product Created`: error);
}

module.exports.description = `
\`\`\`sell: create product to sell.
Use - @RewardsBot sell <productName> <productAmount> <productQuantity (optional)>\`\`\`\n
`