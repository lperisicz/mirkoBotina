const axios = require('axios');
const getInsult = msg => {
    let name = msg.content.replace("!insult ", "");
    axios.get(`https://evilinsult.com/generate_insult.php?lang=en&type=json`, {})
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
        return '!insult ?name: insult someone\n';
    }
};
