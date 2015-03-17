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
log('url.href: ' + url.href);

url.parameter('year', 2014);
log('url.parameter(\'year\', 2014);');
log('url.href: ' + url.href);

url.parameter('month', 6);
log('url.parameter(\'month\', 6);');
log('url.href: ' + url.href);

url.removeParameter('month');
log('url.removeParameter(\'month\');');
log('url.href: ' + url.href);

url.parameter('code', '中文符号测试&=');
log('url.parameter(\'code\', \'中文符号测试&=\');');
log('url.href: ' + url.href);

log('url.parameter(\'code\') === \'' + url.parameter('code') + '\'');
