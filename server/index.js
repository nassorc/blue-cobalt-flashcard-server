const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

// enable cross-origin resource sharing
// app.use(cors(require('./config/corsOptions')))
app.use(cors())

require('dotenv').config()
const PORT = process.env.PORT || 3001

app.use(express.json())

require('./routes')(app)

async function main() {
    await mongoose.connect(`${process.env.DATABSE_URI}`);
}

main()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        })
    })