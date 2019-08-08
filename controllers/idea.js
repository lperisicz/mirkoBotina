const axios = require('axios')
const randomName = msg => {
    axios.get(`http://itsthisforthat.com/api.php?text`)
        .then((res) => {
            msg.channel.send(res.data)
        })
        .catch((error) => {
            console.error(error)
        })
};

module.exports = {

    routes: {
        '!randomIdea': randomName,
    },

    help: () => {
        return '!randomIdea: returns random startup idea\n';
    }

};
