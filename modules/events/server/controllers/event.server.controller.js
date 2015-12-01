'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
var mongoose = require('mongoose');
var Events = mongoose.model('Events');
var errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Show the current event
 */
exports.read = function (req, res) {
    res.json(req.event);
};

/**
 * List of Events
 */
exports.list = function (req, res) {
    Events.find().exec(function (err, events) {
        
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(events);
        }
    });
};

/**
 * Events middleware
 */
exports.eventByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Events is invalid'
        });
    }

    Events.findById(id).exec(function (err, event) {
        if (err) {
            return next(err);
        } else if (!event) {
            return res.status(404).send({
                message: 'No event with that identifier has been found'
            });
        }
        req.event = event;
        next();
    });
};
