const https = require('http');

const say = msg => {
    try {
        https.get(`http://ron-swanson-quotes.herokuapp.com/v2/quotes`, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                try {
                    let objData = JSON.parse(data);
                    console.log(objData);
                    msg.channel.send(objData[0])
                } catch (e) {
                    msg.channel.send('SERVER ERROR')
                }
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    } catch (e) {
        msg.channel.send('SERVER ERROR')
    }
};

module.exports = {

    routes: {
        '!ronQuote': msg => say(msg)
    },

    help: () => {
        return '***RON SWANSON***\n' +
        '`!ronQuote: Random Parks and Recreation\'s Ron show quote\n\n`';
    }

};
