'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'frontend-gelinkt-notuleren-publicatie',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },
    environmentName: "{{ENVIRONMENT_NAME}}",
    fastboot: {
      hostWhitelist: [/^localhost:\d+$/,
                      "localhost",
                      "publicatie.gelinkt-notuleren.vlaanderen.be",
                      "publicatie.dev.gelinkt-notuleren.lblod.info",
                      "publicatie.gelinkt-notuleren.lblod.info",
                      "backend" //mu-semtech
                     ]
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    moment: {
      outputFormat: 'DD-MM-YYYY hh:mm:ss',
      includeTimezone: 'all',
      includeLocales: ['nl'],
      allowEmpty: true
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
