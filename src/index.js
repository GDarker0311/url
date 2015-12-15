/**
 * @since 15-09-02 15:22
 * @author vivaxy
 */
'use strict';

/**
 * usage: [URL](https://developer.mozilla.org/en-US/docs/Web/API/Window/URL)
 * 
 * reference:
 * 
 * - [mozilla URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)
 * - [mozilla URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
 * - [mozilla Window URL](https://developer.mozilla.org/en-US/docs/Web/API/Window/URL)
 * - [webshim url](https://afarkas.github.io/webshim/demos/#url)
 * - [inexorabletash url](https://github.com/inexorabletash/polyfill/blob/master/url.js)
 * - [WebReflection url-search-params](https://github.com/WebReflection/url-search-params/blob/master/src/url-search-params.js)
 * - [arv url](https://gist.github.com/arv/1384398)
 * - [Polymer url](https://github.com/Polymer/URL/blob/master/url.js)
 * 
 * // parse some link
 * var url = new URL(link, base);
 *
 * // parse current location link
 * var url = new URL();
 *
 * methods:
 *
 * // to string, returns url.href
 * url.toString();
 *
 * // Is a DOMString containing the whole URL.
 * // href: fill link, like `https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2014&month=6#some`
 * url.href
 *
 * // Is a DOMString containing the protocol scheme of the URL, including the final ':'.
 * // protocol: like `https:`
 * url.protocol
 *
 * // Is a DOMString containing the host, that is the hostname, a ':', and the port of the URL.
 * // host: hostname + ':' + port, like `www.test.com:8080`
 * url.host
 *
 * // Is a DOMString containing the domain of the URL.
 * // hostname: like `www.test.com`
 * url.hostname
 *
 * // Is a DOMString containing the port number of the URL.
 * // port: like `8080`
 * url.port
 *
 * // Is a DOMString containing an initial '/' followed by the path of the URL.
 * // pathname: full path from some host, like `/vivaxy/test/url`
 * url.pathname
 *
 * // Is a DOMString containing a '?' followed by the parameters of the URL.
 * // search: queryString, like `?name=vivaxy&year=2014&month=6`
 * url.search
 *
 * // Is a DOMString containing a '#' followed by the fragment identifier of the URL.
 * // hash: like `#some`
 * url.hash
 *
 * // Is a DOMString containing the username specified before the domain name.
 * // username: todo
 * url.username
 *
 * // Is a DOMString containing the password specified before the domain name.
 * // password: todo
 * url.password
 *
 * // readonly Returns a DOMString containing the origin of the URL, that is its scheme, its domain and its port.
 * // origin: like: `https://developer.mozilla.org:443`
 * url.origin
 *
 * // Returns a URLSearchParams object allowing to access the GET query arguments contained in the URL.
 * // searchParams: see [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
 * url.searchParams
 *
 * static methods:
 *
 * // Returns a DOMString containing a unique blob URL, that is a URL with blob: as its scheme, followed by an opaque string uniquely identifying the object in the browser.
 * URL.createObjectURL()
 *
 * // Revokes an object URL previously created using URL.createObjectURL().
 * URL.revokeObjectURL()
 */

/**
 *
 * @param link
 * @param base
 * @constructor
 */

class URL {
    constructor(link, base) {
        if (!link) {
            throw new Error('invalid arguments');
        }
        this._href = href || location.href;
        this._parameters = {};
        this._parse();
        this._parseQuery();
        this._formatQuery();
    }

    /**
     * parse url string to url object, and save to URL
     * @returns {URL}
     * @private
     */
    _parse() {

        let a = document.createElement('a');
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
     * @returns {URL}
     * @private
     */
    _parseQuery() {

        let qs = this._query.split('&'), l = qs.length;

        for (let i = 0; i < l; i++) {
            let split = qs[i].split('=');
            if (split.length === 2) {
                this._parameters[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
            }
        }

        return this;
    }

    /**
     * format parameters to query string, and update the url object
     * @returns {URL}
     * @private
     */
    _formatQuery() {
        let query = '', obj = this._parameters;
        for (let i in obj) {
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
    parameter(key, value) {
        switch (typeof key) {
            case 'undefined':
                // get all parameter
                return this._parameters;
                break;
            case 'string':
                if (value === undefined) { // get parameter by key
                    return this._parameters[key];
                } else { // set parameter by key
                    this._parameters[key] = value;
                    this._formatQuery();
                    return this;
                }
            case 'object':
                // set object to parameter
                for (let _key in key) {
                    if (key.hasOwnProperty(_key)) {
                        this._parameters[_key] = key[_key];
                    }
                }
                this._formatQuery();
                return this;
            default:
                throw new Error('URL: type of first argument is not `undefined`, `string` or `object`');
                return this;
        }
    }

    /**
     * remove parameter in query string
     * @param key
     * @returns {URL}
     */
    removeParameter(key) {
        delete this._parameters[key];
        this._formatQuery();
        return this;
    }

    /**
     * to string
     * @returns {*|string}
     */
    toString() {
        return this._href;
    }

    /**
     * get property
     * @param prop
     * @returns {*}
     */
    get(prop) {
        return this['_' + prop];
    }

    /**
     * set property
     * @param prop
     * @param value
     * @returns {URL}
     */
    set(prop, value) {

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
                throw new Error('URL: use `parameter` instead');
                break;
            case 'query':
                this._path = this._pathname + (value === '' ? '' : '?' + this._query);
                break;
            case 'search':
                if (value === '' || value.indexOf('?') === 0) {
                    this._path = this._pathname + value;
                } else {
                    throw new Error('URL: `search` must starts with `?`');
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
                    throw new Error('URL: `hash` must starts with `#`');
                }
                break;
            default:
                throw new Error('URL: `' + prop + '` cannot be set to url');
                break;
        }

        this._href = this._protocol + '//' + this._host + this._path + this._hash;
        this._parameters = {};
        this._parse();
        this._parseQuery();
        this._formatQuery();
        return this;
    }
}

export default URL;
