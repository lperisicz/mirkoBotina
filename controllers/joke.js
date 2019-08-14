const https = require('http');
const axios = require('axios');

const tellJoke = (msg) => {
    https.get('http://api.icndb.com/jokes/random', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            let objData = JSON.parse(data);
            console.log(objData);
            msg.channel.send(objData.value.joke)
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
};

const tellDadJoke = msg => {
    axios.get(`https://icanhazdadjoke.com/`, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then((res) => {
            msg.channel.send(res.data);
            console.log(res.data);
        })
        .catch((error) => {
            console.error(error);
            msg.channel.send(error.message)
        })
};

module.exports = {

    routes: {
        '!chuckJoke': msg => tellJoke(msg),
        '!dadJoke': tellDadJoke
    },

    help: () => {
        return '\n!chuckJoke: random Chuck Norris Joke\n' +
            '!dadJoke: random Dad Joke\n';
    }

};
