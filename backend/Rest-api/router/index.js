const router = require('express').Router();
const users = require('./users');
const test = require('./test');
const events = require('./events');
const { authController } = require('../controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/test', test);
router.use('/events', events);

module.exports = router;
