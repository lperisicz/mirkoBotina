module.exports = {

    routes: {
        '!alo': msg => (require('./random.js')).alo(msg),

        '!mirkoJesiZiv': (msg) => msg.channel.send('Yaass!'),

        '!dajGaDajGa': (msg) => msg.channel.send("https://www.youtube.com/watch?v=uhQoWQwYljc"),

        '!mirkojebotekamelkejs': (msg) => msg.channel.send("Jebo ga ti aj upisi !help"),

        '!mirko': (msg) => msg.reply("Recite kolega"),

        '!sve': (msg) => msg.channel.send('aaaaaa')
    },

    help: () => {
        return '!mirkoJesiZiv: check if Mirko is online\n' +
        '!dajGaDajGa: special feature that returns special Mirko\'s song\n' +
        '!mirkojebotekamelkejs: The one and only MirkoLint rules \n' +
        '!mirko: Ofanzivno defanzivni odgovor od mirkeca\n' +
        '!sve: A jeeebiga ako je sve onda je sve\n'
    }

};
