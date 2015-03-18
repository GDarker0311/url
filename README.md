# url

js url parser

## example

[here](http://vivaxy.github.io/url/example/)

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
url.parameter(key);

// set query string by name, and update url properties
url.parameter(key, value);

// remove query string by name
url.removeParameter(key);

// to string, returns url.href
url.toString();

// get property
url.get(property);

// set property
url.set(property, value);
```

## get and set properties

```js
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