const Discord = require('discord.js');

exports.run = async (client, message, args, database, prefix, data) => {
  if(message.author.id != "355821495731355648" && message.author.id != "757965193681698817" && message.author.id != "400698555893022720") return message.channel.send(`> Comando liberado apenas para meus desenvolvedores!`);
  
  if(!args || args.length < 1) return message.channel.send('**Comando não encontrado!**');

  let sucesso = `<:reload:828705635142336512> **|** Comando recarregado com sucesso \`${prefix}${args[0]}\``;
  
  let falha = `> Não foi possível recarregar o comando \` ${prefix}${args[0]} \``;
  
  reload(args[0].toLowerCase());

 function reload(command) {
  return new Promise((resolve, reject) => {
    try {
      if(client.aliases.has(command)) {
        command = client.aliases.get(command)
        delete require.cache[require.resolve(`./${command}.js`)];
      } else {
        delete require.cache[require.resolve(`./${command}.js`)];
      }
      let cmd = require(`../commands/${command}.js`);
      client.aliases.forEach((com, alias) => {
        if(client.aliases.get(alias) === command) {
          client.aliases.delete(alias);
        }
      });
      if(cmd.conf == null) return message.channel.send(sucesso);
      if(cmd.conf.aliases == null) return message.channel.send(sucesso);
        
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, command);
      });
      message.channel.send(sucesso);
    } catch (e) {
      if(e.code !== "MODULE_NOT_FOUND") console.error(e);
      message.channel.send(falha);
    }
  })
 }
}