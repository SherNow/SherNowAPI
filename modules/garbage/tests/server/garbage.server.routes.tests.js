'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    Garbage = mongoose.model('Garbage'),
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
describe('Collect day CRUD tests', function () {

    before(function (done) {
        // Get application
        app = express.init(mongoose);
        agent = request.agent(app);

        done();
    });

    it('should be able to get a list of collect days', function (done) {

        // Request garbages
        request(app).get('/api/garbage')
            .end(function (req, res) {

                // Set assertion
                res.body.should.be.instanceof(Array).and.have.lengthOf(23);

                // Call the assertion callback
                done();
            });
    });

    it('should be able to get a single collect days', function (done) {
        // Create new garbage model instance
        request(app).get('/api/garbage/' + mock.garbage.postalCode.valid)
            .end(function (req, res) {
                // Set assertion
                res.body.should.be.instanceof(Object).and.have.property('collectDay', 'Mardi');

                // Call the assertion callback
                done();
            });
    });

    it('should return proper error for single collect daty with an invalid postal code', function (done) {
        // test is not a valid mongoose Id
        request(app).get('/api/garbage/test')
            .end(function (req, res) {
                // Set assertion
                res.body.should.be.instanceof(Object).and.have.property('collectDay', 'Code postal erroné');

                // Call the assertion callback
                done();
            });
    });

    it('should return proper error for single collect day which doesnt exist', function (done) {
        // This is a valid mongoose Id but a non-existent garbage
        request(app).get('/api/garbage/' + mock.garbage.postalCode.invalid)
            .end(function (req, res) {
                // Set assertion
                res.body.should.be.instanceof(Object).and.have.property('collectDay', 'Code postal erroné');

                // Call the assertion callback
                done();
            });
    });

});