[![Actions Status](https://github.com/ImperialConflict/imperialconflict.com/workflows/main/badge.svg)](https://github.com/ImperialConflict/imperialconflict.com/actions)

# imperialconflict.com Website (imperialconflict.com)
Rule the Galaxy!

### Install the dependencies
Dependencies are managed with the [Yarn package manager](https://classic.yarnpkg.com/en/docs/install/#mac-stable).
You need to have a version of Yarn that is >= 1.21.1 installed on the host machine.

1. [Fork](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo) this repository
2. Clone and `cd` into your new fork.
3. Create a new branch from `master` with `git checkout -b someNewFeatureOrBugfixBranch`
4. Install packages by running `yarn` command.

### Commands
* `yarn start` build app for production and serve on `http://localhost:8080` *purpose is for startup on production server*
> IMPORTANT - you may get a browser prevention due to scrambled info when running serve on localhost.
> Turn on allow-insecure-localhost for chrome/brave, like: chrome://flags/#allow-insecure-localhost
* `yarn dev` compile and start the app in development mode (hot-code reloading, error reporting, etc.)
* `yarn build` build app for production
* `yarn lint` lint the files for warnings and errors (automatically run when you make a Pull Request)
* `yarn lint:fix` lint the files for warnings and errors and try to automatically fix
* `yarn test:e2e` open the UAT tool, Cypress, to select test files to run in the browser **Requires app to be running**
* `yarn test:e2e:ci` run the UAT tests in headless browser mode (automatically run when you make a Pull Request) **Requires app to be running**
> When running from your forked repository the Cypress Tests simply run, but when you create your Pull Request
> they will be run and video/screenshots recorded and sent to the cypress.io dashboard

### Contributing and Pull Requests
1. We *highly* encourage [short, concise git commit messages](https://chris.beams.io/posts/git-commit/).
2. Ensure any eslint (including warnings) and cypress tests pass locally before creating your Pull Request.
3. After Pull Request creation, your branch must pass the eslint and UAT tests that run automatically.
4. Your Pull Request must be approved by at least one contributor.
5. After the tests pass, and it has been approved, you may request one of the contributors to merge it for you.

> Longer Contributing document on how to offer feedback, our standards, responsibilities, code of conduct, and
>enforcement can be found in [contributing guidelines](/CONTRIBUTING.md)

### Test Environment
Development Front-End: [https://dev.imperialconflict.com/](https://dev.imperialconflict.com/)
API Docs [http://docs.imperialconflict.com/](http://docs.imperialconflict.com/)

## FAQ/issues
* For Windows 10 development environment I cannot get cypress to run!
> Answer: Try running `npx cypress install --force` which will reinstall cypress and then trying the normal UAT test command, `yarn test:e2e` while the app is already running.
* UAT tests are failing when I create my PR!
> Answer: Try checking the [Cypress.io Dashboard](https://dashboard.cypress.io/projects/befrjn/runs?branches=%5B%5D&committers=%5B%5D&flaky=%5B%5D&page=1&status=%5B%5D&tags=%5B%5D&timeRange=%7B%22startDate%22%3A%221970-01-01%22%2C%22endDate%22%3A%222038-01-19%22%7D) and viewing the screenshots or videos of the failing test to troubleshoot what went wrong.

## Licenses
Content is released under [GNU GPL v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html).
