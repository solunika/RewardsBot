module.exports = async (msg, ...params) => {
  let isAdmin =  msg.member.hasPermission("ADMINISTRATOR");
  if(!isAdmin) msg.channel.send("No posee los permisos necesarios para realizar esta operacion")
  return isAdmin;
}