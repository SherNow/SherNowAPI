'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Events Schema
 */
var Eventschema = new Schema({
    MUNID: {
        type: String,
    },
    CODEID: {
        type: String,
    },
    DT01: {
        type: String,
    },
    DT02: {
        type: String,
    },
    TITRE: {
        type: String,
    },
    CATEG: {
        type: Schema.Types.Mixed,
    },
    LOC: {
        type: String,
    },
    AD: {
        type: String,
    },
    AD_MUN: {
        type: String,
    },
    AD_MUNID: {
        type: String,
    },
    TEL1: {
        type: String,
    },
    CONTACT: {
        type: String,
    },
    DESCRIP: {
        type: String,
    },
    URL: {
        type: String,
    },
    URL_PHOTO: {
        type: String,
    }
});

mongoose.model('Events', Eventschema);
