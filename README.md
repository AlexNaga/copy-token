# copy-token

A puppeteer script for copying a token to your clipboard.

### Features

* Automatically login and copy your token to your clipboard.
* Possibility to login in either test or prod environment.

#### ToDo

* Support for multiple accounts in one environment.

### How to run?

To install the dependencies run:

``` sh
$ npm i
```

After install, change the example values in both `.env.test` and `.env.prod`

#### Link the script globally

By linking it globally, it's possible to run command `copytoken` in the terminal.

``` sh
# npm link
```

#### How to remove globally?

``` sh
# npm unlink copytoken
```

#### Test environment

To get token from test environment run:

``` sh
$ copytoken
```

#### Prod environment

To get token from prod environment run:

``` sh
$ copytoken prod
```
