'use strict';

/**
 * package controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::package.package');
