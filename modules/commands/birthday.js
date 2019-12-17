const logger = require("../logger");
const mentionUser = require("../helpers/mentionUser");

module.exports = {
	name: "birthday",
	description: "Congratulate someone's birthday",
	execute(msg, args) {
        if (args.length === 0) {
            msg.channel.send(`Happy Birthday ${msg.author}!`)
            .catch (logger.error);

            return;
        }

        const user = mentionUser(args[0]);

        if (msg.guild.member(user)) {
            msg.channel.send(`Happy Birthday ${args[0]}!`)
            .catch (logger.error);
        }
	},
};
