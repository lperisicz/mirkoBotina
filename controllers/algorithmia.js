const client = require("algorithmia").client(process.env.ALGORITHMIA_KEY);
const axios = require('axios');
const enhancedDirectory = client.dir('data://.algo/deeplearning/PhotoQualityEnhancement/temp');
const colorizeDirectory = client.dir('data://.algo/deeplearning/ColorfulImageColorization/temp');

const enhance = msg => {
    let input = {image: msg.content.replace("!betterImage ", ""), phone: 'sony'};
    client
        .algo("deeplearning/PhotoQualityEnhancement/0.1.3?timeout=300") // timeout is optional
        .pipe(input)
        .then(function (response) {
                console.log(response.get());
                let fileName = response.get().enhanced_image.split('/');
                fileName = fileName[fileName.length - 1];
                enhancedDirectory.file(fileName).get(function (err, data) {
                    if (err) msg.channel.send('error');
                    else {
                        msg.channel.sendFile(data);
                    }
                });
            }
        );
};

const colorize = msg => {
    let input = {image: msg.content.replace("!colorize ", "")};
    client
        .algo("deeplearning/ColorfulImageColorization/1.1.13?timeout=300") // timeout is optional
        .pipe(input)
        .then(function (response) {
                console.log(response.get());
                let fileName = response.get().output.split('/');
                fileName = fileName[fileName.length - 1];
                colorizeDirectory.file(fileName).get(function (err, data) {
                    if (err) msg.channel.send('error');
                    else {
                        msg.channel.sendFile(data);
                    }
                });
            }
        );
};

const emotion = msg => {
    let input = {
        "image": msg.attachments.first().url,
        "numResults": 3
    };
    client
        .algo("deeplearning/EmotionRecognitionCNNMBP/1.0.1?timeout=300") // timeout is optional
        .pipe(input)
        .then(function (response) {
                if (response) {
                    let message = '';
                    response.get().results[0].emotions.forEach(
                        emotion => {
                            message += `${emotion.label} -> ${emotion.confidence}\n`
                        }
                    );
                    msg.channel.send(message)
                }
            }
        );
};

const swapFaces = msg => {
    let links = msg.content.replace('!swapFaces ', '').split(' ');
    let imageOne = links[0];
    let imageTwo = links[1];
    console.log(imageOne);
    console.log(imageTwo);

    let input = {images: [{url: imageOne}, {url: imageTwo}]};

    client.algo("dlib/FaceDetection/0.2.1?timeout=300") // timeout is optional
        .pipe(input)
        .then(function(response) {
            console.log(response.get());
            swapFaceCanvases(response.get().images, msg)
        });
};

const swapFaceCanvases = (images, msg) => {
    axios.get(images[0].url, {responseType: 'arrayBuffer'}).then(
        response => {
            msg.channel.sendFile(response.data);
        }
    )
};

module.exports = {

    routes: {
        '!betterImage': enhance,
        '!colorize': colorize,
        '!emotion': emotion,
        '!swapFaces': swapFaces,
    },

    help: () => {
        return '!betterImage URL: Enhances the quality of a image\n'
            + '!colorize URL: Colorize black and white image\n'
            + '!emotion IMAGE_ATTACHMENT: Detect emotions from image\n';
    }
};
