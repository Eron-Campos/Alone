const Discord = require("discord.js");
const client = new Discord.Client();
const disbut = require('discord-buttons')(client);
const config = require("./config.json");
const firebase = require("firebase");
const fs = require('fs');
const reqEvent = (event) => require(`./Events/${event}.js`);
const cooldown = new Set();

client.bj_play = new Discord.Collection();
client.rankg = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`Carregando um total de ${files.length} comandos..`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);

    if (props.conf == null) return;
    if (props.conf.aliases == null) return;

    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, `${f}`.replace('.js', ''));
    })
  })
});

// Configuração da Firebase
var firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};

// Inicialização do Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

client.on('ready', () => reqEvent('ready-web')(client, database));

client.on("ready", () => {
  let activities = [
    `${config.prefix}help para obter ajuda`,
    `${client.guilds.cache.size} servidores!`,
    `Meu Criador Eron#5773`
  ]
  let i = 0;
  setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {
    type: "PLAYING"
  }), 1000 * 60);
  client.user
    .setStatus("online")
    .catch(console.error);
  console.log("Alone Ligado!")
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  if (message.channel.type == 'dm') return;

  let dbref = database.ref(`Servidores/${message.guild.id}`);
  let db = await database.ref(`Servidores/${message.guild.id}`).once('value');

  let prefix = config.prefix;

  if(!db.val()) {
    dbref.set({ prefix: config.prefix, chatid: 0 })
  } else {
    prefix = db.val().prefix;
  }

  prefix = prefix.toLowerCase();

  if(!message.content.toLowerCase().startsWith(prefix)) return;

  reqEvent('registro')(client, message.author, database);

  if(cooldown.has(message.author.id)) return message.reply(`Você tem que esperar 2 segundos para usar outro comando.`);
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  let data = function(user) {
    user = user.id ? user.id : user;
    return {
      hero: `Hero/${user}`, economia: `Economia/${user}`, itens: `Itens/${user}`
    }
  }

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, 2000)

  if(client.aliases.has(command)) {
    exec(client.aliases.get(command))
  } else {
    exec(command)
  }

  async function exec(command) {
    try {
      if(!config.donos.includes(message.author.id)) {
      cooldown.add(message.author.id)
      }
      const commandFile = require(`./commands/${command}.js`);
      commandFile.run(client, message, args, database, prefix, data);
    } catch (err) {
      if (err.code === "MODULE_NOT_FOUND") return;
      message.channel.send(`Um erro aconteceu ao executar este comando! \`  ${err.code}  \``);
    }
  }
});

client.login(process.env.TOKEN);