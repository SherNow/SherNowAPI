'use strict';

/**
 * Module dependencies.
 */
var restaurants = require('../controllers/restaurant.server.controller.js');

module.exports = function (app) {
  // restaurants collection routes
  app.route('/api/restaurant')
      .get(restaurants.list);

};
