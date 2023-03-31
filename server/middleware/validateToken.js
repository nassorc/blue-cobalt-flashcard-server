const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    try {
        if(!req.headers.authorization) throw new Error('No valid token')
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.body = {...req.body, ...decoded}
        next()
    }
    catch(err) {
        console.log(err.message)
        res.set({
            'Content-Type': 'application/json'
        })
        res.status(401).send({error: err.message})
    }
}
module.exports = validateToken