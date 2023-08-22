// import authRoute from './authRoute'
import deckRoute from './deck/deckRoute'
import userRoute from './user/userRoute'
import validateToken from '../middleware/validateToken'
import AppError from '../lib/error/AppError'

module.exports = (app: any) => {
    app.use('/deck', validateToken, deckRoute)
    app.use('/user', userRoute)
    app.all('*', (req, res, next) => {
      next(new AppError('Route not found', 404))
    })
}