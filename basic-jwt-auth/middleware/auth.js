const jwt = require('jsonwebtoken');

const config = require('../config');

const substrToken = (header = '') => header.substring(7, header.length);

const auth = async (req, res, next) => {
    const authorization = req.headers.authorization || '';

    if (!authorization.startsWith('Bearer ')) {
        res.status(401).json({
            message: 'Authorization header is not correct'
        });
        return;
    }

    try {
        const token = substrToken(authorization);
        const { data } = jwt.verify(token, config.secret);

        if (data) {
            req.user = data;
            return next();
        } else {
            res.status(401).json({ message: 'User is not authorized' });
        }
    } catch (err) {
        res.status(401).json({ message: 'User is not authorized' });
    }
};

module.exports = auth;
