const jwt = require('jsonwebtoken');

// Controller authenthic login.
exports.required = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.JWT_KEY)
        req.user = decode;
        next()
    } catch (error) {
        return res.status(401).send({ msg: 'Authentication failed!' })
    }
}

exports.optional = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.JWT_KEY)
        req.user = decode
        next()
    } catch (error) {
        next()
    }
}