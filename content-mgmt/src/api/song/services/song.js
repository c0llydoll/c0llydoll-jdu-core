'use strict';

/**
 * song service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::song.song');
