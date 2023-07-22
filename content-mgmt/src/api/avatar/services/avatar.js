'use strict';

/**
 * avatar service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::avatar.avatar');
