const Discord = require("discord.js");

exports.run = async (client, message, args, database, prefix, data) => {
  let db1 = await database.ref(data(message.author).economia).once('value');
  let db1ref = database.ref(data(message.author).economia);

  let db2 = await database.ref(data(message.author).itens).once('value');
  let db2ref = database.ref(data(message.author).itens);
  if(db2.val() == null) return;

  if(db2.val().gasha == 0) return message.reply(`Você precisa de um **Gasha** para poder abri-lá.`);

  db2ref.update({gasha: db2.val().gasha - 1})

  let epicos = [`Espada Excalibur`, `Escudo do Dragão`, `Botas de Hermes`];
  let raros = [`Espada Rara`, `Escudo Raro`, `Botas de Velocidade Rara`];
  let comuns = [`Espada Comum`, `Escudo Comum`, `Bota de Velocidade`];
  let epico_random = Math.floor(Math.random() * epicos.length);
  let raro_random = Math.floor(Math.random() * raros.length);
  let comum_random = Math.floor(Math.random() * comuns.length);

  if(verify_percent(2)) {
    let item = epicos[epico_random];

    if(item == `Espada Excalibur`) {
      if(db2.val().sword3 == true) {
      db1ref.update({balance: db1.val().balance + 150})
      return message.reply(`Você já possui o Item ganho no gasha e trocamos por **150 Denares**`);
      }
      db2ref.update({sword3: true})
    } else if(item == `Escudo do Dragão`) {
      if(db2.val().shield3 == true) {
      db1ref.update({balance: db1.val().balance + 150})
      return message.reply(`Você já possui o Item ganho no gasha e trocamos por **150 Denares**`);
      }
      db2ref.update({shield3: true})
    } else if(item == `Botas de Hermes`) {
      if(db2.val().shoes3 == true) {
      db1ref.update({balance: db1.val().balance + 150})
      return message.reply(`Você já possui o Item ganho no gasha e trocamos por **150 Denares**`);
      }
      db2ref.update({shoes3: true})
    }
    let embed2 = new Discord.MessageEmbed()
   .setColor(`#e2b923`)
   .setTitle(`Gasha`)
   .setDescription(`Você abriu um **Gasha** e nela veio **${item}** para acrescentar atributos ao seu personagem.`)
   .setThumbnail(`https://imgur.com/M7uGU9q.png`)
   .setFooter(message.author.tag,message.author.displayAvatarURL())
   .setTimestamp()
  return message.channel.send(embed2);
  } else {
  if(verify_percent(5)) {
    let item = raros[raro_random];

    if(item == `Espada Rara`) {
      if(db2.val().sword2 == true) {
      db1ref.update({balance: db1.val().balance + 100})
      return message.reply(`Você já possui o Item ganho no gasha e trocamos por **100 Denares**`);
      }
      db2ref.update({sword2: true})
    } else if(item == `Escudo Raro`) {
      if(db2.val().shield2 == true) {
      db1ref.update({balance: db1.val().balance + 100})
      return message.reply(`Você já possui o Item ganho no gasha e trocamos por **100 Denares**`);
      }
      db2ref.update({shield2: true})
    } else if(item == `Bota de Velocidade Rara`) {
      if(db2.val().shoes2 == true) {
      db1ref.update({balance: db1.val().balance + 100})
      return message.reply(`Você já possui o Item ganho no gasha e trocamos por **100 Denares**`);
      }
      db2ref.update({shoes2: true})
    }
    let embed1 = new Discord.MessageEmbed()
   .setColor(`#e2b923`)
   .setTitle(`Gasha`)
   .setDescription(`Você abriu um **Gasha** e nela veio **${item}** para acrescentar atributos ao seu personagem.`)
   .setThumbnail(`https://imgur.com/M7uGU9q.png`)
   .setFooter(message.author.tag,message.author.displayAvatarURL())
   .setTimestamp()
  return message.channel.send(embed1);;
  } else {
      let item = comuns[comum_random];

  if(item == `Espada Comum`) {
    if(db2.val().sword1 == true) {
      db1ref.update({balance: db1.val().balance + 50})
      return message.reply(`Você já possui o Item ganho no gasha e trocamos por **50 Denares**`);
    }
    db2ref.update({sword1: true})
  } else if(item == `Escudo Comum`) {
    if(db2.val().shield1 == true) {
      db1ref.update({balance: db1.val().balance + 50})
      return message.reply(`Você já possui o Item ganho no gasha e trocamos por **50 Denares**`);
    }
    db2ref.update({shield1: true})
  } else if(item == `Bota de Velocidade`) {
    if(db2.val().shoes1 == true) {
      db1ref.update({balance: db1.val().balance + 50})
      return message.reply(`Você já possui o Item ganho no gasha e trocamos por **50 Denares**`);
    }
    db2ref.update({shoes1: true})
  }
  let embed = new Discord.MessageEmbed()
   .setColor(`#e2b923`)
   .setTitle(`Gasha`)
   .setDescription(`Você abriu um **Gasha** e nela veio **${item}** para acrescentar atributos ao seu personagem.`)
   .setThumbnail(`https://imgur.com/M7uGU9q.png`)
   .setFooter(message.author.tag,message.author.displayAvatarURL())
   .setTimestamp()
  return message.channel.send(embed);
  }
 }
}

function verify_percent(percent) {
  if(`${percent}`.length < 2) {
    percent = '0.0' + percent
  } else {
    percent = '0.' + percent
  }
  percent = parseFloat(percent);
  var random_boolean = Math.random() < percent;
  return random_boolean;
}