
import contentTypeBuilder from '../../../node_modules/@strapi/plugin-content-type-builder/strapi-admin.js';
import email from '../../../node_modules/@strapi/plugin-email/strapi-admin.js';
import upload from '../../../node_modules/@strapi/plugin-upload/strapi-admin.js';
import fieldUuid from '../../../node_modules/@bn-digital/strapi-plugin-field-uuid/strapi-admin.js';
import contentVersioning from '../../../node_modules/@notum-cz/strapi-plugin-content-versioning/strapi-admin.js';
import calendar from '../../../node_modules/@offset-dev/strapi-calendar/strapi-admin.js';
import colorPicker from '../../../node_modules/@strapi/plugin-color-picker/strapi-admin.js';
import i18N from '../../../node_modules/@strapi/plugin-i18n/strapi-admin.js';
import usersPermissions from '../../../node_modules/@strapi/plugin-users-permissions/strapi-admin.js';
import scheduler from '../../../node_modules/@webbio/strapi-plugin-scheduler/strapi-admin.js';
import countrySelect from '../../../node_modules/strapi-plugin-country-select/strapi-admin.js';
import duplicateButton from '../../../node_modules/strapi-plugin-duplicate-button/strapi-admin.js';
import restCache from '../../../node_modules/strapi-plugin-rest-cache/strapi-admin.js';
import todo from '../../../node_modules/strapi-plugin-todo/strapi-admin.js';


const plugins = {
  'content-type-builder': contentTypeBuilder,
  'email': email,
  'upload': upload,
  'field-uuid': fieldUuid,
  'content-versioning': contentVersioning,
  'calendar': calendar,
  'color-picker': colorPicker,
  'i18n': i18N,
  'users-permissions': usersPermissions,
  'scheduler': scheduler,
  'country-select': countrySelect,
  'duplicate-button': duplicateButton,
  'rest-cache': restCache,
  'todo': todo,
};

export default plugins;
