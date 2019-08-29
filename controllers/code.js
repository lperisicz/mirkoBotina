const formatMessage = msg => {
    msg.channel.send({
            embed: {
                title: msg.author.username,
                description: msg.content.replace("!code ", "")
            }
        },
        {code: 'Java'}
    );
};

module.exports = {

    routes: {
        '!code': formatMessage
    },

    help: () => {
        return '!code CODE: formats passed code\n';
    }
};
