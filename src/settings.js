
_.mergeDefaults = Npm.require('merge-defaults');

MeteorSettings = { REQUIRED: 1 };

_.extend( MeteorSettings, {

  setDefaults: function (defaultsMap, options) {

    if (options === MeteorSettings.REQUIRED) {

      if (! Meteor.settings) {

        throw new Meteor.Error("settings-required", "--settings or METEOR_SETTINGS required.");
      }
    }

    if (! Meteor.settings) Meteor.settings = {};

    _.mergeDefaults(Meteor.settings, defaultsMap);
  }
});
