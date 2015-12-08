'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    Wifi = mongoose.model('Wifi'),
    path = require('path'),
    config = require(path.resolve('./config/config')),
    mock = require('../../../../mocks/api_mock.js'),
    express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent;

/**
 * Article routes tests
 */
describe('Wifi CRUD tests', function () {

    before(function (done) {
        // Get application
        app = express.init(mongoose);
        agent = request.agent(app);

        done();
    });

    it('should be able to get a list of wifis access points', function (done) {

        // Request wifis
        request(app).get('/api/wifi')
            .end(function (req, res) {

                // Set assertion
                res.body.should.be.instanceof(Array).and.have.lengthOf(204);

                // Call the assertion callback
                done();
            });
    });

    it('should be able to get a single wifi access point', function (done) {
        // Create new wifi model instance
        request(app).get('/api/wifi/' + mock.wifi.valid._id)
            .end(function (req, res) {
                // Set assertion
                res.body.should.be.instanceof(Object).and.have.property('_id', mock.wifi.valid._id);

                // Call the assertion callback
                done();
            });
    });

    it('should return proper error for single wifi with an invalid Id', function (done) {
        // test is not a valid mongoose Id
        request(app).get('/api/wifi/test')
            .end(function (req, res) {
                // Set assertion
                res.body.should.be.instanceof(Object).and.have.property('message', 'Wifi is invalid');

                // Call the assertion callback
                done();
            });
    });

    it('should return proper error for single wifi which doesnt exist', function (done) {
        // This is a valid mongoose Id but a non-existent wifi
        request(app).get('/api/wifi/559e9cd815f80b4c256a8f41')
            .end(function (req, res) {
                // Set assertion
                res.body.should.be.instanceof(Object).and.have.property('message', 'No wifi with that identifier has been found');

                // Call the assertion callback
                done();
            });
    });

});