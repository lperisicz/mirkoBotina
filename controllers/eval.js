const evaluate = msg => {
    msg.send("evaluating")
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
        '!eval': evaluate,
    },

    help: () => {
        return '!eval: returns result of passed javascript code\n';
    }

};
