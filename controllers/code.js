const formatMessage = msg => {
    msg.channel.send({
            embed: {
                title: msg.author.username,
                description: "```js\n" + msg.content.replace("!code ", "") + "```"
            }
        }
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
