const { eventModel } = require('../models');


function getEvents(req, res, next) {
    eventModel.find()
        .populate('_ownerId')
        .populate('participants')
        .then(events => res.json(events))
        .catch(next);
}


function getEvent(req, res, next) {
    const { eventId } = req.params;

    eventModel.findById(eventId)
        .populate('_ownerId')
        .populate('participants')
        .then(event => res.json(event))
        .catch(next);
}


function createEvent(req, res, next) {
    const { _id: userId } = req.user;

    eventModel.create({
        ...req.body,
        _ownerId: userId,
        participants: []
    })
        .then(event => res.status(201).json(event))
        .catch(next);
}


function editEvent(req, res, next) {
    const { eventId } = req.params;

    eventModel.findByIdAndUpdate(eventId, req.body, { new: true })
        .then(event => res.json(event))
        .catch(next);
}


function deleteEvent(req, res, next) {
    const { eventId } = req.params;

    eventModel.findByIdAndDelete(eventId)
        .then(() => res.json({ message: 'Event deleted' }))
        .catch(next);
}


function joinEvent(req, res, next) {
    const { eventId } = req.params;
    const { _id: userId } = req.user;

    eventModel.findByIdAndUpdate(
        eventId,
        { $addToSet: { participants: userId } },
        { new: true }
    )
        .then(event => res.json(event))
        .catch(next);
}


function leaveEvent(req, res, next) {
    const { eventId } = req.params;
    const { _id: userId } = req.user;

    eventModel.findByIdAndUpdate(
        eventId,
        { $pull: { participants: userId } },
        { new: true }
    )
        .then(event => res.json(event))
        .catch(next);
}

module.exports = {
    getEvents,
    getEvent,
    createEvent,
    editEvent,
    deleteEvent,
    joinEvent,
    leaveEvent
};
