const Discord = require("discord.js");

exports.run = async (client, message, args, database, prefix, data) => {
  let db1 = await database.ref(data(message.author).economia).once('value');
  let db1ref = database.ref(data(message.author).economia);
  if(db1.val() == null) return;

  let embed = new Discord.MessageEmbed()
   .setColor(`GREEN`)
   .setTitle(`Barganha`)
   .setThumbnail(`https://imgur.com/azZ6gN0.png`)
   .setDescription(`Você possui **${db1.val().balance} Denares** em sua barganha`)
   .setFooter(message.author.tag,message.author.displayAvatarURL())
   .setTimestamp()
  message.channel.send(embed);
}