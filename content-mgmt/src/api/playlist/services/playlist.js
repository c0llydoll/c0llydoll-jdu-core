'use strict';

/**
 * playlist service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::playlist.playlist');
