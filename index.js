const Discord = require('discord.js');
const client = new Discord.Client();
const channel = require('./router/messageChannel.js');
// const botToken = require('./config/mirkosSekrets.js').botToken;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  try {
    if (!msg.author.bot) {
      await channel.onMessageReceived(msg);
    }
  } catch (e) {
    // msg.channel.send("ERROR-> "+ msg.author + " procitajte upute za korištenje");
  }
});

client.login(process.env.BOT_TOKEN);
