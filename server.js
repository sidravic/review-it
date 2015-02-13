require('./index');
var Hapi = require('hapi');
var server = new Hapi.Server({debug: {log: ['request', 'error', 'debug'],
                                      request: ['error', 'received']
                                     }
                            });
var ReviewIt = require('./lib');
var Good = require('good');
var Path = require('path');
var Crumb = require('crumb');
var HapiAuthCookie = require('hapi-auth-cookie');
server.settings.cookieName = '_review_website';

console.log(HapiAuthCookie);

server.connection({
    host: 'localhost',
    port: 8000
})

server.register({
    register: HapiAuthCookie,
    options: {}
}, function(err){
    if (err)
        throw err;

    server.auth.strategy('session', 'cookie', {
        password: 'thisisthehousethatjackbuilt',
        cookie: server.settings.cookieName,
        redirectTo: '/login',
        isSecure: false
    });
});

server.register([{
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            args:[{log: '*', response: '*'}]
        }]
    }

}, {
    register: ReviewIt,
    options: {}

}, {
    register: Crumb,
    options: {
    }
}], function(err){
    if (err)
        throw err;
})


server.views({
    engines: {
        ejs: require('ejs')
    },
    path: Path.join(__dirname, './public/templates'),
    layoutPath: Path.join(__dirname, './public/templates/layouts'),
    layout: 'application'
})




server.start(function(err){
    console.log('Server started on port ' + server.info.port );
});
