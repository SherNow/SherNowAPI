'use strict';

/**
 * Module dependencies.
 */
var events = require('../controllers/event.server.controller.js');

module.exports = function (app) {
  // events collection routes
  app.route('/api/event')
      .get(events.list);

  // Single event routes
  app.route('/api/event/:eventId')
      .get(events.read);

  // Finish by binding the event middleware
  app.param('eventId', events.eventByID);
};
