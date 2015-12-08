'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    Parking = mongoose.model('Parking'),
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
describe('Parking CRUD tests', function () {

    before(function (done) {
        // Get application
        app = express.init(mongoose);
        agent = request.agent(app);

        done();
    });

    it('should be able to get a list of parkings', function (done) {

        // Request parkings
        request(app).get('/api/parking')
            .end(function (req, res) {

                // Set assertion
                res.body.should.be.instanceof(Array).and.have.lengthOf(10);

                // Call the assertion callback
                done();
            });
    });

});