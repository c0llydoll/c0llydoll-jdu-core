'use strict';

/**
 * boss service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::boss.boss');
