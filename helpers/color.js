const Jimp = require('jimp');
const ColorThief = require('color-thief-jimp');

module.exports = {

    extractColor: async imageUrl => {
        try {
            let image = await Jimp.read(imageUrl);
            let colors = ColorThief.getColor(image);
            return (colors[0] << 16) + (colors[1] << 8) + (colors[2])
        } catch (e) {
            return 0;
        }
    }

};
