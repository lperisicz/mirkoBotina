const https = require('https');
const axios = require('axios');
let after = '';
let afters = {};
let limit = 50;

const router = {
    randomMeme: msg => {
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

    help: msg => {
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
    if (keys[0]) {
        if (keys[1] === 'help') {
            router.help(msg)
        } else {
            router.randomMeme(msg)
        }
    }
};

const getRandomGif = msg => {
    let keys = msg.content.split(" ");
    let subreddit = keys[1] ? keys[1] : 'gif';
    limit = keys[2] ? keys[2] : limit;
    if (keys[3]) {
        after = '';
    } else {
        if (!afters[subreddit]) {
            after = '';
        } else {
            after = afters[subreddit]
        }
    }
    let found = false;
    axios.get(`https://www.reddit.com/r/${subreddit}.json`, {
        params: {
            limit: limit,
            after: after
        }
    }).then((res) => {
            console.log(res);
            res.data.data.children.forEach(
                post => {
                    if (!found) {
                        if (post.data.preview) {
                            if (post.data.preview.images[0]) {
                                if (post.data.preview.images[0]) {
                                    if (post.data.preview.images[0].variants) {
                                        if (post.data.preview.images[0].variants.gif) {
                                            found = true;
                                            msg.channel.send({
                                                embed: {
                                                    title: post.data.title,
                                                    image: {
                                                        url: post.data.preview.images[0].variants.gif.source.url
                                                    }
                                                }
                                            });
                                            after = res.data.data.children[res.data.data.children.length - 1].data.name;
                                            afters[subreddit] = after;
                                            console.log(afters)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            );
            if (!found) {
                msg.channel.send('There is no gif')
            }
        }
    ).catch((error) => {
        console.error(error);
        msg.channel.send(error.message)
    });
};

module.exports = {

    routes: {
        '!randomMeme': msg => getRandomMeme(msg),
        '!randomGif': msg => getRandomGif(msg)
    },

    help: () => {
        return '!randomMeme ?SUBREDDIT: random meme generator\n' +
        '!randomGif ?SUBREDDIT ?LIMIT ?restart: random gif generator\n'
    }

};
