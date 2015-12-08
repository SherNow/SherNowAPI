'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Garbage = mongoose.model('Garbage'),
    mock = require('../../../../mocks/api_mock.js');

/**
 * Globals
 */
var garbage, garbageId;

/**
 * Unit tests
 */
describe('Garbage Model Unit Tests:', function () {

    beforeEach(function (done) {
        garbage = new Garbage(mock.garbage.new);
        done();
    });

    describe('Method Save', function () {
        it('should be able to save without problems', function (done) {
            this.timeout(10000);
            return garbage.save(function (err, doc) {
                garbageId = doc._id;
                done();
            });
        });
    });

    afterEach(function (done) {
        Garbage.find({_id : garbageId}).remove().exec();
        done();
    });
});