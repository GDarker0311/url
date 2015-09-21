(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @since 150316 11:42
 * @author vivaxy
 */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcUrlJs = require('../src/url.js');

var _srcUrlJs2 = _interopRequireDefault(_srcUrlJs);

var log = function log(key, value) {
    console.log(key, value.toString());
    document.write(key + '<br><br>' + value + '<hr>');
};
var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some';

var url = new _srcUrlJs2['default'](link);
log('url', url);

log('href', url.get('href'));
log('protocol', url.get('protocol'));
log('host', url.get('host'));
log('hostname', url.get('hostname'));
log('port', url.get('port'));
log('path', url.get('path'));
log('pathname', url.get('pathname'));
log('search', url.get('search'));
log('query', url.get('query'));
log('parameters', JSON.stringify(url.get('parameters')));
log('hash', url.get('hash'));

url.parameter('year', 2014);
log('> url.parameter(\'year\', 2014);', url);

url.parameter();
log('> url.parameter();', url.parameter());

url.parameter({ year: 2015 });
log('> url.parameter({year: 2015});', url);

url.parameter('month', 6);
log('> url.parameter(\'month\', 6);', url);

url.removeParameter('month');
log('> url.removeParameter(\'month\');', url);

url.parameter('code', '中文&=');
log('> url.parameter(\'code\', \'中文&=\');', url);

log('> url.parameter(\'code\');', url.parameter('code'));

url.set('search', '?date=20150315');
log('> url.set(\'search\', \'?date=20150315\');', url);

url.set('hash', '');
log('> url.set(\'hash\', \'\');', url);

try {
    url.set('hash', 'test');
} catch (e) {
    console.log(e);
    log('> url.set(\'hash\', \'test\');', url);
}

try {
    url.set('search', 'a=1&b=2');
} catch (e) {
    console.log(e);
    log('> url.set(\'search\', \'a=1&b=2\');', url);
}

url.set('hash', '#/list?date=20140101');
log('> url.set(\'hash\', \'#/list?date=20140101\');', url);

log('> url.parameter(\'date\');', url.parameter('date'));

url.set('port', '');
log('> url.set(\'port\', \'\');', url);

link = '/test/name';

log('ie /test/name', new _srcUrlJs2['default'](link));

},{"../src/url.js":2}],2:[function(require,module,exports){
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

},{}]},{},[1]);
