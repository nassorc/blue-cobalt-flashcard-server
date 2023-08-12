// import authRoute from './authRoute'
import deckRoute from '../app/deck/deckRoute'
import userRoute from '../app/user/userRoute'
import validateToken from '../middleware/validateToken'

module.exports = (app: any) => {
    app.use('/deck', validateToken, deckRoute)
    app.use('/user', userRoute)
}