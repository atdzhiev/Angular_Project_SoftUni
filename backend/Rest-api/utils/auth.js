const jwt = require('./jwt');
const {
    userModel,
    tokenBlacklistModel
} = require('../models');

function auth(redirectUnauthenticated = true) {

    return function (req, res, next) {
        const token = req.headers.authorization?.split(' ')[1] || '';

        Promise.all([
            jwt.verifyToken(token),
            tokenBlacklistModel.findOne({ token })
        ])
            .then(([data, blacklistedToken]) => {
                if (blacklistedToken) {
                    return Promise.reject(new Error('blacklisted token'));
                }

                return userModel.findById(data.id)
                    .then(user => {
                        req.user = user;
                        req.isLogged = true;
                        next();
                    });
            })
            .catch(err => {
                if (!redirectUnauthenticated) {
                    next();
                    return;
                }

                if (['token expired', 'blacklisted token', 'jwt must be provided'].includes(err.message)) {
                    return res.status(401).send({ message: "Invalid token!" });
                }

                next(err);
            });
    };
}

module.exports = auth;