const evaluate = async msg => {
    await msg.channel.send("evaluating")
    let message;

    try {
        message = eval(msg.content.replace('!eval ', ''));
    } catch (e) {
        await msg.channel.send("errorcina svjetska")
        await msg.channel.send(e.message)
    }
    await msg.channel.send(message)
};

module.exports = {

    routes: {
        '!eval': evaluate,
    },

    help: () => {
        return '***EVAL***\n' +
        '`!eval: returns result of passed javascript code`\n\n';
    }

};
