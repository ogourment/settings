
MeteorSettings = { REQUIRED: 1 };

_.extend( MeteorSettings, {

  setDefaults: function (defaultsMap, options) {

    if (options === MeteorSettings.REQUIRED) {

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

    // watch for circular reference
    if (_.indexOf(_nodes, node) >= 0) {
      throw new Error("Circular reference found at: " + key + ":" + node);
    }
    _nodes.push(node);

    // deep defaults
    var isArray = (node.constructor === Array);
    if ((node instanceof Object) &&
      ! (node instanceof Date || isArray)) {

      settings[key] = settings[key] || {};

      __deepDefaults(settings[key], node);
    }
    else {
      settings[key] = settings[key] || node;
    }
  });
};
