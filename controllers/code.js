const formatMessage = msg => {

    var Algorithmia = require("algorithmia");

    var input = msg.content.replace("!code ", "");
    Algorithmia.client("sim2jsCstf/qBpsI2Vei2wRbpo61")
        .algo("PetiteProgrammer/ProgrammingLanguageIdentification/0.1.3?timeout=300") // timeout is optional
        .pipe(input)
        .then(function(response) {
            console.log(response.get());
            msg.channel.send({
                    embed: {
                        title: msg.author.username,
                        description: response.get().toString()
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
