module.exports = {

    routes: {
        '!yes': (msg) => (require('./yes_no.js')).say(msg),
        '!no': (msg) => (require('./yes_no.js')).say(msg),
        '!maybe': (msg) => (require('./yes_no.js')).say(msg),
    },

    say: (msg) => {
        const axios = require('axios');
        let answer = msg.content.replace("!", "");
        axios.post(`http://yesno.wtf/api/?force=${answer}`, {})
            .then((res) => {
                msg.channel.send({
                    embed: {
                        image: {
                            url: res.data.image
                        }
                    }
                })
            })
            .catch((error) => {
                console.error(error)
            })
    },

    help: () => {
        return '***YES / NO / MAYBE***\n' +
        '`!yes: return random gif with yes \n' +
        '!no: return random gif with no\n' +
        '!maybe: return random gif with maybe`\n\n'
    }

};
