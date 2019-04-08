# Contributing to local-badges

Thank you for considering contributing to local-badges.

The following document should outline the process of contributing to this project, whether you are adding features, filing bug reports, or improving documentation.

How you can contribute:
  * [Reporting Bugs](#reporting-bugs)
  * [Suggesting Enhancements](#suggesting-enhancements)
  * [Pull Requests](#pull-requests)
  * [Improving Documentation](#improving-documentation)
  * [Making Specific Badge Configurations](#adding-badge-configurations)


## Reporting Bugs

If you have found a bug to report, first check if the issue [has already been reported](https://github.com/nikita-skobov/local-badges/issues)

Next, fill out [the bug report](ISSUE_TEMPLATE.md) template and submit your issue with as many details as possible including your operating system, your shell (if using something other than the default terminal), version of local-badges, version of node, version of npm, etc. (all of which is included in the template). If you find your issue has already been mentioned on [the issues page](https://github.com/nikita-skobov/local-badges/issues) but it is tagged as closed, feel free to open a new issue, and include the link to the closed issue somewhere in the additional information section.

## Suggesting Enhancements

Suggestions are welcome. However, there are a couple things that I do NOT want to change about local-badges:

* Adding specific badge modules
  * there are some example configuration files showing how one might make a code-coverage badge, or a build-status badge. These are not intended to be part of the npm package, nor will they be added to the core code base. They are simply there as an example. The point of this project is to make badges easily from a configuration file. I do not want this project to include hundreds of badge configuration files of the many different badges that people come up with. INSTEAD, you can make a seperate repo, or npm package with your badge configuration, and I will be more than happy to add a link to your badge configuration in the [available badge configurations file](BADGE_CONFIGURATIONS.md)
* Adding more command line arguments
  * as of 4/8/2019, there is only one command line argument that local-badges looks for: --config. which is the path to a configuration file. All other command line arguments that are entered get passed to the users badge generating function so the user can use whatever arguments make sense to them. By adding more command line arguments, we limit the customizability of the command line tool. Maybe in the future, a need for more command line arguments will arise (maybe for log level, or outputting the svg to console or something), but until the project grows to that size, I think config should be the only command line argument.
* Adding more dependencies
  * I want this project to have as few dependencies as possible. Currently there is one: gh-badges, which is the project that actually generates the badges. In the future I'd like to incorporate the core functionality of gh-badges directly into this repo, and remove it as a dependency. But until then, I believe gh-badges should be the only dependency.

If your suggestion/enhancement is not one of the above, please fill out the [suggestion template](ISSUE_TEMPLATE.md) from the issue template file, and make sure to label it *`ENHANCEMENT`* when you post the issue.

If you strongly disagree with one of the items above, and have good reason for doing so, go ahead and post an issue anyway and explain your reasoning. I'm open to change as long as there's a good reason.


## Pull Requests

The general process for submitting pull requests should be as follows:

1. If you are making a big change to the code, please post an issue first. I would hate for you to spend time on something that won't be approved. If I don't respond quickly enough for some reason, feel free to make your pull request without prior approval.
2. Once approved (or if you are making minor changes), start by making a fork, clone YOUR fork, and make a seperate branch with the name of your desired feature/fix/improvement.
3. Before submitting the pull request, your code must pass two checks:
  - eslint checks.
    - I have a specific eslint configuration that I am fond of, and want to adhere to. Check if your code passes the linting rules by running this command while in the root of this repository:
    - `./node_modules/eslint/bin/eslint.js .`
    - alternatively, if you have eslint installed globally you can just do: `eslint .`
    - which will check all .js files in the repository against my linting configuration.
    - the desired output is nothing. It will just exit if everything is good. Otherwise you will get output telling you which files and lines to fix.
    - If you disagree with the linting rules, please file an issue.
  - jest tests.
    - simply running `npm run test` will run all tests and tell you which (if any) tests failed. Go back and fix any of your code that caused the tests to fail.
    - I highly reccommend running the tests prior to starting to make any changes to ensure that all tests are passing. If for some reason they fail, please file a bug report.
    - If your code modifies the behavior of some of the existing functions, which causes the tests to fail, but you believe your functionality is more important, feel free to rewrite those tests adequately, and include in the pull request template that you have modified existing tests.
4. If you have passed the checks mentioned above, proceed to [fill out the pull request template](PULL_REQUEST_TEMPLATE.md) and then post the pull request on github.


## Improving Documentation

I'm bad at writing documentation. If you want to make a pull request that adds, or improves documentation, feel free to do so without posting an issue first. I am fairly confident that your documentation will be better than mine, and I will likely approve it. That being said, my point in the [pull requests](#pull-requests) still stands: If you are making a **drastic** change in your pull request, please leave an issue first, as I would hate for you to spend time on something that won't be approved. If you are going to leave an issue, use the [suggestion template](ISSUE_TEMPLATE.md)


## Adding Badge Configurations

Maybe you saw some example badge configurations in this repository, and you are thinking of adding your own here. I would love to see your badge configuration, but just not in this repository. This project is for creating badges from a customizable configuration. I want to avoid having a bunch of opinionated badge configurations directly in this repository. Instead, please feel free to make your own repository, and/or npm package of your desired badge configuration, and then file an issue and use the [badge config template](ISSUE_TEMPLATE.md) from the issue template file. Make sure to label it as: *BADGE-CONFIG*. As long as your badge config works with the current version of local-badges, and isn't offensive, I will add a link to your badge in the [available badge configurations file](BADGE_CONFIGURATIONS.md) for other users to use in their badge configurations.
