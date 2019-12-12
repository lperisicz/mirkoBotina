const insertKeyword = (require('../database/keywordStats.js')).insertKeyword;
const getLatestTimeByKeyword = (require('../database/keywordStats.js')).getLatestTimeByKeyword;
const getCountByKeyword = (require('../database/keywordStats.js')).getCountByKeyword;

const insertKeywordToDatabase = async msg => {
    let lastInput = await getLatestTimeByKeyword(msg.content);
    if (Date.now() - lastInput > 10000) {
        await insertKeyword(msg);
        console.log("input")
    } else {
        console.log("no input")
    }
};

const getCountByKeywordFromDatabase = async msg => {
    let key = msg.content.split(" ")[1];
    let count = await getCountByKeyword(key);
    msg.channel.send(count)
};

module.exports = {

    routes: {
        '<:kuis:653591150598291476>': msg => insertKeywordToDatabase(msg),
        '!stats': msg => getCountByKeywordFromDatabase(msg),
    },

    help: () => {
        return ''
    }

};
