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
    },

    getClient: () => {return client2}

};
