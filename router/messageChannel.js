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
    (require('../controllers/algorithmia.js')).help,
    (require('../controllers/eval.js')).help,
    (require('../controllers/math.js')).help,
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
    ...(require('../controllers/algorithmia.js')).routes,
    ...(require('../controllers/eval.js')).routes,
    ...(require('../controllers/math.js')).routes,
    '!help': (msg) => {
        let message = '';
        helps.slice(0, helps.length / 2).forEach(
            help => message += help()
        );
        msg.channel.send(message);
        message = '';
        helps.slice(helps.length / 2, helps.length).forEach(
            help => message += help()
        );
        msg.channel.send(message);
        message = '';
    },
};

const deleteMsgKeys = [
    "!code",
    "!spongebob",
    '!swapFaces'
];

module.exports = {
    onMessageReceived: async (msg) => {
        let key = msg.content.split(" ");
        let action = router[key[0]];
        if (action) action(msg);
        if (deleteMsgKeys.includes(key[0])) await msg.delete(1000)

    }
};
