
MeteorSettings = { REQUIRED: 1 };

_.extend( MeteorSettings, {

  setDefaults: function (defaultsMap, options) {

    if (options === MeteorSettings.REQUIRED) {

      if (! Meteor.settings /* undefined on client */ ||
          _.size(Meteor.settings) === 0 /* empty on server */ ) {

        throw new Meteor.Error("settings-required", "--settings or METEOR_SETTINGS required.");
      }
    }

    if (! Meteor.settings) Meteor.settings = {};

    // The defaults settings is not fully recursive, but
    // should satisfy for most settings usage patterns.
    // (underscore does not support deep/recursive copy.)

    if (! Meteor.settings.public) Meteor.settings.public = {}

    if ( defaultsMap.public ) {
      _.defaults( Meteor.settings.public, defaultsMap.public );
    }

    _.defaults( Meteor.settings, defaultsMap );
  }
});
