## Available Badges in no specific order (last updated 4/9/2019)

### Build Status badges

* [buildStatus badge from nikitas-badges](https://www.npmjs.com/package/nikitas-badges#buildstatus)
  * [![](https://raw.githubusercontent.com/nikita-skobov/nikitas-badges/8c09a3e5e7ff800c5ce00c38d96beab97a2ff36d/examples/buildStatus/passing.svg?sanitize=true)](https://raw.githubusercontent.com/nikita-skobov/nikitas-badges/8c09a3e5e7ff800c5ce00c38d96beab97a2ff36d/examples/buildStatus/passing.svg?sanitize=true)
  * [![](https://raw.githubusercontent.com/nikita-skobov/nikitas-badges/master/examples/buildStatus/failing.svg?sanitize=true)](https://raw.githubusercontent.com/nikita-skobov/nikitas-badges/master/examples/buildStatus/failing.svg?sanitize=true)

### Code Coverage badges

* [cloverCoverage badge from nikitas-badges](https://www.npmjs.com/package/nikitas-badges#clovercoverage)
  * [![](https://raw.githubusercontent.com/nikita-skobov/nikitas-badges/master/examples/cloverCoverage/coverage-high.svg?sanitize=true)](https://raw.githubusercontent.com/nikita-skobov/nikitas-badges/master/examples/cloverCoverage/coverage-high.svg?sanitize=true)
  * [![](https://raw.githubusercontent.com/nikita-skobov/nikitas-badges/master/examples/cloverCoverage/coverage-medium.svg?sanitize=true)](https://raw.githubusercontent.com/nikita-skobov/nikitas-badges/master/examples/cloverCoverage/coverage-medium.svg?sanitize=true)
  * [![](https://raw.githubusercontent.com/nikita-skobov/nikitas-badges/master/examples/cloverCoverage/coverage-low.svg?sanitize=true)](https://raw.githubusercontent.com/nikita-skobov/nikitas-badges/master/examples/cloverCoverage/coverage-low.svg?sanitize=true)



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

I would love to see your custom badge configuration be added to the list above. All you need to do is make a seperate repository and/or npm package and put your badge configuration there. Your module should look something like this:
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
