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



var GeolocalisationGetter = function(){
    this.get = function(postalCode) {
        return new Promise(function(resolve, reject) {
            console.log('http://maps.googleapis.com/maps/api/geocode/json?address=' + postalCode);
            request('http://maps.googleapis.com/maps/api/geocode/json?address=' + postalCode,
                function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        var res = JSON.parse(body);
                        resolve(res.results[0].geometry.location);
                    } else {
                        reject(error);
                    }
                });
        });
    };
};

var CollectZoneGetter = function(){
    this.get = function(geoLocation, features){
        var zone = null;
        console.log(geoLocation);
        
        _.each(features, function (polygone) {
        if (geojsonUtils.pointInPolygon({"type":"Point","coordinates":[geoLocation.lng, geoLocation.lat]},
                {"type":polygone.feature.geometry.type, "coordinates": polygone.feature.geometry.coordinates })) {
            zone = polygone;
        }
    });

        return zone;
    };
};

var GarbageCollectDay = function(){
};

GarbageCollectDay.prototype =  {
    getCollectDay : function(postalCode, res){
        
        var geoGetter = new GeolocalisationGetter();
        var zoneGetter = new CollectZoneGetter();
        
        geoGetter.get(postalCode).then(function (geoLocation) {
            Garbage.findAll().then(function (features) {

                var collect = {};
                var collectZone = zoneGetter.get(geoLocation, features);
                
                if (collectZone === null){
                    return res.json({collectDay : "Code postal erroné" });
                }
                
                // Possible collect day resolution
                var collectDays = [
                    'JOURCUEILLETTE1_resolved',
                    'JOURCUEILLETTE2_resolved',
                    'JOURCUEILLETTE3_resolved',
                ];
                
                _.each(collectDays, function (collectDay) {
                    if (collectZone.feature.properties[collectDay]) {
                        collect = {
                            _id: collectZone._id,
                            collectDay: collectZone.feature.properties[collectDay]
                        };
                    }
                });

                return res.json(collect);
            }, function (err) {
                console.log("error");
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            });
        }, function (err) {
            console.log("error");
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        });
    }
};

/**
 * Garbage middleware
 */
exports.garbageByPostalCode = function (req, res, next, postalCode) {
    new GarbageCollectDay().getCollectDay(postalCode, res);
};
