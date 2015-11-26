'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
var mongoose = require('mongoose');
var Parking = mongoose.model('Parking');
var errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


/**
 * List of Parkings
 */

exports.list = function (req, res) {
    Parking.findAll().then(function(parkings) {
        res.json(parkings);
    }, function(err) {
        console.log("error");
        return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
        });
    });
};
