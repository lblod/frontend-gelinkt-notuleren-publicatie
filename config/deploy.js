'use strict';

module.exports = function(deployTarget) {
  //see https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/issues/52
  process.env.GIT_DISCOVERY_ACROSS_FILESYSTEM=1;

  let ENV = {
    build: {
      environment: 'production'
    },
    'ssh-index': {
      username: 'root',
      host: 'rpio-dev.s.redpencil.io',
      remoteDir: '/data/app-gn-publicatie-dev/publicatie-app',
      agent: process.env.SSH_AUTH_SOCK,
      port: 22,
      allowOverwrite: true
    },
    'rsync': {
      dest: '/data/app-gn-publicatie-dev/publicatie-app',
      username: 'root',
      host: 'rpio-dev.s.redpencil.io',
      port: 22,
      delete: false,
      privateKey: process.env.SSH_AUTH_SOCK,
      arg:['--verbose']
    }
  };

  if (deployTarget === 'production') {
    // Add production only config here
  }

  return ENV;
};
