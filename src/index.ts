// TODO:
// * changing funciton names used in decks, might change architecture, project uses architecture that isn't being used
// * problems with querying deck data
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import log from "./lib/logger"
import "dotenv/config"
const app = express()

// enable cross-origin resource sharing
// app.use(cors(require('./config/corsOptions')))
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

const PORT = process.env.PORT || 3001

app.use(cookieParser());
app.use(express.json())
require('./app')(app)

app.use((err, req, res, next) => {
  log.error(err.message);
  // response sent
  if(res.headersSent) {
    next(err)
  }
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({error: {
    status: err.statusCode,
    message: err.message
  }})
})

app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);
    console.log("connected to database");
    await mongoose.connect(`${process.env.DATABSE_URI}`);
})