
if (Meteor.isClient) {

  MeteorSettings.setDefaults({
    public: {
      initialCounter: 0,
      counterIncrement: 1,
      doIncrement: true
    }
  });

  Session.setDefault('counter', Meteor.settings.public.initialCounter);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      if (Meteor.settings.public.doIncrement) {
        // increment the counter when button is clicked
        Session.set('counter', Session.get('counter') +
        Meteor.settings.public.counterIncrement);
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // Uncomment if no sensible default settings can be provided:
    // MeteorSettings.setDefaults({}, MeteorSettings.REQUIRED);
  });
}
