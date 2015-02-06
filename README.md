
# Reliably initialize `Meteor.settings`

On the server (preferably) or the client, call `MeteorSettings.setDefaults(defaultSettings)` to populate the `Meteor.settings` object with sensible defaults. If you do this in all the source files where you access `Meteor.settings`, this will ensure your app does not crash when accessing a setting, or avoid duplicating the code that checks if the settings are not empty.

If you can't provide sensible defaults for your user, and they forgot to specify the `settings.json` file, pass `MeteorSettings.REQUIRED` as the second argument.

Example:
```
MeteorSettings.setDefaults({
  public: {
    book: { title: "My Story" }
  }
});
```

Example:
```
// I can provide a title for you, but not an author or anything else!
MeteorSettings.setDefaults({
  public: {
    book: { title: "My Story" }
  }, MeteorSettings.REQUIRED
});
```

A basic `example` [app](http://github.com/ogourment/settings/blob/master/app/example.js) is provided.

Also look at the [tests](https://github.com/ogourment/settings/blob/master/src/settings_tests.js) to see how this works.

If you have questions, make sure to read the [official doc](http://docs.meteor.com/#/full/meteor_settings) first.

Feedback welcome! Please send me an email ogourment @ smarterportal.com, or create an issue.
