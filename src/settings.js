
MeteorSettings = { REQUIRED: 1, REQUIRED_IN_PROD: 2 };

_.extend( MeteorSettings, {

  setDefaults: function (defaultsMap, options) {

     var settingsRequired =
      (options === MeteorSettings.REQUIRED);

     if (Meteor.isServer) {

       settingsRequired |=
        (process.env.NODE_ENV === "production" &&
          options === MeteorSettings.REQUIRED_IN_PROD);
     }

     if (settingsRequired) {

      if (! Meteor.settings /* undefined on client */ ||
          _.size(Meteor.settings) === 0 /* empty on server */ ) {

        throw new Error("--settings or METEOR_SETTINGS required.");
        // Note: it might also be the case that `settings.json` is empty... but it's unlikely.
      }
    }

    Meteor.settings = Meteor.settings || {};
    Meteor.settings.public = Meteor.settings.public || {};

    _deepDefaults(Meteor.settings, defaultsMap);
  }
});

var _nodes;

var _deepDefaults = function (settings, map) {
  _nodes = [];
  return __deepDefaults(settings, map);
};

var __deepDefaults = function (settings, node) {

  _.each(node, function (node, key) {

    // deep defaults
    var isArray = (node.constructor === Array);
    if ((node instanceof Object) &&
      ! (node instanceof Date || isArray)) {

      // watch for circular reference
      if (_.indexOf(_nodes, node) >= 0) {
        throw new Error("Circular reference found at: " + key + ":" + node);
      }
      _nodes.push(node);

      settings[key] = settings[key] || {};

      __deepDefaults(settings[key], node);
    }
    else {
      // if the value at key is undefined use the default node passed in
      if (_.isUndefined(settings[key]))
        settings[key] = node;
      else
        settings[key] = settings[key];
    }
  });
};
