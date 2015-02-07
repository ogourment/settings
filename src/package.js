
Package.describe({
  name: 'ogourment:settings',
  summary: 'Reliably initialize Meteor.settings.',
  version: '0.0.2',
  git: 'https://github.com/ogourment/settings.git'
});

Package.on_use(function (api) {

  api.use('underscore@1.0.0');

  api.addFiles('settings.js');

  api.export('MeteorSettings');
});

Package.onTest(function (api) {

  api.use('ogourment:settings');
  api.use('tinytest');

  api.addFiles('settings_tests.js');
});
