function filterKeyword(keyword) {
    return keyword.match('[a-zA-Z]+');
}

module.exports = {

    insertKeyword: async (msg) => {
        const client = require('../database/setup.js').getClient();
        let query = `INSERT INTO kuis_stats (\"saidat\", \"author\", \"keyword\") 
        VALUES(\'${Date.now()}\', \'${msg.author.username}\', \'${filterKeyword(msg.content)}\')`;
        client.query(query, (err, res) => {
            console.log(err ? err.stack : res.rows);
        })
    },

    getLatestTimeByKeyword: async (keyword) => {
        return new Promise(resolve => {
            const client = require('../database/setup.js').getClient();
            let query = `SELECT saidat FROM kuis_stats WHERE \"keyword\" = \'${filterKeyword(keyword)}\' ORDER BY saidat DESC LIMIT 1`;
            client.query(query, async (err, res) => {
                console.log(err ? err.stack : res.rows);
                if (!err) {
                    if (res.rows && res.rows.length) {
                        resolve(res.rows[0].saidat)
                    } else {
                        resolve(0)
                    }
                } else {
                    resolve(0)
                }
            })
        })
    },

    getCountByKeyword: async (keyword) => {
        return new Promise(resolve => {
            const client = require('../database/setup.js').getClient();
            let query = `SELECT COUNT(*) AS number FROM kuis_stats WHERE \"keyword\" = \'${filterKeyword(keyword)}\'`;
            client.query(query, async (err, res) => {
                console.log(err ? err.stack : res.rows);
                if (!err) {
                    if (res.rows && res.rows.length) {
                        resolve(res.rows[0].number)
                    } else {
                        resolve(0)
                    }
                } else {
                    resolve(0)
                }
            })
        })
    }

};
