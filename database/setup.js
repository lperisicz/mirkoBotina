const {Client} = require('pg');
let client2 = {};

module.exports = {

    setup: async () => {
        const client = (client2 = new Client({
            host: process.env.PGHOST,
            user: process.env.PGUSER,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
            ssl: true
        }));

        await client.connect();


        // try {

        // let text = 'CREATE TABLE distributors (\n' +
        //     '     did    integer PRIMARY KEY,\n' +
        //     '     name   varchar(40) NOT NULL' +
        //     ');';
        //     client.query(text, (err, res) => {
        //         console.log(err ? err.stack : res.rows[0].message); // Hello World!
        //         client.end()
            // })
        // } catch (e) {
        //     console.log(e)
        // }
    },

    getClient: () => {return client2}

};
