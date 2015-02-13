var WelcomeController = require('./controllers/WelcomeController');
var UsersController = require('./controllers/UsersController');
var SessionsController = require('./controllers/SessionsController')

var internals = {
    staticRoute: {
        handler: {
            directory: {
                path: process.cwd() + './../../public'
            }
        }
    }
};


module.exports = [
    { path: '/', method: 'GET', config: WelcomeController.index },
    { path: '/signup', method: 'POST', config: UsersController.create},
    { path: '/static/{file*}', method: 'GET', config:internals.staticRoute},
    { path: '/welcome', method: 'GET', config: WelcomeController.show},
    { path: '/login', method: 'GET', config: SessionsController.index},
    { path: '/login', method: 'POST', config: SessionsController.create}
]


