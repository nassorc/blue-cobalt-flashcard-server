const authRoute = require('./authRoute')
const deckRoute = require('./deckRoute')
const userRoute = require('./userRoute')
const validateToken = require('../middleware/validateToken')

module.exports = (app) => {
    app.use('/', authRoute)
    app.use('/deck', validateToken, deckRoute)
    app.use('/user', validateToken, userRoute)
}