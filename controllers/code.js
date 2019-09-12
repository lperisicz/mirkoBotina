const prettier = require("prettier");
const Algorithmia = require("algorithmia");

const languageList = [
    'Apache',
    'Bash',
    'coffeeScript',
];

const formatMessage = msg => {

    let input = prettier.format(msg.content.replace("!code ", ""), {parser: 'babel'}) || msg.content.replace("!code ", "");
    console.log(input);
    Algorithmia.client(process.env.ALGORITHMIA_KEY)
        .algo("PetiteProgrammer/ProgrammingLanguageIdentification/0.1.3?timeout=300") // timeout is optional
        .pipe(input)
        .then(function (response) {
            console.log(response.get());
            try {
                msg.channel.send({
                        embed: {
                            title: msg.author.username,
                            description: "```" + `${response.get()[0][0]}\n` + input + "```"
                        }
                    }
                );
            } catch (e) {
                msg.channel.send({
                        embed: {
                            title: msg.author.username,
                            description: "```" + `java\n` + input + "```"
                        }
                    }
                );
            }
        }).catch(e => {
        msg.channel.send({
                embed: {
                    title: msg.author.username,
                    description: "```" + `java\n` + input + "```"
                }
            }
        );
    });


};

module.exports = {

    routes: {
        '!code': formatMessage
    },

    help: () => {
        return '!code CODE: formats passed code\n';
    }
};
