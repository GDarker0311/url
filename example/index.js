/**
 * @since 150316 11:42
 * @author vivaxy
 */
var log = function (text) {
    console.log(text);
    document.write(text + '<br><br>');
};
var link = 'https://www.test.com:8080/vivaxy/test/url?name=vivaxy&year=2015#some';

var url = new Url(link);

log('url.href: \n' + url.href);

url.queryString('year', 2014);

log('url.href: \n' + url.href);

url.queryString('month', 6);

log('url.href: \n' + url.href);
