const glob = require("glob");
let commands = {};
let descriptions = [];

const files = glob.sync(__dirname + "/**/command.js", { ignore: "**/index.js" })
files.forEach(file => {
  let command = require(file)
  Object.assign(commands, command)

  descriptions.push((command.description || "").trim());
});

module.exports = commands;
const help = (msg) => msg.channel.send(descriptions.join("\n"));
module.exports.help = help
module.exports.undefined = help