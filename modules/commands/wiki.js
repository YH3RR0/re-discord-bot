const axios = require("axios");
const logger = require("../logger");

module.exports = {
	name: "wiki",
	description: "Search the gbf.wiki page",
	execute(msg, args) {
		const query = args.join(" ");

		logger.info(`wiki query: ${query}`);

		axios.get("https://gbf.wiki/index.php", {
			params: {
				search: query
			},
			maxRedirects: 0,
			validateStatus: status => {
				return status >= 200 && status < 400;
			}
		}).then (response => {
			logger.info("wiki response status", {...response.status});
			logger.info("wiki response headers", {...response.headers});

			if (response.status === 302) {
				msg.channel.send(response.headers.location)
					.catch(logger.error);

				return;
			}

			msg.channel.send("I couldn't find that page.")
				.catch(logger.error);
		})
		.catch (error => {
			logger.error(error);

			msg.channel.send("There was an error accessing the wiki.")
				.catch(logger.error);
		});
	},
};
