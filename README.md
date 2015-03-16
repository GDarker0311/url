# url

js url parser

## usage

```js
// parse some link
var url = new Url(link);

// parse current location link
var url = new Url();
```

## methods

```js
// get query string by name
url.queryString(key);

// set query string by name, and update url properties
url.queryString(key, value);
```

## properties

```js
// href: fill link, like `https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2014&month=6#some`
url.href

// protocol: like `https:`
url.protocol

// host: hostname + ':' + port, like `www.test.com:8080`
url.host

// hostname: like `www.test.com`
url.hostname

// port: like `8080`
url.port

// pathname: full path from some host, like `/vivaxy/test/url`
url.pathname

// search: queryString, like `?name=vivaxy&year=2014&month=6`
url.search

// path: pathname + search, like `/vivaxy/test/url?name=vivaxy&year=2014&month=6`
url.path

// query: search without `?`, like `name=vivaxy&year=2014&month=6`
url.query

// hash: like `#some`
url.hash
```