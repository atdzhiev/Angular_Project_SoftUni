const {
    userModel,
    tokenBlacklistModel
} = require('../models');

const utils = require('../utils');

const bsonToJson = (data) => { return JSON.parse(JSON.stringify(data)) };
const removePassword = (data) => {
    const { password, __v, ...userData } = data;
    return userData
}

function register(req, res, next) {
    const { tel, email, username, password, repeatPassword } = req.body;

    return userModel.create({ tel, email, username, password })
        .then((createdUser) => {
            createdUser = bsonToJson(createdUser);
            createdUser = removePassword(createdUser);

            const token = utils.jwt.createToken({ id: createdUser._id });

            res.status(200).send({
                user: createdUser,
                accessToken: token
            });
        })
        .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                let field = err.message.split("index: ")[1];
                field = field.split(" dup key")[0];
                field = field.substring(0, field.lastIndexOf("_"));

                res.status(409)
                    .send({ message: `This ${field} is already registered!` });
                return;
            }
            next(err);
        });
}

function login(req, res, next) {
    const { email, password } = req.body;

    userModel.findOne({ email })
        .then(user => {
            return Promise.all([user, user ? user.matchPassword(password) : false]);
        })
        .then(([user, match]) => {
            if (!match) {
                res.status(401)
                    .send({ message: 'Wrong email or password' });
                return
            }
            user = bsonToJson(user);
            user = removePassword(user);

            const token = utils.jwt.createToken({ id: user._id });

            res.status(200).send({
                user,
                accessToken: token
            });
        })
        .catch(next);
}

function logout(req, res) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        tokenBlacklistModel.create({ token });
    }

    res.status(204).send();
}

function getProfileInfo(req, res, next) {
    const { _id: userId } = req.user;

    userModel.findOne({ _id: userId }, { password: 0, __v: 0 }) //finding by Id and returning without password and __v
        .then(user => { res.status(200).json(user) })
        .catch(next);
}

function editProfileInfo(req, res, next) {
    const { _id: userId } = req.user;
    const { tel, username, email } = req.body;

    userModel.findOneAndUpdate({ _id: userId }, { tel, username, email }, { runValidators: true, new: true })
        .then(x => { res.status(200).json(x) })
        .catch(next);
}

module.exports = {
    login,
    register,
    logout,
    getProfileInfo,
    editProfileInfo,
}
