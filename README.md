![Never forget --settings.json again!](https://raw.githubusercontent.com/ogourment/settings/master/doc/server_crash_if_no_settings_json.gif)

[![Build Status](https://travis-ci.org/ogourment/settings.svg?branch=master)](https://travis-ci.org/ogourment/settings)

# Reliably initialize `Meteor.settings`

This package provides a `MeteorSettings` object with only one function: `setDefaults`. This function works on the client or server.

## Installation
```bash
meteor add ogourment:settings
```

## Provide sensible defaults

Call `MeteorSettings.setDefaults(defaultSettings)` to populate the `Meteor.settings` object with sensible defaults for your app. If you do this in all the source files where you access `Meteor.settings`, this will ensure your app does not crash when accessing a setting, or avoid duplicating the code that checks if the settings are not empty.
You should set the defaults for the settings used in the `.js` file for better modularity. You may call `setDefaults` as many times as you like.

Example:
```javascript
MeteorSettings.setDefaults({
  public: {
    book: { title: "My Story" }
  }
});
...
// code that uses `Meteor.settings.public.book.title`
```

## Alert the user when they forgot to provide settings

Sometimes, there are no sensible defaults. In that case, you want to alert the developer when he forgot to provide a `settings.json` file. This usually only makes sense on the server. In this case, pass `MeteorSettings.REQUIRED` as the second argument. A `Meteor.Error` will be thrown and the server will crash (nicely).

Example:
```javascript
// I can provide a title for you, but not an author or anything else!
MeteorSettings.setDefaults({
  public: {
    book: { title: "My Story" }
  }
}, MeteorSettings.REQUIRED);
```
...will result in:
![settings-required Meteor.Error](./doc/settings-required-error-screenshot.png)


## Troubleshooting

1. Make sure to read the [official doc on Meteor.settings](http://docs.meteor.com/#/full/meteor_settings). Note: only `public` settings are passed to the client, and *only* those which were in the initial `settings.json` file (**Not** the ones passed as defaults- unfortunately).
1. A [detailed example](https://github.com/ogourment/settings/commit/36f120980b091e923a94708c084d05cae79c23b7) is provided.
1. Look at the [tests](https://github.com/ogourment/settings/blob/master/src/settings_tests.js) to see what is supported.

Feedback welcome! Please send me an email ogourment @ smarterportal.com, or create an issue.

Thanks to [Sam](https://github.com/samhatoum) for the idea.
