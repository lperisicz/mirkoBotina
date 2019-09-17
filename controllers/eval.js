const eval = msg => {

    let message;

    try {
        message = eval(msg.content.replace('!eval ', ''));
    } catch (e) {
        msg.send("errorcina svjetska")
    }
    msg.send(message)
};

module.exports = {

    routes: {
        '!eval': eval,
    },

    help: () => {
        return '!eval: returns result of passed javascript code\n';
    }

};
