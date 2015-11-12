'use strict';

/**
 * Module dependencies.
 */
var wifis = require('../controllers/wifi.server.controller.js');

module.exports = function (app) {
  // wifis collection routes
  app.route('/api/wifi')
      .get(wifis.list);

  // Single wifi routes
  app.route('/api/wifi/:wifiId')
      .get(wifis.read);

  // Finish by binding the wifi middleware
  app.param('wifiId', wifis.wifiByID);
};
