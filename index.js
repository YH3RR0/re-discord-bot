const Discord = require("discord.js");
const bot = new Discord.Client();
const botCommands = require("./modules/commands");
const logger = require("./modules/logger");

require("dotenv").config();
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX ? process.env.PREFIX : "!";
bot.commands = new Discord.Collection();

Object.keys(botCommands).map(key => {
    bot.commands.set(botCommands[key].name, botCommands[key]);
});

bot.login(TOKEN);

bot.on("ready", () => {
    logger.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("error", logger.error);

bot.on("message", msg => {
    if (msg.author.equals(bot.user) || !msg.content.startsWith(PREFIX)) {
        return;
    }

    const args = msg.content.substring(PREFIX.length).split(" ");
    const command = args.shift().toLowerCase();
    logger.info(`Called command: ${command}, ${args}`);

    if (!bot.commands.has(command)) {
        return;
    }

    try {
        bot.commands.get(command).execute(msg, args);
    }
    catch (error) {
        logger.error(error);
    }
});
