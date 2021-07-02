const Discord = require("discord.js");

exports.run = async (client, message, args, database, prefix, data) => {
  let db = await database.ref(data(message.author).hero).once('value');
  let dbref = database.ref(data(message.author).hero);

  let db2 = await database.ref(data(message.author).itens).once('value');
  let db2ref = database.ref(data(message.author).itens);
  if(db.val() == null || db2.val() == null) return;

  let sword1 = db2.val().sword1 ? Math.floor(db.val().strength * 1.3) : db.val().strength;
  let sword2 = db2.val().sword2 ? Math.floor(db.val().strength * 1.5) : 0;
  let sword3 = db2.val().sword3 ? Math.floor(db.val().strength * 1.7) : 0;

  let shield1 = db2.val().shield1 ? Math.floor(db.val().defense * 1.3) : db.val().defense;
  let shield2 = db2.val().shield2 ? Math.floor(db.val().defense * 1.5) : 0;
  let shield3 = db2.val().shield3 ? Math.floor(db.val().defense * 1.8) : 0;

  let shoes1 = db2.val().shoes1 ? Math.floor(db.val().speed * 1.3) : db.val().speed;
  let shoes2 = db2.val().shoes2 ? Math.floor(db.val().speed * 1.5) : 0;
  let shoes3 = db2.val().shoes3 ? Math.floor(db.val().speed * 2) : 0;

  let sword = Math.floor(sword1 + sword2 + sword3);
  let shield = Math.floor(shield1 + shield2 + shield3);
  let shoes = Math.floor(shoes1 + shoes2 + shoes3);

  let embed = new Discord.MessageEmbed()
   .setColor(`BLUE`)
   .setTitle(`Seu Personagem`)
   .setDescription(`Nível: **${db.val().lvl}**\nPontos de Experiência: **${db.val().xp}/${db.val().lvl * 120}**\nVida: **${db.val().life}/100**\n\n**Valores Individuais**\n<:whiteball:854077220875665439> Força: **${sword}**\n<:whiteball:854077220875665439> Velocidade: **${shoes}**\n<:whiteball:854077220875665439> Defesa: **${shield}**`)
   .setThumbnail(message.author.displayAvatarURL())
   .setFooter(message.author.tag,message.author.displayAvatarURL())
   .setTimestamp()
  message.channel.send(embed);
}