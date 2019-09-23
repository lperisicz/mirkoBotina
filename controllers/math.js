const roll = msg => {
    let limit = msg.content.replace('!roll ', '').replace('!roll', '');
    let number = Math.floor(Math.random() * (limit ? limit : 100) + 1);
    msg.channel.send(number+'')
};

module.exports = {

    routes: {
        '!roll': roll,
    },

    help: () => {
        return '***MATH***\n' +
        '`!roll ?number: rolls random num form zero to defined number or 100`\n\n';
    }
};
