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

mongoose.model('Garbage', Garbageschema);
