const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  let conta = Math.floor(Math.random() *  2) + 1;

 if(conta == 2) {
   message.channel.send(`Você ganhou!`);
 } else {
   message.channel.send(`Você perdeu!`);
 }
  /*let embed = new Discord.MessageEmbed()
   .setDescription(`Pão`)
   .setTitle(`Teste`)
   .setAuthor(message.author.tag)
 message.channel.send(embed);*/
}