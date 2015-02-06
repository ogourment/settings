
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

  var simpleDefaults = { public: 1 };

  MeteorSettings.setDefaults( simpleDefaults );

  test.equal( Meteor.settings, simpleDefaults );
});

Tinytest.add("Simple defaults, empty Meteor.settings", function (test) {

  Meteor.settings = {};

  var simpleDefaults = { public: 1 };

  MeteorSettings.setDefaults( simpleDefaults );

  test.equal( Meteor.settings, simpleDefaults );
});

Tinytest.add("Defaults to merge", function (test) {

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
