const apiKey = require('../config/mirkosSekrets.js').weatherApiKey;
const axios = require('axios');
const getWeather = msg => {
    let city = msg.content.replace("!weatherNow ", "");
    axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
        params: {
            q: city,
            appid: apiKey,
            units: 'metric'
        }
    })
        .then((res) => {
            msg.channel.send({
                embed: {
                    title: res.data.name,
                    description: "```java\n" +
                        `CURRENT: ${res.data.main.temp}\n` +
                        `MIN/MAX: ${res.data.main.temp_min} / ${res.data.main.temp_max}\n` +
                        `HUMIDITY: ${res.data.main.humidity}` +
                        "\n```",
                    thumbnail: {
                        // text: '',
                        url: `\nhttp://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png\n`
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
        '!weatherNow': getWeather,
    },

    help: () => {
        return '!weatherNow CITY: formats passed code\n';
    }
};
