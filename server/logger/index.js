const productionLogger = require('./productionLogger')();
const developmentLogger = require('./developmentLogger')();

module.exports = {
    productionLogger,
    developmentLogger,
} 