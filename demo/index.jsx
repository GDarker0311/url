/**
 * @since 150316 11:42
 * @author vivaxy
 */
import Url from '../src/url.js';

let log = function (key, value) {
    console.log(key, value.toString());
    document.write(key + '<br><br>' + value + '<hr>');
};
let link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some';

let url = new Url(link);
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

url.parameter({year: 2015});
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

log('ie /test/name', new Url(link));
