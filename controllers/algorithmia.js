// const prettier = require("prettier");
const Algorithmia = require("algorithmia");

const languageList = [
    'Apache',
    'Bash',
    'coffeeScript',
];

const enhance = msg => {

    let input = {image: msg.content.replace("!betterImage ", ""), phone: 'sony'};
    console.log(input);
    Algorithmia.client("sim2jsCstf/qBpsI2Vei2wRbpo61")
        .algo("deeplearning/PhotoQualityEnhancement/0.1.3?timeout=300") // timeout is optional
        .pipe(input)
        .then(function (response) {
            console.log(response.get());
            msg.channel.send({
                    embed: {
                        title: msg.author.username,
                        description: response.get().enhanced_image
                    }
                }
            );
        });


};

module.exports = {

    routes: {
        '!betterImage': enhance
    },

    help: () => {
        return '!betterImage URL: Enhances the quality of a image\n';
    }
};
