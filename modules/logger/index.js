const winston = require("winston");

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        winston.format.errors({ stack: true }),
        winston.format.metadata({ fillExcept: ["message", "level", "timestamp", "label"] })
    ),
    transports: [
        new winston.transports.File({
            filename: "./logs/error.log",
            format: winston.format.combine(winston.format.json()),
            level: "error" }),
        new winston.transports.File({
            filename: "./logs/info.log",
            format: winston.format.combine(winston.format.json()),
            level: "info" })
    ]
});

module.exports = logger;
