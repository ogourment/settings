
var _expectRequiredException = function(test, defaultsMap) {

  test.throws(
    function () {
      MeteorSettings.setDefaults( defaultsMap, MeteorSettings.REQUIRED );
    },
    'settings-required'
  )
}

Tinytest.add("Not required, no Meteor.settings", function (test) {

  Meteor.settings = null;

  MeteorSettings.setDefaults( {} );
});

Tinytest.add("Required, no Meteor.settings", function (test) {

  Meteor.settings = null;

  _expectRequiredException( test, {} );
});

Tinytest.add("Required, no Meteor.settings, with defaults", function (test) {

  Meteor.settings = null;

  _expectRequiredException( test, { public: 1 } );
});

Tinytest.add("Simple defaults, null Meteor.settings", function (test) {

  Meteor.settings = null;

  var simpleDefaults = { serverValue: 1 };

  MeteorSettings.setDefaults( simpleDefaults );

  var expected = { serverValue: 1, public: {} };

  test.equal( Meteor.settings, expected );
});

Tinytest.add("Simple defaults, empty Meteor.settings", function (test) {

  Meteor.settings = {};

  var simpleDefaults = { serverValue: 1 };

  MeteorSettings.setDefaults( simpleDefaults );

  var expected = { serverValue: 1, public: {} };

  test.equal( Meteor.settings, expected );
});

Tinytest.add("Simple public, null Meteor.settings", function (test) {

  Meteor.settings = null;

  var simpleDefaults = { public: { value: 1 } };

  MeteorSettings.setDefaults( simpleDefaults );

  test.equal( Meteor.settings, simpleDefaults );
});

Tinytest.add("Simple public, empty Meteor.settings", function (test) {

  Meteor.settings = {};

  var simpleDefaults = { public: { value: 1 } };

  MeteorSettings.setDefaults( simpleDefaults );

  test.equal( Meteor.settings, simpleDefaults );
});

Tinytest.add("Merge public with public", function (test) {

  Meteor.settings = { public: { value: 10 } };

  var defaults = {
    public: { value: 2, other: 3 }
  };

  MeteorSettings.setDefaults( defaults );

  var expected = {
    public: { value: 10, other: 3 }
  }

  test.equal( Meteor.settings, expected );
});

Tinytest.add("Merge public with different public", function (test) {

  Meteor.settings = { public: { value: 2 } };

  var defaults = {
    public: { other: 3 }
  };

  MeteorSettings.setDefaults( defaults );

  var expected = {
    public: { value: 2, other: 3 }
  }

  test.equal( Meteor.settings, expected );
});

Tinytest.add("Merge public with public and server", function (test) {

  Meteor.settings = { public: { value: 10 } };

  var defaults = {
    serverValue: 1,
    public: { value: 2, other: 3 }
  };

  MeteorSettings.setDefaults( defaults );

  var expected = {
    serverValue: 1,
    public: { value: 10, other: 3 }
  }

  test.equal( Meteor.settings, expected );
});

Tinytest.add("Merge empty settings with public", function (test) {

  Meteor.settings = { };

  var defaults = {
    public: { value: 2, other: 3 }
  };

  MeteorSettings.setDefaults( defaults );

  var expected = defaults;

  test.equal( Meteor.settings, expected );
});

Tinytest.add("Merge server with public", function (test) {

  Meteor.settings = { serverValue: 1 };

  var defaults = {
    public: { value: 2, other: 3 }
  };

  MeteorSettings.setDefaults( defaults );

  var expected = {
    serverValue: 1,
    public: { value: 2, other: 3 }
  }

  test.equal( Meteor.settings, expected );
});
