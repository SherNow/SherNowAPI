'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
var mongoose = require('mongoose');
var Wifi = mongoose.model('Wifi');
var errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Show the current wifi
 */
exports.read = function (req, res) {
    res.json(req.wifi);
};

/**
 * List of Wifis
 */
exports.list = function (req, res) {
    Wifi.find().exec(function (err, wifis) {

        console.log(wifis);
        
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(wifis);
        }
    });
};

/**
 * Wifi middleware
 */
exports.wifiByID = function (req, res, next, id) {

    console.log(id);
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Wifi is invalid'
        });
    }

    Wifi.findById(id).exec(function (err, wifi) {
        if (err) {
            return next(err);
        } else if (!wifi) {
            return res.status(404).send({
                message: 'No wifi with that identifier has been found'
            });
        }
        req.wifi = wifi;
        next();
    });
};
