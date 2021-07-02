const Discord = require("discord.js");

exports.run = async (client, message, args, database, prefix, data) => {
  let db = await database.ref(data(message.author).hero).once('value');
  let dbref = database.ref(data(message.author).hero);
  if(db.val() == null) return;

  dbref.update({life: 100})

  let embed = new Discord.MessageEmbed()
   .setColor(`#e1e8ed`)
   .setTitle(`Centro de Recuperação`)
   .setThumbnail(`https://imgur.com/T8Triwf.png`)
   .setDescription(`Bem-vindo(a) **${message.author.username}**, ao centro de recuperação, parece que foi meio grave seus ferimentos mas já damos conta disso, volte a suas batalhas agora que sua vida está cheia.`)
   .setFooter(message.author.tag,message.author.displayAvatarURL())
   .setTimestamp()
  message.channel.send(embed);
}