const { Config } = require("docenv")
const ShopDb = require("../../db/nedb/shop")

module.exports.shop = async (msg) => {
  msg.channel.startTyping();
  let products = await ShopDb.listProducts(msg.guild); // La busqueda es por regex porque puede aparecer como <@[id]> o [id]
  msg.channel.stopTyping();
  msg.channel.send(products ? products.map((p, i) => `${(i + 1)} - ${p.name} - $${p.amount} `).join("\n") : "Empty shop");
}

module.exports.description = `
\`\`\`shop: list all products available.
Use - @${Config.BOT_NAME} list\`\`\`\n
`