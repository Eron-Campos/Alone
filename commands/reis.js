const Discord = require("discord.js");
const disbut = require('discord-buttons');

exports.run = async (client, message, args, database, prefix, data) => {
 let button = new disbut.MessageButton()
 .setStyle('red')
 .setLabel('Dona Maria?') 
 .setID('1')
 let m = await message.channel.send(`Dona Maria?`, button);
 let collector = m.createButtonCollector((button) => button.clicker.user.id === message.author.id, { time: 5000 });

 collector.on('collect', async (b) => {
   if(b.id === `1`) return m.edit(`QUE DOR QUE EU SINTO`, null)
   await b.defer();
  })
}