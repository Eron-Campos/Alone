const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const ejs = require('ejs');

module.exports = async (client) => {
  app.set('view engine', 'ejs');
  app.set('views', __dirname+ '/Page');
  app.use(express.static(__dirname + '/public'));
  
  app.get('/', async (req, res) => {
    const infos = {
      username: client.user.username,
      status: client.user.presence.status,
      users: client.users.cache.size,
      guilds: client.guilds.cache.size,
      avatarURL: client.user.avatarURL()
    }
    res.render('index', {
      page: 'dashboard',
      client: client
    });
  })

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Dashboard rodando na porta ${PORT}`);
  })
}