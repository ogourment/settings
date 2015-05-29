
0.1.4 (2015-05-29)
---

- Added REQUIRED_IN_PROD option

0.1.3 (2015-03-29)
---

- Fixed: 'false' setting was overriden by 'true' default. Thanks to @adeubank

0.1.2 (2015-03-24)
---

- Fixed: Two different nodes with the same value caused a circular reference.

0.1.1 (2015-02-23)
---

- Package is now automatically published after successful tests in Travis-ci

0.1.0 (2015-02-08)
---

- Replaced `Meteor.Error` with `Error` as per [Style Guide](https://github.com/meteor/meteor/wiki/Meteor-Style-Guide#error-objects).

0.0.2 (2015-02-08)
---

- Handle Date and Arrays
- Added deep/recursive defaults setting:
  If `Meteor.settings = { a: { b: 1 } }`
  And `defaults = { a: { c: 2 } }`
  Then `Meteor.settings = { a: { b: 1, c: 2 } }`
- Throw `Meteor.Error('circular-defaults')` if a circular reference is detected.

0.0.1 (2015-02-07)
---

- I was born!
