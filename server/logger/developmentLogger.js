const { format, createLogger, transports } = require('winston');
const { combine, timestamp, label, errors, printf, colorize } = format;

const logFormat = printf(({ timestamp, level, label, message, user, success, stack }) => {
    return `[${timestamp}] [${label}] ${level}: ${stack || message} - user: ${user}, success: ${success}`
})
function developmentLogger() {
  return createLogger({
    level: 'info',
    format: combine(
        colorize(),
        timestamp(),
        errors({ stack: true }),
        logFormat,
    ),
  transports: [
    new transports.Console(),
  ],
});
}
module.exports = developmentLogger;