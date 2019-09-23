const axios = require('axios');
const getInsult = msg => {
    let name = msg.content.replace("!insult ", "");
    axios.get(`https://evilinsult.com/generate_insult.php?type=plain&lang=en&_=1565950876793&type=json`, {})
        .then((res) => {
            msg.channel.send(name + " " + res.data.insult)
        })
        .catch((error) => {
            console.error(error);
            msg.channel.send(error.message)
        })
};

module.exports = {

    routes: {
        '!insult': getInsult,
    },

    help: () => {
        return '***INSULT***\n' +
        '`!insult ?name: insult someone`\n\n';
    }
};
