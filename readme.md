# URLs / Images Checker
[![npm version](https://badge.fury.io/js/urls-checker.svg)](https://badge.fury.io/js/urls-checker)[![Build Status](https://travis-ci.org/dalenguyen/urls-checker.svg?branch=master)](https://travis-ci.org/dalenguyen/urls-checker)

Get all urls from a page - including images, then check whether all the urls is working or not.

## Getting started

```sh
npm install urls-checker
```

## Usage for Links

```javascript
const { urlsChecker } = require('urls-checker');

urlsChecker('https://example.com') // http / https is important
    .then(res => {
        console.log(res);
    })
    .catch(err => console.log(err));
```

The result is an object of ok, fail and error urls

```sh
{
    ok: ['list-of-working-urls'],           // status code: 200
    fail: [['url', 'status-code'], [...]],  // status code will not be 200
    error: [['url', 'message'], [...]],          // Could be certificate / authenticate error
}
```

## Usage for Images

This method may not get all of the images because of the asynchronous loading.

```javascript
const { imagesChecker } = require('urls-checker');

imagesChecker('https://example.com') // http / https is important
    .then(res => {
        console.log(res);
    })
    .catch(err => console.log(err));
```

The result is an object of ok, fail and error urls

```sh
{
    ok: ['list-of-working-urls'],           // status code: 200
    fail: [['url', 'status-code'], [...]],  // status code will not be 200
    error: [['url', 'message'], [...]],          // Could be certificate / authenticate error
}
```

## Urls Checker for the whole website

We could get all pages from sitemap.xml, then loops through all the links. You should have a sitemap.xml on your website for SEO purposes.

## Contributions

This project is based on [urls-checker](https://github.com/dalenguyen/urls-checker), feel free to report bugs and make feature requests in the [Issue Tracker](https://github.com/dalenguyen/urls-checker/issues), fork and create pull requests!