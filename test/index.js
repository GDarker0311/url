(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @since 15-09-02 15:22
 * @author vivaxy
 */
'use strict';

/**
 * usage:
 *
 * // parse some link
 * var url = new Url(link);
 *
 * // parse current location link
 * var url = new Url();
 *
 * methods:
 *
 * // get query string by name
 * url.parameter(key);
 *
 * // set query string by name, and update url properties
 * url.parameter(key, value);
 *
 * // get all query string
 * url.parameter();
 *
 * // set all query string by kv pairs
 * url.parameter({});
 *
 * // remove query string by name
 * url.removeParameter(key);
 *
 * // to string, returns url.href
 * url.toString();
 *
 * // get property
 * url.get(property);
 *
 * // set property
 * url.set(property, value);
 *
 * get and set properties:
 *
 * // href: fill link, like `https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2014&month=6#some`
 * href
 *
 * // protocol: like `https:`
 * protocol
 *
 * // host: hostname + ':' + port, like `www.test.com:8080`
 * host
 *
 * // hostname: like `www.test.com`
 * hostname
 *
 * // port: like `8080`
 * port
 *
 * // pathname: full path from some host, like `/vivaxy/test/url`
 * pathname
 *
 * // search: queryString, like `?name=vivaxy&year=2014&month=6`
 * search
 *
 * // path: pathname + search, like `/vivaxy/test/url?name=vivaxy&year=2014&month=6`
 * path
 *
 * // query: search without `?`, like `name=vivaxy&year=2014&month=6`
 * query
 *
 * // hash: like `#some`
 * hash
 *
 */

/**
 *
 * @param href
 * @constructor
 */
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Url = (function () {
    function Url(href) {
        _classCallCheck(this, Url);

        this._href = href || location.href;
        this._parameters = {};
        this._parse();
        this._parseQuery();
        this._formatQuery();
    }

    /**
     * parse url string to url object, and save to Url
     * @returns {Url}
     * @private
     */

    _createClass(Url, [{
        key: '_parse',
        value: function _parse() {

            var a = document.createElement('a');
            a.href = this._href;

            this._protocol = a.protocol;
            this._host = a.host;
            this._hostname = a.hostname;
            this._port = a.port;
            this._pathname = a.pathname;
            this._search = a.search;
            this._hash = a.hash;

            if (this._host === '') {
                // fix ie cannot get url host, when _href has no host by default
                this._host = location.host;
            }

            if (this._protocol === '') {
                this._protocol = location.protocol;
            }

            if (this._pathname.split('')[0] !== '/') {
                this._pathname = '/' + this._pathname;
            }

            this._path = this._pathname + this._search;
            this._query = this._search.slice(1);

            return this;
        }

        /**
         * parse query string to query object, and save to _parameters
         * @returns {Url}
         * @private
         */
    }, {
        key: '_parseQuery',
        value: function _parseQuery() {

            var qs = this._query.split('&'),
                l = qs.length;

            for (var i = 0; i < l; i++) {
                var split = qs[i].split('=');
                if (split.length === 2) {
                    this._parameters[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
                }
            }

            return this;
        }

        /**
         * format parameters to query string, and update the url object
         * @returns {Url}
         * @private
         */
    }, {
        key: '_formatQuery',
        value: function _formatQuery() {
            var query = '',
                obj = this._parameters;
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    query += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]) + '&';
                }
            }
            query = query.slice(0, -1);
            this._query = query;
            if (query !== '') {
                this._search = '?' + query;
            }
            this._path = this._pathname + this._search;
            this._href = this._protocol + '//' + this._host + this._path + this._hash;

            return this;
        }

        /**
         * get or set some parameter in query string
         * url.parameter();                 => return all parameters in search string
         * url.parameter('key');            => return parameter by key
         * url.parameter('key', 'value');   => return url; set parameter `key` to `value`
         * url.parameter({key: 'value'});   => return url; set parameter `key` to `value`
         * @param key
         * @param [value]
         * @returns {*}
         */
    }, {
        key: 'parameter',
        value: function parameter(key, value) {
            switch (typeof key) {
                case 'undefined':
                    // get all parameter
                    return this._parameters;
                    break;
                case 'string':
                    if (value === undefined) {
                        // get parameter by key
                        return this._parameters[key];
                    } else {
                        // set parameter by key
                        this._parameters[key] = value;
                        this._formatQuery();
                        return this;
                    }
                case 'object':
                    // set object to parameter
                    for (var _key in key) {
                        if (key.hasOwnProperty(_key)) {
                            this._parameters[_key] = key[_key];
                        }
                    }
                    this._formatQuery();
                    return this;
                default:
                    throw new Error('Url: type of first argument is not `undefined`, `string` or `object`');
                    return this;
            }
        }

        /**
         * remove parameter in query string
         * @param key
         * @returns {Url}
         */
    }, {
        key: 'removeParameter',
        value: function removeParameter(key) {
            delete this._parameters[key];
            this._formatQuery();
            return this;
        }

        /**
         * to string
         * @returns {*|string}
         */
    }, {
        key: 'toString',
        value: function toString() {
            return this._href;
        }

        /**
         * get property
         * @param prop
         * @returns {*}
         */
    }, {
        key: 'get',
        value: function get(prop) {
            return this['_' + prop];
        }

        /**
         * set property
         * @param prop
         * @param value
         * @returns {Url}
         */
    }, {
        key: 'set',
        value: function set(prop, value) {

            this['_' + prop] = value;

            /**
             * href |- protocol
             *      |- host     |- hostname
             *      |           |- port
             *      |- path     |- pathname
             *      |           |- search    |- query |- parameters
             *      |- hash
             */
            switch (prop) {
                case 'parameters':
                    throw new Error('Url: use `parameter` instead');
                    break;
                case 'query':
                    this._path = this._pathname + (value === '' ? '' : '?' + this._query);
                    break;
                case 'search':
                    if (value === '' || value.indexOf('?') === 0) {
                        this._path = this._pathname + value;
                    } else {
                        throw new Error('Url: `search` must starts with `?`');
                    }
                    break;
                case 'pathname':
                    this._path = value + this._search;
                    break;
                case 'port':
                    this._host = this._hostname + (value === '' ? '' : ':' + value);
                    break;
                case 'hostname':
                    this._host = value + (this._port === '' ? '' : ':' + this._port);
                    break;
                case 'hash':
                    if (value !== '' && value.indexOf('#') !== 0) {
                        throw new Error('Url: `hash` must starts with `#`');
                    }
                    break;
                default:
                    throw new Error('Url: `' + prop + '` cannot be set to url');
                    break;
            }

            this._href = this._protocol + '//' + this._host + this._path + this._hash;
            this._parameters = {};
            this._parse();
            this._parseQuery();
            this._formatQuery();
            return this;
        }
    }]);

    return Url;
})();

exports['default'] = Url;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
/**
 * @since 15-08-13 11:38
 * @author vivaxy
 */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcUrlJs = require('../src/url.js');

var _srcUrlJs2 = _interopRequireDefault(_srcUrlJs);

var assert = chai.assert;

describe('new Url()', function () {
    it('should return link', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            urlLink = new _srcUrlJs2['default'](link);
        assert.equal(urlLink, link);
    });
    it('should return full link, when link is not complete', function () {
        var link = '/vivaxy/test/url?name=vivaxy&year=2015#some',
            urlLink = new _srcUrlJs2['default'](link).toString();
        assert.equal(urlLink, location.origin + link);
    });
    it('should return full link, when link is not complete', function () {
        var link = '?name=vivaxy&year=2015#some',
            urlLink = new _srcUrlJs2['default'](link).toString();
        assert.equal(urlLink, location.origin + location.pathname + link);
    });
    it('should return full link, when link is not complete', function () {
        var link = '#some',
            urlLink = new _srcUrlJs2['default'](link).toString();
        assert.equal(urlLink, location.origin + location.pathname + link);
    });
});

describe('.get(\'href\')', function () {
    it('should return href', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            href = new _srcUrlJs2['default'](link).get('href');
        assert.equal(href, link);
    });
    it('should return full href, when link is not complete', function () {
        var link = '/vivaxy/test/url?name=vivaxy&year=2015#some',
            urlLink = new _srcUrlJs2['default'](link).toString();
        assert.equal(urlLink, location.origin + link);
    });
    it('should return full href, when link is not complete', function () {
        var link = '?name=vivaxy&year=2015#some',
            urlLink = new _srcUrlJs2['default'](link).toString();
        assert.equal(urlLink, location.origin + location.pathname + link);
    });
    it('should return full href, when link is not complete', function () {
        var link = '#some',
            urlLink = new _srcUrlJs2['default'](link).toString();
        assert.equal(urlLink, location.origin + location.pathname + link);
    });
});

describe('.get(\'protocol\')', function () {
    it('should return protocol', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            protocol = new _srcUrlJs2['default'](link).get('protocol');
        assert.equal(protocol, 'https:');
    });
    it('should return protocol', function () {
        var link = 'http://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            protocol = new _srcUrlJs2['default'](link).get('protocol');
        assert.equal(protocol, 'http:');
    });
    it('should return current protocol, when protocol is not supplied', function () {
        var link = '//www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            protocol = new _srcUrlJs2['default'](link).get('protocol');
        assert.equal(protocol, location.protocol);
    });
    it('should return current protocol, when protocol is not supplied', function () {
        var link = '/vivaxy/test/url?name=vivaxy&year=2015#some',
            protocol = new _srcUrlJs2['default'](link).get('protocol');
        assert.equal(protocol, location.protocol);
    });
});

describe('.get(\'host\')', function () {
    it('should return host', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            host = new _srcUrlJs2['default'](link).get('host');
        assert.equal(host, 'www.test.com:8080');
    });
    it('should return host', function () {
        var link = 'https://www.test.com/vivaxy/test/url?name=vivaxy&year=2015#some',
            host = new _srcUrlJs2['default'](link).get('host');
        assert.equal(host, 'www.test.com');
    });
    it('should return current host, when host is not supplied', function () {
        var link = '/vivaxy/test/url?name=vivaxy&year=2015#some',
            host = new _srcUrlJs2['default'](link).get('host');
        assert.equal(host, location.host);
    });
});

describe('.get(\'hostname\')', function () {
    it('should return hostname', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            hostname = new _srcUrlJs2['default'](link).get('hostname');
        assert.equal(hostname, 'www.test.com');
    });
    it('should return hostname', function () {
        var link = 'https://www.test.com/vivaxy/test/url?name=vivaxy&year=2015#some',
            hostname = new _srcUrlJs2['default'](link).get('hostname');
        assert.equal(hostname, 'www.test.com');
    });
    it('should return current hostname, when hostname is not supplied', function () {
        var link = '/vivaxy/test/url?name=vivaxy&year=2015#some',
            hostname = new _srcUrlJs2['default'](link).get('hostname');
        assert.equal(hostname, location.hostname);
    });
});

describe('.get(\'port\')', function () {
    it('should return port', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            port = new _srcUrlJs2['default'](link).get('port');
        assert.equal(port, '8080');
    });
    it('should return port', function () {
        var link = 'https://www.test.com/vivaxy/test/url?name=vivaxy&year=2015#some',
            port = new _srcUrlJs2['default'](link).get('port');
        assert.equal(port, '');
    });
    it('should return current port, when port is not supplied', function () {
        var link = '/vivaxy/test/url?name=vivaxy&year=2015#some',
            port = new _srcUrlJs2['default'](link).get('port');
        assert.equal(port, location.port);
    });
});

describe('.get(\'path\')', function () {
    it('should return path', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            path = new _srcUrlJs2['default'](link).get('path');
        assert.equal(path, '/vivaxy/test/url?name=vivaxy&year=2015');
    });
    it('should return path', function () {
        var link = 'https://www.test.com/vivaxy/test/url#some',
            path = new _srcUrlJs2['default'](link).get('path');
        assert.equal(path, '/vivaxy/test/url');
    });
    it('should return current path, when path is not supplied', function () {
        var link = '?name=vivaxy&year=2015#some',
            path = new _srcUrlJs2['default'](link).get('path');
        assert.equal(path, location.pathname + '?name=vivaxy&year=2015');
    });
    it('should return current path, when path is not supplied', function () {
        var link = '#some',
            path = new _srcUrlJs2['default'](link).get('path');
        assert.equal(path, location.pathname + location.search);
    });
});

describe('.get(\'pathname\')', function () {
    it('should return pathname', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            pathname = new _srcUrlJs2['default'](link).get('pathname');
        assert.equal(pathname, '/vivaxy/test/url');
    });
    it('should return pathname', function () {
        var link = 'https://www.test.com/vivaxy/test/url#some',
            pathname = new _srcUrlJs2['default'](link).get('pathname');
        assert.equal(pathname, '/vivaxy/test/url');
    });
    it('should return current pathname, when pathname is not supplied', function () {
        var link = '?name=vivaxy&year=2015#some',
            pathname = new _srcUrlJs2['default'](link).get('pathname');
        assert.equal(pathname, location.pathname);
    });
    it('should return current pathname, when pathname is not supplied', function () {
        var link = '#some',
            pathname = new _srcUrlJs2['default'](link).get('pathname');
        assert.equal(pathname, location.pathname);
    });
});

describe('.get(\'search\')', function () {
    it('should return search', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            search = new _srcUrlJs2['default'](link).get('search');
        assert.equal(search, '?name=vivaxy&year=2015');
    });
    it('should return search', function () {
        var link = 'https://www.test.com/vivaxy/test/url#some',
            search = new _srcUrlJs2['default'](link).get('search');
        assert.equal(search, '');
    });
    it('should return current search, when search is not supplied', function () {
        var link = '#some',
            search = new _srcUrlJs2['default'](link).get('search');
        assert.equal(search, location.search);
    });
});

describe('.get(\'query\')', function () {
    it('should return query', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            query = new _srcUrlJs2['default'](link).get('query');
        assert.equal(query, 'name=vivaxy&year=2015');
    });
    it('should return query', function () {
        var link = 'https://www.test.com/vivaxy/test/url#some',
            query = new _srcUrlJs2['default'](link).get('query');
        assert.equal(query, '');
    });
    it('should return current query, when query is not supplied', function () {
        var link = '#some',
            query = new _srcUrlJs2['default'](link).get('query');
        assert.equal(query, location.search.slice(1));
    });
});

describe('.get(\'parameters\')', function () {
    it('should return parameters', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            parameters = new _srcUrlJs2['default'](link).get('parameters');
        assert.equal(parameters.name, 'vivaxy');
        assert.equal(parameters.year, '2015');
    });
    it('should return parameters', function () {
        var link = 'https://www.test.com/vivaxy/test/url#some',
            parameters = new _srcUrlJs2['default'](link).get('parameters'),
            parameterCount = 0;
        for (var i in parameters) {
            parameterCount++;
        }
        assert.equal(parameterCount, 0);
    });
});

describe('.get(\'hash\')', function () {
    it('should return hash', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            hash = new _srcUrlJs2['default'](link).get('hash');
        assert.equal(hash, '#some');
    });
    it('should return hash', function () {
        var link = 'https://www.test.com/vivaxy/test/url',
            hash = new _srcUrlJs2['default'](link).get('hash');
        assert.equal(hash, '');
    });
});

describe('.parameter()', function () {
    it('should return all parameters', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            parameters = new _srcUrlJs2['default'](link).parameter();
        assert.equal(parameters.name, 'vivaxy');
        assert.equal(parameters.year, '2015');
    });
    it('should return all parameters', function () {
        var link = 'https://www.test.com/vivaxy/test/url',
            parameters = new _srcUrlJs2['default'](link).parameter(),
            parameterCount = 0;
        for (var i in parameters) {
            parameterCount++;
        }
        assert.equal(parameterCount, 0);
    });
});

describe('.parameter(`key`)', function () {
    it('should return parameter', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            url = new _srcUrlJs2['default'](link),
            name = url.parameter('name'),
            year = url.parameter('year'),
            other = url.parameter('other');
        assert.equal(name, 'vivaxy');
        assert.equal(year, '2015');
        assert.equal(other, undefined);
    });
});

describe('.parameter(`key`, `value`)', function () {
    it('should set parameter and return `url`', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            url = new _srcUrlJs2['default'](link);
        url.parameter('year', 2016);
        url.parameter('other', 'test');
        var year = url.parameter('year'),
            other = url.parameter('other');
        assert.equal(year, '2016');
        assert.equal(other, 'test');
    });
});

describe('.parameter(`object`)', function () {
    it('should set parameter and return `url`', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            url = new _srcUrlJs2['default'](link);
        url.parameter('year', 2016);
        url.parameter('other', 'test');
        var year = url.parameter('year'),
            other = url.parameter('other');
        assert.equal(year, '2016');
        assert.equal(other, 'test');
    });
});

describe('.removeParameter(`key`)', function () {
    it('should remove parameter and return `url`', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            url = new _srcUrlJs2['default'](link);
        url.removeParameter('year');
        url.removeParameter('other');
        var year = url.parameter('year'),
            other = url.parameter('other');
        assert.equal(year, undefined);
        assert.equal(other, undefined);
    });
});

describe('.set(`key`, `value`)', function () {
    it('should set `url` and return `url`', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            url = new _srcUrlJs2['default'](link);
        try {
            url.set('year', '2015');
        } catch (e) {
            assert(e.message, 'Url: `year` cannot be set to url');
        }
    });
    it('should set `url` and return `url`', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            url = new _srcUrlJs2['default'](link);
        try {
            url.set('parameters', 'test');
        } catch (e) {
            assert(e.message, 'Url: use `parameter` instead');
        }
    });
    it('should set `url` and return `url`', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            url = new _srcUrlJs2['default'](link);
        url.set('query', 'test=1');
        assert(url.get('query'), 'test=1');
    });
    it('should set `url` and return `url`', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            url = new _srcUrlJs2['default'](link);
        url.set('search', '?test=1');
        assert(url.get('search'), '?test=1');
        try {
            url.set('search', 'test=1');
        } catch (e) {
            assert(e.message, 'Url: `search` must starts with `?`');
        }
    });
    it('should set `url` and return `url`', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            url = new _srcUrlJs2['default'](link);
        url.set('pathname', 'foo-bar');
        assert(url.get('pathname'), 'foo-bar');
    });
    it('should set `url` and return `url`', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            url = new _srcUrlJs2['default'](link);
        url.set('port', 'foo-bar');
        assert(url.get('port'), 'foo-bar');
    });
    it('should set `url` and return `url`', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            url = new _srcUrlJs2['default'](link);
        url.set('port', 3000);
        assert(url.get('port'), '3000');
    });
    it('should set `url` and return `url`', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            url = new _srcUrlJs2['default'](link);
        url.set('hostname', 'foo-bar.com');
        assert(url.get('hostname'), 'foo-bar.com');
    });
    it('should set `url` and return `url`', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            url = new _srcUrlJs2['default'](link);
        url.set('hash', '#foo-bar');
        assert(url.get('hash'), '#foo-bar');
        try {
            url.set('hash', 'other');
        } catch (e) {
            assert(e.message, 'Url: `hash` must starts with `#`');
        }
    });
});

},{"../src/url.js":1}]},{},[2]);
