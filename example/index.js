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
log('' + url);

log(url.get('protocol'));

url.parameter('year', 2014);
log('url.parameter(\'year\', 2014);');
log('' + url);

url.parameter('month', 6);
log('url.parameter(\'month\', 6);');
log('' + url);

url.removeParameter('month');
log('url.removeParameter(\'month\');');
log('' + url);

url.parameter('code', '中文符号测试&=');
log('url.parameter(\'code\', \'中文符号测试&=\');');
log('' + url);

log('url.parameter(\'code\') === \'' + url.parameter('code') + '\'');

url.set('search', '?date=20150315');
log('' + url);

url.set('hash', '');
log('' + url);

