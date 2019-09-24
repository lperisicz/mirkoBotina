const https = require('https');
const axios = require('axios');
const subredditStats = (require('../database/reddit.js')).getSubredditStats;
const memeBois = (require('../database/reddit.js')).memster;
const insertSubreddit = (require('../database/reddit.js')).insertSubreddit;
const insertGif = (require('../database/tenor.js')).insertGif;
const gifStats = (require('../database/tenor.js')).gifStats;
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
                resp.on('end', async () => {
                    try {
                        let objData = JSON.parse(data);
                        console.log(objData);

                        msg.channel.send({
                            embed: {
                                title: objData.title,
                                image: {
                                    url: objData.url
                                },
                                color: await require('../helpers/color').extractColor(objData.url)
                            }
                        });
                        await insertSubreddit(msg, objData.url);
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
                async post => {
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
                                                    },
                                                    color: await require('../helpers/color').extractColor(post.data.preview.images[0].variants.gif.source.url)
                                                }
                                            });
                                            await insertGif(msg, post.data.preview.images[0].variants.gif.source.url);
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

const gif = msg => {
    //https://api.tenor.com/v1/registershare?id=8776030&key=LIVDSRZULELA&q=excited
    let key = msg.content.replace('!gif ', '');
    axios.get(`https://api.tenor.com/v1/search`, {
        params: {
            limit: 50,
            q: key,
            key: process.env.TENOR
        }
    }).then(async (res) => {
            console.log(res);
            if (res.data && res.data.results) {
                let url = res.data.results[Math.floor(Math.random() * res.data.results.length)].media[0].gif.url;
                msg.channel.send({
                    embed: {
                        image: {
                            url: url
                        },
                        color: await require('../helpers/color').extractColor(url)
                    }
                });
                await insertGif(msg, url);
            }
        }
    ).catch((error) => {
        console.error(error);
        msg.channel.send(error.message)
    });
};

const spongebob = msg => {
    function setCharAt(str,index,chr) {
        if(index > str.length-1) return str;
        return str.substr(0,index) + chr + str.substr(index+1);
    }
    //https://api.imgflip.com/caption_image?template_id=102156234&text0=Sample text&username=CorhenoBofano&password=_uCGn8n3qX9Mgte
    let key = msg.content.replace('!spongebob ', '');
    for (let i = 0; i < key.length; i++) {
        key = setCharAt(key,i, (Math.floor(Math.random() * 2) > 0) ? key.charAt(i).toUpperCase() : key.charAt(i).toLowerCase())
    }
    axios.post(`https://api.imgflip.com/caption_image`, {},{
        params: {
            template_id: 102156234,
            username: 'CorhenoBofano',
            password: '_uCGn8n3qX9Mgte',
            'boxes[0][text]': key,
            'boxes[0][force_caps]': false,
        }
    }).then(async (res) => {
            console.log(res);
            if (res.data && res.data.data) {
                let url = encodeURI(res.data.data.url);
                msg.channel.send({
                    embed: {
                        title: msg.author.username,
                        image: {
                            url: url
                        },
                        color: await require('../helpers/color').extractColor(url)
                    }
                });
                await insertGif(msg, url);
            }
        }
    ).catch((error) => {
        console.error(error);
        msg.channel.send(error.message)
    });
};

const smart = msg => {
    //https://api.imgflip.com/caption_image?template_id=102156234&text0=Sample text&username=CorhenoBofano&password=_uCGn8n3qX9Mgte
    let key = msg.content.replace('!smart ', '');
    axios.post(`https://api.imgflip.com/caption_image`, {},{
        params: {
            template_id: 89370399,
            username: 'CorhenoBofano',
            password: '_uCGn8n3qX9Mgte',
            'boxes[0][text]': key
        }
    }).then(async (res) => {
            console.log(res);
            if (res.data && res.data.data) {
                let url = encodeURI(res.data.data.url);
                msg.channel.send({
                    embed: {
                        title: msg.author.username,
                        image: {
                            url: url
                        },
                        color: await require('../helpers/color').extractColor(url)
                    }
                });
                await insertGif(msg, url);
            }
        }
    ).catch((error) => {
        console.error(error);
        msg.channel.send(error.message)
    });
};

const buttons = msg => {
    //https://api.imgflip.com/caption_image?template_id=102156234&text0=Sample text&username=CorhenoBofano&password=_uCGn8n3qX9Mgte
    let keys = msg.content.replace('!buttons ', '').split('|');
    axios.post(`https://api.imgflip.com/caption_image`, {},{
        params: {
            template_id: 87743020,
            username: 'CorhenoBofano',
            password: '_uCGn8n3qX9Mgte',
            'boxes[0][text]': keys[0],
            'boxes[1][text]': keys[1],
        }
    }).then(async (res) => {
            console.log(res);
            if (res.data && res.data.data) {
                let url = encodeURI(res.data.data.url);
                msg.channel.send({
                    embed: {
                        title: msg.author.username,
                        image: {
                            url: url
                        },
                        color: await require('../helpers/color').extractColor(url)
                    }
                });
                await insertGif(msg, url);
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
        '!randomGif': msg => getRandomGif(msg),
        '!gif': msg => gif(msg),
        '!memeStats': msg => subredditStats(msg),
        '!memeBois': msg => memeBois(msg),
        '!gifStats': msg => gifStats(msg),
        '!spongebob': msg => spongebob(msg),
        '!smart': msg => smart(msg),
        '!buttons': msg => buttons(msg),
    },

    help: () => {
        return '**MEMES & GIFS**:\n' +
            '`!randomMeme ?SUBREDDIT: random meme generator\n' +
            '!randomGif ?SUBREDDIT ?LIMIT ?restart: random gif generator\n' +
            '!gif KEYWOARD search tenor for gif with \n' +
            '!memeStats get random subreddit meme chat search stats \n' +
            '!memeBois get meme authors pie chart stats \n' +
            '!gifStats get gif search authors pie chart stats\n' +
            '!smart ?TEXT gif with smart guy meme\n' +
            '!buttons TEXT1 | TEXT2 gif two choice buttons\n' +
            '!spongebob ?TEXT return mocking spongebob meme with passed text `\n\n'
    }

};
