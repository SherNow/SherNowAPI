'use strict';

/**
 * Module dependencies.
 */
var garbages = require('../controllers/garbage.server.controller.js');

module.exports = function (app) {
  // garbages collection routes
  app.route('/api/garbage')
      .get(garbages.list);

  // Single garbage routes
  app.route('/api/garbage/:postalCode')
      .get(garbages.read);

  // Finish by binding the garbage middleware
  app.param('postalCode', garbages.garbageByPostalCode);
};
