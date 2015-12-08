'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    Events = mongoose.model('Events'),
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
describe('Events CRUD tests', function () {

    before(function (done) {
        // Get application
        app = express.init(mongoose);
        agent = request.agent(app);

        done();
    });

    it('should be able to get a list of events access points', function (done) {

        // Request events
        request(app).get('/api/event')
            .end(function (req, res) {

                // Set assertion
                res.body.should.be.instanceof(Array).and.have.lengthOf(35);

                // Call the assertion callback
                done();
            });
    });

    it('should be able to get a single event access point', function (done) {
        // Create new event model instance
        request(app).get('/api/event/' + mock.event.valid._id)
            .end(function (req, res) {
                // Set assertion
                res.body.should.be.instanceof(Object).and.have.property('_id', mock.event.valid._id);

                // Call the assertion callback
                done();
            });
    });

    it('should return proper error for single event with an invalid Id', function (done) {
        // test is not a valid mongoose Id
        request(app).get('/api/event/test')
            .end(function (req, res) {
                // Set assertion
                res.body.should.be.instanceof(Object).and.have.property('message', 'Event is invalid');

                // Call the assertion callback
                done();
            });
    });

    it('should return proper error for single event which doesnt exist', function (done) {
        // This is a valid mongoose Id but a non-existent event
        request(app).get('/api/event/905e1012bb877c1fabb1abf5')
            .end(function (req, res) {
                // Set assertion
                res.body.should.be.instanceof(Object).and.have.property('message', 'No event with that identifier has been found');

                // Call the assertion callback
                done();
            });
    });

});