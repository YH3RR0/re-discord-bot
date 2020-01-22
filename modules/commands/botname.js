require("dotenv").config();
const OWNER = process.env.OWNER ? process.env.OWNER : "";
const logger = require("../logger");

module.exports = {
	name: "botname",
	description: "Update the bot's name",
	execute(msg, args) {
        if (msg.author.id !== OWNER) {
            return;
        }

        msg.client.user.setUsername(args.join(" "))
            .then(user => {
                logger.info(`New bot username: ${user.username}`);

                msg.channel.send(`My new username is ${user.username}`)
                    .catch(logger.error);
            })
            .catch(logger.error);
	},
};
