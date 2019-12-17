const logger = require("../logger");
const mentionUser = require("../helper/mentionUser");

module.exports = {
	name: "birthday",
	description: "Congratulate someone's birthday",
	execute(msg, args) {
        msg.channel.send(`Happy Birthday ${args[0]}!`)
        .catch (logger.error);
	},
};
