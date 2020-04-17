const glob = require("glob");
let commands = {};
let descriptions = [];

const files = glob.sync(__dirname + "/**/command.js", { ignore: "**/index.js" })
files.forEach((file, ) => {
  let validator = require(file.replace("command.js", "validator.js"))
  let command = require(file), commandName = Object.keys(command)[0]
  Object.assign(commands, { [commandName]: async (...params) => { if (await validator(...params)) return command[commandName](...params) } })

  descriptions.push((command.description || "").trim());
});

module.exports = commands;
const help = (msg) => msg.channel.send(descriptions.join("\n"));
module.exports.help = help
module.exports.undefined = help