'use strict';

/**
 * sku service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sku.sku');
