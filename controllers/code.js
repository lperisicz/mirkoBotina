const languageList = [
    'Apache',
    'Bash',
    'coffeeScript',
];
const prettier = require("prettier");

const formatMessage = msg => {

    var Algorithmia = require("algorithmia");

    var input = prettier.format(msg.content.replace("!code ", ""));
    Algorithmia.client("sim2jsCstf/qBpsI2Vei2wRbpo61")
        .algo("PetiteProgrammer/ProgrammingLanguageIdentification/0.1.3?timeout=300") // timeout is optional
        .pipe(input)
        .then(function(response) {
            console.log(response.get());

            //.toString()

            msg.channel.send({
                    embed: {
                        title: msg.author.username,
                        description: "```" + `${response.get()[0][0]}\n` + input + "```"
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
