'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Events = mongoose.model('Events'),
    mock = require('../../../../mocks/api_mock.js');

/**
 * Globals
 */
var evt, eventId;

/**
 * Unit tests
 */
describe('Events Model Unit Tests:', function () {

    beforeEach(function (done) {
        evt = new Events(mock.event.new);
        done();
    });

    describe('Method Save', function () {
        it('should be able to save without problems', function (done) {
            this.timeout(10000);
            return evt.save(function (err, doc) {
                eventId = doc._id;
                done();
            });
        });
    });

    afterEach(function (done) {
        Events.find({_id : eventId}).remove().exec();
        done();
    });
});