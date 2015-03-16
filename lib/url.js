/**
 * @since 150316 11:09
 * @author vivaxy
 */

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
 * url.queryString(key);
 *
 * // set query string by name, and update url properties
 * url.queryString(key, value);
 *
 * properties:
 *
 * // href: fill link, like `https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2014&month=6#some`
 * url.href
 *
 * // protocol: like `https:`
 * url.protocol
 *
 * // host: hostname + ':' + port, like `www.test.com:8080`
 * url.host
 *
 * // hostname: like `www.test.com`
 * url.hostname
 *
 * // port: like `8080`
 * url.port
 *
 * // pathname: full path from some host, like `/vivaxy/test/url`
 * url.pathname
 *
 * // search: queryString, like `?name=vivaxy&year=2014&month=6`
 * url.search
 *
 * // path: pathname + search, like `/vivaxy/test/url?name=vivaxy&year=2014&month=6`
 * url.path
 *
 * // query: search without `?`, like `name=vivaxy&year=2014&month=6`
 * url.query
 *
 * // hash: like `#some`
 * url.hash
 *
 */
(function (global) {

    /**
     *
     * @param href
     * @constructor
     */
    var Url = function (href) {

        this.href = href || location.href;
        this._queryObject = {};
        this._parse();
        this._parseQuery();
        this._formatQuery();

    }, p = Url.prototype;

    /**
     * parse url string to url object, and save to Url
     * @private
     */
    p._parse = function () {

        var a = document.createElement('a');
        a.href = this.href;

        this.protocol = a.protocol;
        this.host = a.host;
        this.hostname = a.hostname;
        this.port = a.port;
        this.pathname = a.pathname;
        this.search = a.search;
        this.path = this.pathname + this.search;
        this.query = this.search.slice(1);
        this.hash = a.hash;

    };

    /**
     * parse query string to query object, and save to _queryObject
     * @private
     */
    p._parseQuery = function () {

        var qs = this.query.split('&');
        qs = qs.filter(function (item) {
            return item !== '' && item.indexOf('=') > -1;
        });

        var l = qs.length;
        for (var i = 0; i < l; i++) {
            var split = qs[i].split('=');
            this._queryObject[split[0]] = split[1];
        }

    };

    /**
     * format query object to query string, and update the url object
     * @private
     */
    p._formatQuery = function () {
        var query = '', obj = this._queryObject;
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                query += i + '=' + obj[i] + '&';
            }
        }
        query = query.slice(0, -1);
        this.query = query;
        if (query !== '') {
            this.search = '?' + query;
        }
        this.path = this.pathname + this.search;
        this.href = this.protocol + '//' + this.host + this.path + this.hash;
    };

    /**
     * get or set some query object
     * @param key
     * @param value
     * @returns {*}
     */
    p.queryString = function (key, value) {
        if (value === undefined) {
            // get
            return this._queryObject[key];
        } else {
            // set
            this._queryObject[key] = value;
            this._formatQuery();
        }
    };

    global.Url = global.Url || Url;

})(window);
