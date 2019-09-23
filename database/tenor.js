module.exports = {


    insertGif: async (msg, gifUrl) => {
        const client = require('../database/setup.js').getClient();
        let key = msg.content.split(" ")[1] ? msg.content.split(" ")[1] : 'predefined';
        let query = `INSERT INTO random_gif_keywords (\"searchedAt\", \"keyword\", \"gifUrl\", \"author\") 
        VALUES(\'${Date.now()}\', \'${key}\', \'${gifUrl}\', \'${msg.author.username}\')`;

        client.query(query, (err, res) => {
            console.log(err ? err.stack : res.rows);
        })
    },

    gifStats: async (msg) => {
        const client = require('../database/setup.js').getClient();
        let query = `SELECT COUNT(id) as count, author FROM random_gif_keywords GROUP BY(author) ORDER BY(COUNT(id)) DESC LIMIT 10`;

        client.query(query,async (err, res) => {
            console.log(err ? err.stack : res.rows);
            if (!err) {
                let count = 0;
                res.rows.forEach(row => count += parseInt(row.count));
                let response = `https://quickchart.io/chart?backgroundColor=white&c={type:\'pie\',data:{labels:[`;
                response += res.rows.map(row => {return `\'${row.author + ` ${`${Math.floor(row.count * 100 / count)} %`}`}\'`}).join(',');
                response += `], datasets:[{data:[${res.rows.map(row => {return row.count})}]}]}}`;
                if (!err) {
                    msg.channel.send({
                        embed: {
                            title: 'Most gif searches:',
                            image: {
                                url: encodeURI(response)
                            },
                            color: await require('../helpers/color').extractColor(encodeURI(response))
                        }
                    });
                } else {
                    msg.channel.send('empty');
                }
            }
        })
    }


};
