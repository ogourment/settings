
1.0.0 (2015-02-08)
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
