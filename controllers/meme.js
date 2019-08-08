const https = require('https');

const router = {

    randomMeme: (msg) => {
        let key = msg.content.split(" ")[1];
        try {
            https.get(`https://meme-api.herokuapp.com/gimme${key ? `/` + key : ''}`, (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    try {
                        let objData = JSON.parse(data);
                        console.log(objData);
                        msg.channel.send({
                            embed: {
                                title: objData.title,
                                image: {
                                    url: objData.url
                                }
                            }
                        })
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
    },

    help: (msg) => {
        msg.channel.send('RANDOM MEMZ GENERATOR GUIDE: \n' +
            '!randomMeme ----> By default the API grabs a random\n' +
            ' meme from \'memes\', \'dankmemes\', \'meirl\', \n' +
            '\'pewdiepiesubmissions\' subreddits. \n' +
            '!randomMeme SUBREDDIT_NAME -----> return random meme from\n' +
            'passed subreddit\n ' +
            '!randomMeme help returns help guide')
    }

};

const getRandomMeme = (msg) => {
    let keys = msg.content.split(" ");
    if(keys[0]) {
        if (keys[1] === 'help') {
            router.help(msg)
        } else {
            router.randomMeme(msg)
        }
    }
};

module.exports = {

    routes: {
        '!randomMeme': msg => getRandomMeme(msg)
    },

    help: () => { return '!randomMeme ?SUBREDDIT: random meme generator\n'}

};
