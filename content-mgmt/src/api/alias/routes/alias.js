'use strict';

/**
 * alias router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::alias.alias');
