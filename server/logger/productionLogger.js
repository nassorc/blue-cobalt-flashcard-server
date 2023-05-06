const { format, createLogger, transports } = require('winston');
const { combine, timestamp, label, errors, printf, json } = format;

// Example log:
// productionLogger().info('User created a flashcard', { userId: '123456', success: true })

function productionLogger() {
  return createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        errors({ stack: true }),
        json(),
    ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({ filename: 'userActions.log'}),
  ],
});
}
module.exports = productionLogger;