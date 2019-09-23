const https = require('https');
const randomAdvice = (msg) => {
    try {
        https.get(`https://api.adviceslip.com/advice`, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                try {
                    let objData = JSON.parse(data);
                    console.log(objData);
                    msg.channel.send(objData.slip.advice)
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
        '!zrnceMudrosti': randomAdvice,
    },

    help: () => {
        return '***ADVICE***\n' +
        '`!zrnceMudrosti: random advice`\n\n';
    }
};
