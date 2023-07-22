'use strict';

/**
 * alias controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::alias.alias');
