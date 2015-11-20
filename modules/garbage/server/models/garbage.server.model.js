'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Garbage Schema
 */
var Garbageschema = new Schema({
    feature: {
        type: Schema.Types.Mixed,
    }
});

/**
 * Get all garbage features
 * @returns {Query<T[]>} List of garbage features
 */
Garbageschema.statics.findAll = function () {
    return this.model('Garbage').find({});
};

mongoose.model('Garbage', Garbageschema);
