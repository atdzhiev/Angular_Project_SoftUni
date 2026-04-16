const { eventModel } = require('../models');
const {userModel} = require('../models')


function getEvents(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    eventModel.find()
        .sort({ created_at: -1 })
        .limit(limit)
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


async function joinEvent(req, res, next) {
    try {
        const { eventId } = req.params;
        const { _id: userId } = req.user;

        const event = await eventModel.findByIdAndUpdate(
            eventId,
            { $addToSet: { participants: userId } },
            { new: true }
        );

        await userModel.findByIdAndUpdate(
            userId,
            { $addToSet: { events: eventId } }
        );

        res.json(event);

    } catch (err) {
        next(err);
    }
}



async function leaveEvent(req, res, next) {
    try {
        const { eventId } = req.params;
        const { _id: userId } = req.user;

       
        const event = await eventModel.findByIdAndUpdate(
            eventId,
            { $pull: { participants: userId } },
            { new: true }
        );

        await userModel.findByIdAndUpdate(
            userId,
            { $pull: { events: eventId } }
        );

        res.json(event);

    } catch (err) {
        next(err);
    }
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
