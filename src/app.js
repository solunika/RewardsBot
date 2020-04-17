const { Config, default: loadEnv } = require("docenv")
loadEnv()
const Utils = require('./common/utils');
const Discord = require('discord.js');
const Commands = require('./commands');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  let params = msg.content
    .replace(/ +(?= )/g, '').trim() // Saca los espacios dobles
    .split(" ") // Divide los parametros de la operacion

  const mention = params.shift() // El primer parametro siempre es la mención

  if (!Utils.simplifyId(mention) === client.user.id || !mention.startsWith("<@")) return; // Cancela la ejecucion si no se menciona primero al Bot
  
  const operation = params.shift() // El primer parametro siempre es la operacion
  params.unshift(msg) // Agrego el mensaje a los parametros para que pueda interactuar en el chat
  if (typeof Commands[operation] === "function") await Commands[operation](...params)
  else console.error(`Operation [${operation} do not exist.`)
});
client.login(Config.BOT_TOKEN);