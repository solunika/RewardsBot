module.exports = async (msg, ...params) => {    
    let valid = true;
    if(!(msg.hasOwnProperty("guild"))) {
        msg.channel.send("No encuentro el ID de la sala, intenta dar este comando en un canal")
        valid = false;
    }

    return valid;
  }