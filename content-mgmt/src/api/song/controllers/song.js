'use strict';

/**
 * song controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::song.song');
