# URLs Checker

Get all urls from a page, then check whether all the urls is working or not.

## Getting started

```sh
npm install urls-checker
```

## Usage

```javascript
const urlsChecker = require('../index');

urlsChecker('example.com')
    .then(res => {
        console.log(res);
    }).catch(err => console.log(err));
```

The result is an object of ok, fail and error urls

```sh
{
    ok: ['list-of-working-urls'], // status code: 200
    fail: [['url', 'status-code'], [...]], // status code will not be 200
    error: ['list-of-error-urls'],
}
```

## Contributions

This project is based on [urls-checker](https://github.com/dalenguyen/urls-checker), feel free to report bugs and make feature requests in the [Issue Tracker](https://github.com/dalenguyen/urls-checker/issues), fork and create pull requests!