'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Parking = mongoose.model('Parking'),
    mock = require('../../../../mocks/api_mock.js');

/**
 * Globals
 */
var wifi, wifiId;

/**
 * Unit tests
 */
describe('Parking Model Unit Tests:', function () {

    beforeEach(function (done) {
        wifi = new Parking(mock.wifi.new);
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
        Parking.find({_id : wifiId}).remove().exec();
        done();
    });
});