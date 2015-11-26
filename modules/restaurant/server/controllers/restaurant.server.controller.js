'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');
var errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


/**
 * List of Restaurants
 */

exports.list = function (req, res) {
    Restaurant.findAll().then(function(retaurants) {
        res.json(retaurants);
    }, function(err) {
        console.log("error");
        return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
        });
    });
};
