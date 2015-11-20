'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');
var path = require('path');
var mongoose = require('mongoose');
var Garbage = mongoose.model('Garbage');
var errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
var request = require('request');
var geojsonUtils = require('geojson-utils');

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
    Garbage.findAll().then(function(garbages) {
        res.json(garbages);
    }, function(err) {
        console.log("error");
        return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
        });
    });
};

/**
 * Garbage middleware
 */
exports.garbageByPostalCode = function (req, res, next, postalCode) {
    getGeolocationFromAddress(postalCode)
        .then(function(geoLocation) {
            Garbage.findAll().then(function(features) {

                // Possible cellect day resolution
                var collectDays = [
                    'JOURCUEILLETTE1_resolved',
                    'JOURCUEILLETTE2_resolved',
                    'JOURCUEILLETTE3_resolved',
                ];

                var collect = {};
                var collectZone = getCollectZone(geoLocation, features);

                _.each(collectDays, function(collectDay) {
                    if (collectZone.feature.properties[collectDay]) {
                        collect = {
                            _id: collectZone._id,
                            collectDay: collectZone.feature.properties[collectDay]
                        }
                    }
                });

                return res.json(collect);
            }, function (err) {
                console.log("error");
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            });
        },function(err) {
            console.log("error");
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        });
};

/**
 * Return Collect Zone
 * @param geoLocation
 * @param features
 */
function getCollectZone(geoLocation, features) {
    var zone = null;
    _.each(features, function (polygone) {
        if (geojsonUtils.pointInPolygon({"type":"Point","coordinates":[geoLocation.lng, geoLocation.lat]},
                {"type":polygone.feature.geometry.type, "coordinates": polygone.feature.geometry.coordinates })) {
            zone = polygone;
        }
    });

    return zone;
}

/**
 * Return Geolocation Json object contaning latitude and longitude based on an address
 * Documentaion : https://developers.google.com/maps/documentation/geocoding/
 * @param address
 * @returns {Promise} {lat: number, lng: number}
 */
function getGeolocationFromAddress(address) {
    return new Promise(function(resolve, reject) {
        request('http://maps.googleapis.com/maps/api/geocode/json?address=' + address,
            function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var res = JSON.parse(body);
                    resolve(res.results[0].geometry.location);
                } else {
                    reject(error);
                }
            });
    });
}
