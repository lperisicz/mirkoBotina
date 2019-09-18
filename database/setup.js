const {Client} = require('pg');
const client = new Client({
    host : process.env.PGHOST,
    user : process.env.PGUSER,
    database : process.env.PGDATABASE,
    password : process.env.PGPASSWORD,
    port : process.env.PGPORT,
    ssl: true
});


module.exports = {

    setup: async () => {
        let text = 'CREATE TABLE distributors (\n' +
            '     did    integer PRIMARY KEY,\n' +
            '     name   varchar(40) NOT NULL' +
            ');';

        let connection = await client.connect();
        client.query(text, (err, res) => {
            console.log(err ? err.stack : res.rows[0].message); // Hello World!
            // client.end()
        })
    }

};
