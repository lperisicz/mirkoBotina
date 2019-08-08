const https = require('http');

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

module.exports = {

    routes: {
        '!chuckJoke': msg => tellJoke(msg),
    },

    help: () => {
        return '\n!chuckJoke: random Chuck Norris Joke\n';
    }

};
