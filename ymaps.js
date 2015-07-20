var args = require('system').args;
var page = require('webpage').create();

if (args.length < 3) {
    console.log('USAGE: phantomjs ymaps.js "ADDRESS 1" "ADDRESS 2"');
    phantom.exit();
}

var source = args[1];
var destination = args[2];

page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36';

page.onConsoleMessage = function(msg) {
    console.log(msg);
    phantom.exit();
};

page.includeJs("https://api-maps.yandex.ru/2.1/?lang=ru-RU", function() {
        e = page.evaluate(function(source, destination) {
            ymaps.ready(function(){
                ymaps.route([source, destination]).then(
                    function (route) {
                        console.log(route.getJamsTime());
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            });
        }, source, destination);
});
