'use strict';

/**
 * boss router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::boss.boss');
