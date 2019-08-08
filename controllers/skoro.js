const facts = [
    'Još u osnovnoj školi nizao je peticu za peticom. ',
    'Prvu ljubavnu poruku sam dobio u 1. B., a u njoj je pisalo \'Škoro, ja te volim\', s tim da je najvažnije to da me nazvala Škoro. To ja nisam odmah shvaćao, ali cijeli sam se svoj život razvijao u tom smjeru. Bez obzira na to što radio, uvijek bi na kraju ispalo da sam se spremao za to da postanem Škoro. Po zanimanju sam Škoro i ta mi je cura to odredila\'\', ',
    'Tako je stigao i do daleke Amerike, gdje je upoznao ljubav svoga života, odvjetnicu Kim. Sa simpatičnom Amerikankom hrvatskih korijena, s kojom je u braku tri desetljeća, Škoro se vjenčao tri puta. Dva puta u Americi i jednom u Hrvatskoj.',
    'Glazbenik, uvijek raspoložen za šalu, ponosni je otac dvoje djece.',
    'Prvo je otpjevao stihove "Ja ću se vratiti", a potom je to i učinio. Svoje istinsko domoljublje utkao je u svoje brojne stihove koji su u najtežim danima budili nacionalni ponos.',
    'Šta meni vrijedi što sam ja bio u Saboru, statirao u kukuruzu osam mjeseci. Vidio sam da ne ide, mankuo sam se iz toga!',
    'A srž mog programa je savez s narodom nasuprot vladavini stranačkih elita i kompromisa sklopljenih daleko od očiju javnosti i volje biračkog rijela. Želim biti narodni predsjednik i samo ću vama polagati račun!',
];

const say = (msg) => {
    let index = Math.floor(Math.random() * facts.length);
    let text = facts[index];
    msg.reply(text)
};

const about = msg => {//TODO
    msg.channel.send('Miroslav od kuće Škoro, nositelj tamburice, čuvar ravnice, sudac dušmanima, ljubitelj tla Hrvatskoga, prognonitelj nevjernika i zaštitnik svetinje.\n' +
        'https://preview.redd.it/1ubmzkialse31.jpg?width=960&crop=smart&auto=webp&s=d46d1b008195e18f042d7f000cd92807f45ba8de')
};

module.exports = {

    routes: {
        '!skoro': about,

        '!skoroFact': say,
    },

    help: () => {
        return '!skoro: The one and only prezident \n' +
            '!skoroFact: Otkad je objavio svoju kandidaturu za predsjednika Republike Hrvatske, zanimanje o svim detaljima bogate biografije Miroslava Škore ne jenjava.t \n';
    }

};
