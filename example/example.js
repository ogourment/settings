if (Meteor.isClient) {

  Session.setDefault('counter', Meteor.settings.public.counterDefaultValue);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter')
        + Meteor.settings.public.counterIncrement);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    MeteorSettings.setDefaults({
      public: {
        counterDefaultValue: 0,
        counterIncrement: 10
      }
    });
  });
}
