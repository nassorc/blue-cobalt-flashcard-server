// import authRoute from './authRoute'
import deckRoute from '../app/deck/deckRoute'
import userRoute from '../app/user/userRoute'
import validateToken from '../middleware/validateToken'
import AppError from '../lib/error/AppError'

module.exports = (app: any) => {
    app.use('/deck', validateToken, deckRoute)
    app.use('/user', userRoute)
    app.all('*', (req, res, next) => {
      next(new AppError('This route does not exist', 404))
    })
}