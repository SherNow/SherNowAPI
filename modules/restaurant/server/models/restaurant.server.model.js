'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Garbage Schema
 */
var Restaurantschema = new Schema({
    feature: {
        type: Schema.Types.Mixed,
    }
});

/**
 * Get all garbage features
 * @returns {Query<T[]>} List of garbage features
 */
Restaurantschema.statics.findAll = function () {
    return this.model('Restaurant').find({});
};

mongoose.model('Restaurant', Restaurantschema);
