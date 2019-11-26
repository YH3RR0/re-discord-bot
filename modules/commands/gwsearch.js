const axios = require("axios");
const logger = require("../logger");

module.exports = {
	name: "gw",
	description: "Search for GBF crews",
	execute(msg, args) {
		const query = args.map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(" ");

		axios.get("https://gbf.wiki/api.php", {
			params: {
				action: "query",
				format: "json",
				formatversion: 2,
				prop: "info",
				inprop: "url",
				titles: query
			}
		})
			.then(response => {
				logger.info(response.data);
				if (response.data.query.pages[0].missing) {
					msg.channel.send("I couldn't find that page.")
						.catch(error => {
							logger.error(error);
						});
				}
				else {
					msg.channel.send(response.data.query.pages[0].fullurl)
						.catch(error => {
							logger.error(error);
						});
				}
			})
			.catch(error => {
				logger.error(error);
			});
	},
};
