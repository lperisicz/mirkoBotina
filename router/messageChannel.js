const helps = [
    (require('../controllers/meme.js')).help,
    (require('../controllers/yes_no.js')).help,
    (require('../controllers/random.js')).help,
    (require('../controllers/ronSwanson.js')).help,
    (require('../controllers/skoro.js')).help,
    (require('../controllers/advice.js')).help,
    (require('../controllers/pirate.js')).help,
    (require('../controllers/idea.js')).help,
    (require('../controllers/weather.js')).help,
    (require('../controllers/code.js')).help,
    (require('../controllers/joke.js')).help,
    (require('../controllers/loto.js')).help,
    (require('../controllers/insult.js')).help,
];

const router = {
    ...(require('../controllers/random.js')).routes,
    ...(require('../controllers/yes_no.js')).routes,
    ...(require('../controllers/meme.js')).routes,
    ...(require('../controllers/ronSwanson.js')).routes,
    ...(require('../controllers/skoro.js')).routes,
    ...(require('../controllers/advice.js')).routes,
    ...(require('../controllers/pirate.js')).routes,
    ...(require('../controllers/idea.js')).routes,
    ...(require('../controllers/weather.js')).routes,
    ...(require('../controllers/code.js')).routes,
    ...(require('../controllers/joke.js')).routes,
    ...(require('../controllers/loto.js')).routes,
    ...(require('../controllers/insult.js')).routes,
    '!help': (msg) => {
        let message = '';
        helps.forEach(
            help => message += help()
        );
        msg.channel.send(message)
    },
};

const deleteMsgKeys = [
    "!code"
];

module.exports = {
    onMessageReceived: async (msg) => {
        if (!(msg.author.username === 'tomo24')) {
            let key = msg.content.split(" ");
            let action = router[key[0]];
            if (action) action(msg);
            if (deleteMsgKeys.includes(key[0])) await msg.delete(1000)
        } else {
            await msg.reply('Smoke dick, my dick hurts for your messages')
        }
    }
};
