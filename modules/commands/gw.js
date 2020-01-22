const axios = require("axios");
const logger = require("../logger");

module.exports = {
	name: "gw",
	description: "Search for GBF crews",
	execute(msg, args) {
		const query = args.map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(" ");

		axios.post("http://gbf.gw.lt/gw-guild-searcher/search", {
			search: query
		})
		.then(response => {
			const crews = [];

			response.data.result.forEach(crew => {
				const crewData = {
					name: crew.data[0].name,
					value: "[Points: " + crew.data[0].points + "](http://game.granbluefantasy.jp/#guild/detail/" + crew.id  + ")",
					inline: true
				};

				crews.push(crewData);
			});

			const embed = {
				title: "GW Crew Search Results",
				fields: crews
			};

			msg.channel.send({ embed: embed })
				.catch(logger.error);;
		})
		.catch(logger.error);
	},
};
