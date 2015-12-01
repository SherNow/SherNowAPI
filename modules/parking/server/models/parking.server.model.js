'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Garbage Schema
 */
var Parkingschema = new Schema({
    feature: {
        type: Schema.Types.Mixed,
    }
});

/**
 * Get all garbage features
 * @returns {Query<T[]>} List of parking features
 */
Parkingschema.statics.findAll = function () {
    return this.model('Parking').find({});
};

mongoose.model('Parking', Parkingschema);
