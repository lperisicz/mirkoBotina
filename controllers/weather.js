const axios = require('axios');
const getWeather = msg => {
    let city = msg.content.replace("!weatherNow ", "");
    axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
        params: {
            q: city,
            appid: process.env.WEATHER_API_KEY,
            units: 'metric'
        }
    })
        .then(async (res) => {
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
                        url: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
                    },
                    color: await require('../helpers/color').extractColor(`http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`)
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
        return '***WEATHER***\n' +
        '`!weatherNow CITY: formats passed code`\n\n';
    }
};
