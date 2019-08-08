
const formatMessage = msg => {
    msg.channel.send(msg.content.replace("!code ", ""), {code: 'Java'});
};

module.exports = {

    routes: {
        '!code': formatMessage
    },

    help: () => {
        return '!code CODE: formats passed code\n';
    }
};
