module.exports = {

    routes: {
        '!alo': msg => msg.reply('metnem ti ga malo!'),

        '!mirkoJesiZiv': (msg) => msg.channel.send('Yaass!'),

        '!dajGaDajGa': (msg) => msg.channel.send("https://www.youtube.com/watch?v=uhQoWQwYljc"),

        '!mirkojebotekamelkejs': (msg) => msg.channel.send("Jebo ga ti aj upisi !help"),

        '!mirkoJeboteKemlKejs': (msg) => msg.channel.send("Jebo ga ti aj upisi !help"),

        '!mirko': (msg) => msg.reply("Fuckception"),

        '!dajSeOdluciViseJeboGaJa': (msg) => msg.reply("A tu sam kolega jebo ga lebac"),

        '!sve': (msg) => msg.channel.send('aaaaaa')
    },

    help: () => {
        return '***RANDOM ACTIONS***\n' +
        '`!mirkoJesiZiv: check if Mirko is online\n' +
        '!dajGaDajGa: special feature that returns special Mirko\'s song\n' +
        '!mirkojebotekamelkejs: The one and only MirkoLint rules \n' +
        '!mirko: Ofanzivno defanzivni odgovor od mirkeca\n' +
        '!dajSeOdluciViseJeboGaJa: Ofanzivno defanzivni odgovor od mirkeca broj dva\n' +
        '!sve: A jeeebiga ako je sve onda je sve`\n\n'
    }

};
