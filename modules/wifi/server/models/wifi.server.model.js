'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Wifi Schema
 */
var WifiSchema = new Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    civic_number: {
        type: String,
    },
    street_name: {
        type: String,
    },
    city: {
        type: String,
    },
    province: {
        type: String,
    },
    country: {
        type: String,
    },
    postal_code: {
        type: String,
    },
    public_phone_number: {
        type: String,
    },
    public_email: {
        type: String,
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    }
});

mongoose.model('Wifi', WifiSchema);
