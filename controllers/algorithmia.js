const client = require("algorithmia").client('sim2jsCstf/qBpsI2Vei2wRbpo61');
const axios = require('axios');
const Jimp = require('jimp');
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
        .then(function (response) {
            console.log(response.get());
            swapFaceCanvases(response.get().images, msg)
        });
};

const swapFaceCanvases = async (images, msg) => {
    let detectedFaceOne = images[0].detected_faces[0];
    let detectedFaceTwo = images[1].detected_faces[0];

    let imgs = await Promise.all(
        [Jimp.read(images[0].url), Jimp.read(images[1].url)]
    );

    let newImage = await imgs[0].composite(
        await imgs[1].crop(
            detectedFaceTwo.left,
            detectedFaceTwo.top,
            detectedFaceTwo.right - detectedFaceTwo.left,
            detectedFaceTwo.bottom - detectedFaceTwo.top
        ).resize(detectedFaceOne.right - detectedFaceOne.left, detectedFaceOne.bottom - detectedFaceOne.top),
        detectedFaceOne.left,
        detectedFaceOne.top
    ).quality(80).resize(600, Jimp.AUTO).getBufferAsync(Jimp.MIME_PNG);

    await msg.channel.sendFile(newImage);
    console.log('Valja')

    // axios.get(images[0].url).then(
    //     response => {
    //         msg.channel.sendFile(response.data);
    //     }
    // )
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
            + '!emotion IMAGE_ATTACHMENT: Detect emotions from image\n'
            + '!swapFaces FIRST_IMAGE_URL SECOND_IMAGE_URL: Attach face from second image to face on first image\n';
    }
};
