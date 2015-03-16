/**
 * @since 150316 11:42
 * @author vivaxy
 */
var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some';

var url = new Url(link);

console.log('url', url);

url.queryString('year', 2014);

console.log(url.href);

url.queryString('month', 6);

console.log(url.href);
