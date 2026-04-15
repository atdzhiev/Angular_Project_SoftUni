const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const eventController = require('../controllers/eventController');

router.get('/', eventController.getEvents);
router.post('/', auth(), eventController.createEvent);

router.get('/:eventId', eventController.getEvent);
router.put('/:eventId', auth(), eventController.editEvent);
router.delete('/:eventId', auth(), eventController.deleteEvent);

router.post('/:eventId/join', auth(), eventController.joinEvent);
router.post('/:eventId/leave', auth(), eventController.leaveEvent);

module.exports = router;
