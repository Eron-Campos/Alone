const Discord = require("discord.js");

exports.run = async (client, message, args, database, prefix, data) => {
  let dado = Math.floor(Math.random() * 6) + 1;

  if(dado == 1) {
    let embed = new Discord.MessageEmbed()
     .setColor(`#fb4704`)
     .setTitle(`Dados/Rolls`)
     .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
     .setDescription(`Seu dado caiu em:`)
     .setImage(`https://imgur.com/nYQoTzv.png`)
    message.channel.send(embed);
  } else if(dado == 2) {
    let embed2 = new Discord.MessageEmbed()
     .setColor(`#fb4704`)
     .setTitle(`Dados/Rolls`)
     .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
     .setDescription(`Seu dado caiu em:`)
     .setImage(`https://imgur.com/Ykjm08t.png`)
    message.channel.send(embed2);
  } else if(dado == 3) {
    let embed3 = new Discord.MessageEmbed()
     .setColor(`#fb4704`)
     .setTitle(`Dados/Rolls`)
     .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
     .setDescription(`Seu dado caiu em:`)
     .setImage(`https://imgur.com/grTfavz.png`)
    message.channel.send(embed3);
  } else if(dado == 4) {
    let embed4 = new Discord.MessageEmbed()
     .setColor(`#fb4704`)
     .setTitle(`Dados/Rolls`)
     .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
     .setDescription(`Seu dado caiu em:`)
     .setImage(`https://imgur.com/os8LJHD.png`)
    message.channel.send(embed4);
  } else if(dado == 5) {
    let embed5 = new Discord.MessageEmbed()
     .setColor(`#fb4704`)
     .setTitle(`Dados/Rolls`)
     .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
     .setDescription(`Seu dado caiu em:`)
     .setImage(`https://imgur.com/pt7ZYFf.png`)
    message.channel.send(embed5);
  } else if(dado == 6) {
    let embed6 = new Discord.MessageEmbed()
     .setColor(`#fb4704`)
     .setTitle(`Dados/Rolls`)
     .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
     .setDescription(`Seu dado caiu em:`)
     .setImage(`https://imgur.com/6Gz4UtO.png`)
    message.channel.send(embed6);
  }
}

exports.conf = {
  aliases: ["dado", "rolar", "dados"]
}