## Available Badges in no specific order (last updated 4/8/2019)

Oops! No badges yet. I'm working on making a build-status badge, and a code-coverage badge. This will be updated in a few days.


## How to use these badges

First find the badge, or badges above that you like. Then install them with npm, or git.
You can then include the badges in your badge config file by doing something like:

```js
// badgeConfig.js
const someBuildBadge = require('some-build-badge-config') // this doesnt actually exist
const { someCoverageBadge } = require('some-coverage-badge-config') // this doesnt exist either

module.exports = {
  badges: [
    someBuildBadge,
    someCoverageBadge,
    {
      // you can also include your own badges mixed in
      // with the badges you import
      name: 'some-badge',
      folder: './',
      text: ['some', 'badge'],
    },
  ],
  defaults: {
    template: 'popout-square',
  },
}
```

## Adding your badge to the list

I would love to see your custom badge configuration be added to the list below. All you need to do is make a seperate repository and/or npm package and put your badge configuration there. Your module should look something like this:
```js
module.exports = {
  colorA: '...',
  colorB: '...',
  fn: () => { /* ... */ },
  // the other badge properties, etc...
}
```
or something like this
```js
const myCustomBadge1 = {
  colorA: '...',
  colorB: '...',
  fn: () => { /* ... */ },
  // the other badge properties, etc.
}
const myCustomBadge2 = {
  colorA: '...',
  colorB: '...',
  fn: () => { /* ... */ },
  // the other badge properties, etc.
}

module.exports = {
  myCustomBadge1,
  myCustomBadge2,
}
```

But it should not export an entire configuration like [this](#how-to-use-these-badges). As long as your badge works with the current version of local-badges, and isn't offensive, I will add it to the list. Once you have made your badge, make an [issue](https://github.com/nikita-skobov/local-badges/issues) and use the [badge config issue template](ISSUE_TEMPLATE.md)