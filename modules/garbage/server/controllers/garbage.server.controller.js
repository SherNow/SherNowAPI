'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
var mongoose = require('mongoose');
var Garbage = mongoose.model('Garbage');
var errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Show the current garbage
 */
exports.read = function (req, res) {
    res.json(req.garbage);
};

/**
 * List of Garbages
 */
exports.list = function (req, res) {
    Garbage.find().exec(function (err, garbages) {
        if (err) {
            console.log("error");
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(garbages);
        }
    });
};

/**
 * Garbage middleware
 */
exports.garbageByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Garbage is invalid'
        });
    }

    Garbage.findById(id).exec(function (err, garbage) {
        if (err) {
            return next(err);
        } else if (!garbage) {
            return res.status(404).send({
                message: 'No garbage with that identifier has been found'
            });
        }
        req.garbage = garbage;
        next();
    });
};
