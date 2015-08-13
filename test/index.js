/**
 * @since 15-08-13 11:38
 * @author vivaxy
 */
var assert = chai.assert;

describe('new Url()', function () {
    it('should return link', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            urlLink = new Url(link);
        assert.equal(urlLink, link);
    });
    it('should return full link, when link is not complete', function () {
        var link = '/vivaxy/test/url?name=vivaxy&year=2015#some',
            urlLink = new Url(link).toString();
        assert.equal(urlLink, location.origin + link);
    });
    it('should return full link, when link is not complete', function () {
        var link = '?name=vivaxy&year=2015#some',
            urlLink = new Url(link).toString();
        assert.equal(urlLink, location.origin + location.pathname + link);
    });
    it('should return full link, when link is not complete', function () {
        var link = '#some',
            urlLink = new Url(link).toString();
        assert.equal(urlLink, location.origin + location.pathname + link);
    });
});

describe('.get(\'href\')', function () {
    it('should return href', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            href = new Url(link).get('href');
        assert.equal(href, link);
    });
    it('should return full href, when link is not complete', function () {
        var link = '/vivaxy/test/url?name=vivaxy&year=2015#some',
            urlLink = new Url(link).toString();
        assert.equal(urlLink, location.origin + link);
    });
    it('should return full href, when link is not complete', function () {
        var link = '?name=vivaxy&year=2015#some',
            urlLink = new Url(link).toString();
        assert.equal(urlLink, location.origin + location.pathname + link);
    });
    it('should return full href, when link is not complete', function () {
        var link = '#some',
            urlLink = new Url(link).toString();
        assert.equal(urlLink, location.origin + location.pathname + link);
    });
});

describe('.get(\'protocol\')', function () {
    it('should return protocol', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            protocol = new Url(link).get('protocol');
        assert.equal(protocol, 'https:');
    });
    it('should return protocol', function () {
        var link = 'http://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            protocol = new Url(link).get('protocol');
        assert.equal(protocol, 'http:');
    });
    it('should return current protocol, when protocol is not supplied', function () {
        var link = '//www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            protocol = new Url(link).get('protocol');
        assert.equal(protocol, location.protocol);
    });
    it('should return current protocol, when protocol is not supplied', function () {
        var link = '/vivaxy/test/url?name=vivaxy&year=2015#some',
            protocol = new Url(link).get('protocol');
        assert.equal(protocol, location.protocol);
    });
});

describe('.get(\'host\')', function () {
    it('should return host', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            host = new Url(link).get('host');
        assert.equal(host, 'www.test.com:8080');
    });
    it('should return host', function () {
        var link = 'https://www.test.com/vivaxy/test/url?name=vivaxy&year=2015#some',
            host = new Url(link).get('host');
        assert.equal(host, 'www.test.com');
    });
    it('should return current host, when host is not supplied', function () {
        var link = '/vivaxy/test/url?name=vivaxy&year=2015#some',
            host = new Url(link).get('host');
        assert.equal(host, location.host);
    });
});

describe('.get(\'hostname\')', function () {
    it('should return hostname', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            hostname = new Url(link).get('hostname');
        assert.equal(hostname, 'www.test.com');
    });
    it('should return hostname', function () {
        var link = 'https://www.test.com/vivaxy/test/url?name=vivaxy&year=2015#some',
            hostname = new Url(link).get('hostname');
        assert.equal(hostname, 'www.test.com');
    });
    it('should return current hostname, when hostname is not supplied', function () {
        var link = '/vivaxy/test/url?name=vivaxy&year=2015#some',
            hostname = new Url(link).get('hostname');
        assert.equal(hostname, location.hostname);
    });
});

describe('.get(\'port\')', function () {
    it('should return port', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            port = new Url(link).get('port');
        assert.equal(port, '8080');
    });
    it('should return port', function () {
        var link = 'https://www.test.com/vivaxy/test/url?name=vivaxy&year=2015#some',
            port = new Url(link).get('port');
        assert.equal(port, '');
    });
    it('should return current port, when port is not supplied', function () {
        var link = '/vivaxy/test/url?name=vivaxy&year=2015#some',
            port = new Url(link).get('port');
        assert.equal(port, location.port);
    });
});

describe('.get(\'path\')', function () {
    it('should return path', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            path = new Url(link).get('path');
        assert.equal(path, '/vivaxy/test/url?name=vivaxy&year=2015');
    });
    it('should return path', function () {
        var link = 'https://www.test.com/vivaxy/test/url#some',
            path = new Url(link).get('path');
        assert.equal(path, '/vivaxy/test/url');
    });
    it('should return current path, when path is not supplied', function () {
        var link = '?name=vivaxy&year=2015#some',
            path = new Url(link).get('path');
        assert.equal(path, location.pathname + '?name=vivaxy&year=2015');
    });
    it('should return current path, when path is not supplied', function () {
        var link = '#some',
            path = new Url(link).get('path');
        assert.equal(path, location.pathname + location.search);
    });
});

describe('.get(\'pathname\')', function () {
    it('should return pathname', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            pathname = new Url(link).get('pathname');
        assert.equal(pathname, '/vivaxy/test/url');
    });
    it('should return pathname', function () {
        var link = 'https://www.test.com/vivaxy/test/url#some',
            pathname = new Url(link).get('pathname');
        assert.equal(pathname, '/vivaxy/test/url');
    });
    it('should return current pathname, when pathname is not supplied', function () {
        var link = '?name=vivaxy&year=2015#some',
            pathname = new Url(link).get('pathname');
        assert.equal(pathname, location.pathname);
    });
    it('should return current pathname, when pathname is not supplied', function () {
        var link = '#some',
            pathname = new Url(link).get('pathname');
        assert.equal(pathname, location.pathname);
    });
});

describe('.get(\'search\')', function () {
    it('should return search', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            search = new Url(link).get('search');
        assert.equal(search, '?name=vivaxy&year=2015');
    });
    it('should return search', function () {
        var link = 'https://www.test.com/vivaxy/test/url#some',
            search = new Url(link).get('search');
        assert.equal(search, '');
    });
    it('should return current search, when search is not supplied', function () {
        var link = '#some',
            search = new Url(link).get('search');
        assert.equal(search, location.search);
    });
});

describe('.get(\'query\')', function () {
    it('should return query', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            query = new Url(link).get('query');
        assert.equal(query, 'name=vivaxy&year=2015');
    });
    it('should return query', function () {
        var link = 'https://www.test.com/vivaxy/test/url#some',
            query = new Url(link).get('query');
        assert.equal(query, '');
    });
    it('should return current query, when query is not supplied', function () {
        var link = '#some',
            query = new Url(link).get('query');
        assert.equal(query, location.search.slice(1));
    });
});

describe('.get(\'parameters\')', function () {
    it('should return parameters', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            parameters = new Url(link).get('parameters');
        assert.equal(parameters.name, 'vivaxy');
        assert.equal(parameters.year, '2015');
    });
    it('should return parameters', function () {
        var link = 'https://www.test.com/vivaxy/test/url#some',
            parameters = new Url(link).get('parameters'),
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
            hash = new Url(link).get('hash');
        assert.equal(hash, '#some');
    });
    it('should return hash', function () {
        var link = 'https://www.test.com/vivaxy/test/url',
            hash = new Url(link).get('hash');
        assert.equal(hash, '');
    });
});

describe('.parameter()', function () {
    it('should return all parameters', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            parameters = new Url(link).parameter();
        assert.equal(parameters.name, 'vivaxy');
        assert.equal(parameters.year, '2015');
    });
    it('should return all parameters', function () {
        var link = 'https://www.test.com/vivaxy/test/url',
            parameters = new Url(link).parameter(),
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
            url = new Url(link),
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
            url = new Url(link);
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
            url = new Url(link);
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
            url = new Url(link);
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
            url = new Url(link);
        try {
            url.set('year', '2015');
        } catch (e) {
            assert(e.message, 'Url: `year` cannot be set to url');
        }
    });
    it('should set `url` and return `url`', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            url = new Url(link);
        try {
            url.set('parameters', 'test');
        } catch (e) {
            assert(e.message, 'Url: use `parameter` instead');
        }
    });
    it('should set `url` and return `url`', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            url = new Url(link);
        url.set('query', 'test=1');
        assert(url.get('query'), 'test=1');
    });
    it('should set `url` and return `url`', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            url = new Url(link);
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
            url = new Url(link);
        url.set('pathname', 'foo-bar');
        assert(url.get('pathname'), 'foo-bar');
    });
    it('should set `url` and return `url`', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            url = new Url(link);
        url.set('port', 'foo-bar');
        assert(url.get('port'), 'foo-bar');
    });
    it('should set `url` and return `url`', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            url = new Url(link);
        url.set('port', 3000);
        assert(url.get('port'), '3000');
    });
    it('should set `url` and return `url`', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            url = new Url(link);
        url.set('hostname', 'foo-bar.com');
        assert(url.get('hostname'), 'foo-bar.com');
    });
    it('should set `url` and return `url`', function () {
        var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some',
            url = new Url(link);
        url.set('hash', '#foo-bar');
        assert(url.get('hash'), '#foo-bar');
        try {
            url.set('hash', 'other');
        } catch (e) {
            assert(e.message, 'Url: `hash` must starts with `#`');
        }
    });
});
