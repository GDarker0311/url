# deprecated

use [polyfill](https://github.com/inexorabletash/polyfill/blob/master/url.js) instead

see [webshim](https://afarkas.github.io/webshim/demos/#url)

# url

js url parser

# demo

[demo](http://vivaxy.github.io/url/demo/)

# usage

```js
// parse some link
var url = new URL(link);

// parse current location link
var rul = new URL();
```

# methods

```
// get all query strings
url.parameter(); => {...}

// set query strings
url.parameter({...}); => `Url`

// get query string by name
url.parameter(key); => `string`

// set query string by name, and update url properties
url.parameter(key, value); => `Url`

// remove query string by name
url.removeParameter(key); => `Url`

// to string, returns url.href
url.toString(); => `string`

// get property
url.get(property); => `string`

// set property
url.set(property, value); => `Url`
```

## get and set properties

```
// href: fill link, like `https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2014&month=6#some`
href

// protocol: like `https:`
protocol

// host: hostname + ':' + port, like `www.test.com:8080`
host

// hostname: like `www.test.com`
hostname

// port: like `8080`
port

// pathname: full path from some host, like `/vivaxy/test/url`
pathname

// search: queryString, like `?name=vivaxy&year=2014&month=6`
search

// path: pathname + search, like `/vivaxy/test/url?name=vivaxy&year=2014&month=6`
path

// query: search without `?`, like `name=vivaxy&year=2014&month=6`
query

// hash: like `#some`
hash
```

# develop

1. npm i

2. npm run build

run debug server `> npm run server`

# changelog

1.0.0 support [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)
