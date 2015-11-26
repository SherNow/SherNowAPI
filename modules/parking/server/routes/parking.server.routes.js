'use strict';

/**
 * Module dependencies.
 */
var parkings = require('../controllers/parking.server.controller.js');

module.exports = function (app) {
  // parkings collection routes
  app.route('/api/parking')
      .get(parkings.list);
};
