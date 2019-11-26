require("dotenv").config();
const OWNER = process.env.OWNER ? process.env.OWNER ? "";
const logger = require("../logger");

module.exports = {
	name: "botavatar",
	description: "Update the bot's avatar",
	execute(msg, args) {
        if (msg.author.id !== OWNER) {
            return;
        }

        logger.info("message attachments ", {...msg.attachments.first()});

        msg.client.user.setAvatar(msg.attachments.first().url)
            .then(user => {
                logger.info("New avatar set");

                msg.channel.send("My new avatar is:", {
                    file: msg.attachments.first().url
                })
                .catch (logger.error);
            })
            .catch(logger.error);
	},
};
