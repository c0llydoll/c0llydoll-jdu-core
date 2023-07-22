'use strict';

/**
 * package service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::package.package');
