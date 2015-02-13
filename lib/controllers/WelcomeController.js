var sessionsHelper = require('./../helpers/sessions_helper');

module.exports.index = {
    description: 'Root url',
    handler: function(request, reply){
        var currentUser = sessionsHelper.currentUser(request);

        if (currentUser)
            reply.redirect('/welcome', {title: 'Welcome'});
        else
            reply.view('./welcome/signup', {title: 'Signup'})
    }
}


module.exports.show = {
    description: 'Root url for logged in users',
    handler: function(request, reply){
        debugger;
        reply({'Welcome': 'Logged in User'}).type('application/json')
    },
    auth: 'session'
}