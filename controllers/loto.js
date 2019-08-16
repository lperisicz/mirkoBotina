const axios = require('axios');
const getLotto = msg => {
    axios.get(`https://www.lottoland.com/api/drawings/euroJackpot`, {})
        .then((res) => {
            let numbers = '';
            numbers += res.data.last.numbers.join(", ");
            numbers += ' | ';
            numbers += res.data.last.euroNumbers.join(", ");
            msg.channel.send({
                embed: {
                    title: res.data.last.drawingDate,
                    description: numbers,
                    thumbnail: {
                        url: `https://cdn.imgbin.com/23/5/12/imgbin-eurojackpot-once-logo-progressive-jackpot-brand-others-TEucLQyXr0ZP8gJyXGxpTPEcu.jpg`
                    }
                }
            })
        })
        .catch((error) => {
            console.error(error);
            msg.channel.send(error.message)
        })
};

module.exports = {

    routes: {
        '!lotto': getLotto,
    },

    help: () => {
        return '!lotto Get last drawn Eurojackpot\n';
    }
};
