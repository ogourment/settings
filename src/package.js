
Package.describe({
  name: 'ogourment:settings',
  summary: 'Reliably initialize Meteor.settings.',
  version: '0.0.1',
  git: 'https://github.com/ogourment/settings.git'
});

Npm.depends({'merge-defaults':'0.2.1'});

Package.on_use(function (api) {

  api.use('underscore');

  api.addFiles('settings.js');

  api.export('MeteorSettings');
});

Package.onTest(function (api) {

  api.use('ogourment:settings');
  api.use('tinytest');

  api.addFiles('settings_tests.js');
});
