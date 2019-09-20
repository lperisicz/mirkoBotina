const Discord = require('discord.js');
const client = new Discord.Client();
const channel = require('./router/messageChannel.js');
require('dotenv').config();
const database = require('./database/setup.js');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  database.setup();
});

client.on('message', async msg => {
  try {
    if (!msg.author.bot || !msg.author.username.includes('vecika')) {
      await channel.onMessageReceived(msg);
    }
  } catch (e) {
    // msg.channel.send("ERROR-> "+ msg.author + " procitajte upute za korištenje");
  }
});

client.login(process.env.BOT_TOKEN);
