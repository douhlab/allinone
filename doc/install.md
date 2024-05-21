## Installation

### Dev Setup

In order to be able to start the component locally, you should install node version manager (nvm) or asdf. Using one of
thoses tools, you will be able to easily switch between node versions. Next install latest NodeJS version 20.x and also
latest npm version. After that, install angular cli. Refer to the following link about how to download
tools: https://angular.io/cli


### Setting up allinone local environment

There are several good IDEs to use for angular applications, so use any IDE you are comfortable with:

-   IntelliJ IDEA
-   VS Code
-   JetBrains Web Storm

With Intellij, most of the configuration is done automatically for Angular. One nice plugin that could be useful and not
installed by default is
the [Atom Material Icons plugin](https://plugins.jetbrains.com/plugin/10044-atom-material-icons).

#### Clone allinone Git repo

```bash
git clone git@github.com:haythamdouaihy/allinone.git
```

#### Install allinone npm dependencies

From allinone root folder, run

```bash
npm ci
```

You might need to add `--legacy-peer-deps`, depending on the state of the npm
dependency tree.

Why not `npm install` ? The `install parameter` resolves dependencies based on the semver ranges specified in the
package.json file. It updates the package-lock.json and package.json files when installing the dependencies.

On the other hand, `npm ci` is primarily used in CI/CD environments or automated build processes. It installs
dependencies solely based on the lock file and ensures a clean and reproducible installation without performing any
updates or modifications. It is faster than npm install as it skips dependency resolution based on semver ranges and
directly installs the exact versions specified in the lock file.

#### Launch allinone on dev web server

From allinone root folder, run

```bash
npm start
```

It will launch the command corresponding to the `start` property of package.json file, which is `ng serve --open`. Since
we have installed angular-cli globally, you could also run `ng serve --open` command directly form
the command line.

`ng serve` will build allinone and start a local web server on port 4200 ( NG Live Development Server. ) The --open flag
automatically opens a web browser on allinone homepage when the server is running. Any modification of the source code will
automatically launch a redeployment and the browser will also automatically refresh.

> Note: running `npm start` will automatically run `npm run prestart`, as per
> the [npm documentation](https://docs.npmjs.com/cli/v9/using-npm/scripts?v=true#npm-start), which will set up git
> hooks.
> There [is a hook](../tools/git-hooks/commit-msg) for automatically add the ticket number to the commit message,
> and [another one](../tools/git-hooks/pre-commit) to reformat the files before commit.
>
> You can use the `no-verify` flag to skip those.
