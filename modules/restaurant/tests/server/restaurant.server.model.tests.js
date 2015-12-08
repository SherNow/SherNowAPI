'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Restaurant = mongoose.model('Restaurant'),
    mock = require('../../../../mocks/api_mock.js');

/**
 * Globals
 */
var wifi, wifiId;

/**
 * Unit tests
 */
describe('Restaurant Model Unit Tests:', function () {

    beforeEach(function (done) {
        wifi = new Restaurant(mock.wifi.new);
        done();
    });

    describe('Method Save', function () {
        it('should be able to save without problems', function (done) {
            this.timeout(10000);
            return wifi.save(function (err, doc) {
                wifiId = doc._id;
                done();
            });
        });
    });

    afterEach(function (done) {
        Restaurant.find({_id : wifiId}).remove().exec();
        done();
    });
});