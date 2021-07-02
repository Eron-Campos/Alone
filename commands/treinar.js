const Discord = require("discord.js");
const ms = require('parse-ms');

exports.run = async (client, message, args, database, prefix, data) => {
  let db = await database.ref(data(message.author).hero).once('value');
  let dbref = database.ref(data(message.author).hero);

  let db1 = await database.ref(data(message.author).economia).once('value');
  let db1ref = database.ref(data(message.author).economia);

  let db2 = await database.ref(data(message.author).itens).once('value');
  let db2ref = database.ref(data(message.author).itens);
  if(db.val() == null || db2.val() == null || db1.val() == null) return;

  if(db.val().life < 10) return message.reply(`**Sua vida está muito baixa para fazer algum combate, você precisa se recuperar no comando ${prefix}recover**`);

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

  if(!args[0] || args[0].toLowerCase() == '1') {
    if(db.val().lvl * 120 <= db.val().xp) {
      dbref.update({lvl: db.val().lvl + 1, xp: 0, strength: db.val().strength + 3, defense: db.val().defense + 2, speed: db.val().speed + 1})
      return message.reply(`Seu personagem Upou para o **Level ${db.val().lvl + 1}**, e recebeu atributos:\n\nForça: **+3**\nVelocidade: **+1**\nDefesa: **+2**`);
    }
    //let gain = Math.floor(Math.random() * (5 - 1)) + 1;
    //let heroStats = db.val().hero1;
    let gain = Math.floor(Math.random() * (10 - 5)) + 5;
    let dano = Math.floor(Math.random() * (5 - 2)) + 2;
    let coin = Math.floor(gain * 4);
    //heroStats.xp+=gain;
    dbref.update({xp: db.val().xp + gain, life: db.val().life - dano})
    db1ref.update({balance: db1.val().balance + coin})
    let shadow = new Discord.MessageEmbed()
     .setColor(`PURPLE`)
     .setTitle(`Campo de Treinamento I`)
     .setDescription(`Você treinou com **Shina ** em sua forma base, logo abaixo você pode ver o resultado do treinamento.\n\n**<:whiteball:854077220875665439> + ${coin} Denares\n<:whiteball:854077220875665439> + ${gain}XP\n<:whiteball:854077220875665439> - ${dano} Dano Recebido**`)
     .setFooter(message.author.tag,message.author.displayAvatarURL())
     .setTimestamp()
     .setThumbnail(`https://imgur.com/PzEzAdA.png`)
    message.channel.send(shadow);
  } else if(args[0].toLowerCase() == '2') {
    if(sword < 17) return message.reply(`Você precisa estar no **Level 5** ou ter **17 de Força** para desbloquear a segunda área de treinamento`);
    if(db.val().lvl * 120 <= db.val().xp) {
      dbref.update({lvl: db.val().lvl + 1, xp: 0, strength: db.val().strength + 3, defense: db.val().defense + 2, speed: db.val().speed + 1})
      return message.reply(`Seu personagem Upou para o **Level ${db.val().lvl + 1}**, e recebeu atributos:\n\nForça: **+3**\nVelocidade: **+1**\nDefesa: **+2**`);
    }
    let gain = Math.floor(Math.random() * (10 - 5)) + 5;
    let coin = Math.floor(gain * 2);
    dbref.update({xp: db.val().xp + gain})
    db1ref.update({balance: db1.val().balance + coin})
    let venom = new Discord.MessageEmbed()
     .setColor(`PURPLE`)
     .setTitle(`Campo de Treinamento II`)
     .setDescription(`Você treinou com **Shina** em sua forma de ataque controlada\n\nRecompensa: **${gain} XP + ${coin} Denares**`)
     .setTimestamp()
     .setFooter(message.author.tag,message.author.displayAvatarURL())
     .setThumbnail(`https://imgur.com/r30KxqT.png`)
    message.channel.send(venom);
  } else if(args[0].toLowerCase() == '3') {
    if(shoes < 16) return message.reply(`Você precisa estar no **Level 10** ou ter **17 de Velocidade/ 17 de Defesa** para desbloquear a terceira área de treinamento.`);
    if(db.val().lvl * 120 <= db.val().xp) {
      dbref.update({lvl: db.val().lvl + 1, xp: 0, strength: db.val().strength + 3, defense: db.val().defense + 2, speed: db.val().speed + 1})
      return message.reply(`Seu personagem Upou para o **Level ${db.val().lvl + 1}**, e recebeu atributos:\n\nForça: **+3**\nVelocidade: **+1**\nDefesa: **+2**`);
    }
    let gain = Math.floor(Math.random() * (20 - 10)) + 10;
    let coin = Math.floor(gain * 2);
    dbref.update({xp: db.val().xp + gain})
    db1ref.update({balance: db1.val().balance + coin})
    let venom = new Discord.MessageEmbed()
     .setColor(`PURPLE`)
     .setTitle(`Campo de Treinamento III`)
     .setDescription(`Você treinou com **Shina** com todas suas habilidades e técnicas de luta\n\nRecompensa: **${gain} XP + ${coin} Denares**`)
     .setTimestamp()
     .setFooter(message.author.tag,message.author.displayAvatarURL())
     .setThumbnail(`https://imgur.com/dUd6xUq.png`)
    message.channel.send(venom);
  } else if(args[0].toLowerCase() == "boss") {
    if(sword < 131) return message.reply(`Você precisa estar no **Level 15** ou ter **131 de Força** para desbloquear o chefe do campo de treinamento.`);
    if(db.val().delaytreino !== null && 86400000 - (Date.now() - db.val().delaytreino) > 0) {
     let time = ms(86400000 - (Date.now() - db.val().delaytreino));
      return message.reply(`Aguarde: ${time.hours}h ${time.minutes}m e ${time.seconds}s`);
    }
    if(db.val().lvl * 120 <= db.val().xp) {
      dbref.update({lvl: db.val().lvl + 1, xp: 0, strength: db.val().strength + 3, defense: db.val().defense + 2, speed: db.val().speed + 1})
      return message.reply(`Seu personagem Upou para o **Level ${db.val().lvl + 1}**, e recebeu atributos:\n\nForça: **+3**\nVelocidade: **+1**\nDefesa: **+2**`);
    }
    let gain = Math.floor(Math.random() * (100 - 50)) + 50;
    let coin = Math.floor(gain * 2);
    dbref.update({xp: db.val().xp + gain, delaytreino: Date.now()})
    db1ref.update({balance: db1.val().balance + coin})
    let venom = new Discord.MessageEmbed()
     .setColor(`PURPLE`)
     .setTitle(`Shina de Cobra`)
     .setDescription(`Você derrotou a **Shina** em sua forma de poder total\n\nRecompensa: **${gain} XP + ${coin} Denares**`)
     .setTimestamp()
     .setFooter(message.author.tag,message.author.displayAvatarURL())
     .setThumbnail(`https://imgur.com/kLDkBye.png`)
    message.channel.send(venom);
  } else {
    return;
  }
}