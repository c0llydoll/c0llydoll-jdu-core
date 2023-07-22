'use strict';

/**
 * quest service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::quest.quest');
