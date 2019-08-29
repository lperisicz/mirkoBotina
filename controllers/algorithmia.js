// const prettier = require("prettier");
const Algorithmia = require("algorithmia");

const directory = Algorithmia.client().dir('data://.algo/deeplearning/PhotoQualityEnhancement/temp');

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
            let fileName = response.get().enhanced_image.split('/');
            fileName = fileName[fileName.length - 1];
            console.log(fileName);
            directory.file(fileName).get(function(err, data) {
                // on success, data will be string or Buffer
                console.log(err);
                console.log(data);
            });
            // msg.channel.send({
            //         embed: {
            //             title: msg.author.username,
            //             description: response.get().enhanced_image
            //         }
            //     }
            // );
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
