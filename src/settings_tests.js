// Run with `example> meteor test-packages` and open `localhost:3000`

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

var date0 = new Date();

var settings0 = {
  public : {
    boolean_true: true,
    boolean_false: false,
    date: date0,
    string: "string",
    array: ["1", "2"]
  }
};

Tinytest.add("Merge various types with empty defaults", function (test) {

  Meteor.settings = _.clone( settings0 );

  MeteorSettings.setDefaults( {} );

  test.equal( Meteor.settings, settings0 );
});

Tinytest.add("Merge empty with various defaults types", function (test) {

  Meteor.settings = {};

  var defaults = _.clone( settings0 );

  MeteorSettings.setDefaults( defaults );

  test.equal( Meteor.settings, settings0 );
});

Tinytest.add("Merge various defaults types, same keys and defaults", function (test) {

  Meteor.settings = _.clone( settings0 );

  var defaults = _.clone( settings0 );

  MeteorSettings.setDefaults( defaults );

  test.equal( Meteor.settings, settings0 );
});

var date1 = date0 + 1;

var settings1 = {
  public : {
    boolean_true: false,
    boolean_false: true,
    date: date1,
    string: "string",
    array: ["1", "2"]
  }
};

Tinytest.add("Merge various defaults types, same keys, different defaults", function (test) {

  Meteor.settings = _.clone( settings0 );

  var defaults = _.clone( settings1 );

  MeteorSettings.setDefaults( defaults );

  test.equal( Meteor.settings, settings0 );
});

Tinytest.add("Merge circular defaults", function (test) {

  Meteor.settings = {};

  var defaults = {
    prop1: {}
  };
  defaults.prop1.prop2 = defaults;

  test.throws(
    function () {
      MeteorSettings.setDefaults( defaults );
    },
    'circular-defaults'
  )
});
