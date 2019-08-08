const https = require('https');
const say = (msg) => {
    //Hello my friend don't go here
    try {
        https.get(`https://api.funtranslations.com/translate/pirate.json?text=${msg.content.replace("!pirate ", "")}`, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                let objData = JSON.parse(data);
                try {
                    console.log(objData);
                    msg.channel.send(objData.contents.translated)
                } catch (e) {
                    msg.channel.send(objData.error.message)
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
        '!pirate': say
    },

    help: () => {
        return '!pirate MSG: Returns pirated msg\n';
    }

};
