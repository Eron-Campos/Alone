const Discord = require("discord.js");

exports.run = async (client, message, args, database, prefix, data) => {
  let db1 = await database.ref(data(message.author).economia).once('value');
  let db1ref = database.ref(data(message.author).economia);

  let db2 = await database.ref(data(message.author).itens).once('value');
  let db2ref = database.ref(data(message.author).itens);
  if(db1.val() == null || db2.val() == null) return;

  if(db1.val().balance < 5000) return message.reply(`Você precisa de **5000 Denares** para comprar um **Gasha**.`);
  db1ref.update({balance: db1.val().balance - 5000})
  db2ref.update({gasha: db2.val().gasha + 1})
  message.channel.send(`Você comprou um **Gasha**, execute o comando **a!abrir** para obter alguma recompensa.`);
}