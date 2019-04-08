# Badges you can use

local-badges simply provides a tool that generates badges from a configuration file. local-badges does not include any specific badge configurations. Instead, I believe badges should be kept in seperate repositories/projects. Below you will find a list of badge configurations that work with local-badges. You can use any of the badges below by doing something like:

```js
// badgeConfig.js
const someBuildBadge = require('some-build-badge-config') // this doesnt actually exist
const someCoverageBadge = require('some-coverage-badge-config') // this doesnt exist either

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
  ]
}
```

## Adding your badge to the list

I would love to see your custom badge configuration be added to the list below. All you need to do is make a seperate repository and/or npm package and put your badge configuration there. Your module should export a single badge object, not a list of badges. As long as your badge works with the current version of local-badges, and isn't offensive, I will add it to the list. Once you have made your badge, make an [issue](https://github.com/nikita-skobov/local-badges/issues) and label is as *`BADGE-CONFIG`*

## Available Badges in no specific order (last updated 4/8/2019)

Oops! No badges yet. I'm working on making a build-status badge, and a code-coverage badge. This will be updated in a few days.