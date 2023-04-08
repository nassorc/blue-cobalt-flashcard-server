const userRoute = require('./userRoute')
const deckRoute = require('./deckRoute')
const validateToken = require('../middleware/validateToken')

module.exports = (app) => {
    app.use('/', userRoute)
    app.use('/deck', validateToken, deckRoute)
}