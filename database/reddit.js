module.exports = {

    getSubredditStats: async msg => {
        const client = require('../database/setup.js').getClient();
        let query = `SELECT COUNT(id) as count, subreddit FROM random_meme_subreddits GROUP BY(subreddit) ORDER BY(COUNT(id)) DESC LIMIT 10`;

        client.query(query, (err, res) => {
            console.log(err ? err.stack : res.rows);
            if (!err) {
                let response = `https://quickchart.io/chart?backgroundColor=white&c={type:\'pie\',data:{labels:[`;
                response += res.rows.map(row => {return `\'${row.subreddit + ` ${`${Math.floor(row.count * 100 / res.rows.length)} %`}`}\'`}).join(',');
                response += `], datasets:[{data:[${res.rows.map(row => {return row.count})}]}]}}`;
                if (!err) {
                    msg.channel.send({
                        embed: {
                            image: {
                                url: encodeURI(response)
                            }
                        }
                    });
                } else {
                    msg.channel.send('empty');
                }
            }
        })
    },

    insertSubreddit: async (msg, imageUrl) => {
        const client = require('../database/setup.js').getClient();
        let key = msg.content.split(" ")[1] ? msg.content.split(" ")[1] : 'predefined';
        let query = `INSERT INTO random_meme_subreddits (\"searchedAt\", \"subreddit\", \"imageUrl\", \"author\") 
        VALUES(\'${Date.now()}\', \'${key}\', \'${imageUrl}\', \'${msg.author.username}\')`;

        client.query(query, (err, res) => {
            console.log(err ? err.stack : res.rows);
        })
    }

};
