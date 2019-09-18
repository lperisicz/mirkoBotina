const roll = msg => {
    let limit = msg.content.replace('!roll ', '').replace('!roll', '');
    let number = Math.floor(Math.random() * limit ? limit : 100);
    msg.channel.send(number+'')
};

module.exports = {

    routes: {
        '!roll': roll,
    },

    help: () => {
        return '!roll ?number: rolls random num\n';
    }
};
