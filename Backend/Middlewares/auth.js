const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

module.exports = function (req, res, next) {
    const token = req.header('Authorization')
    if (!token) return res.status(401).json({ message: 'No token provided' })

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET)
        req.userId = decoded._id
        next()
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' })
    }
}
