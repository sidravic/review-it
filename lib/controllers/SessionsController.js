var applicationHelper = require('./../helpers/application_helper');
var Joi = require('joi');
var User = require('./../models/user').User;
var sessionsHelper = require('./../helpers/sessions_helper');

module.exports.index = {
    description: 'Handles the login request',
    handler: function(request, reply) {
        var currentUser = sessionsHelper.currentUser(request);
        if (currentUser)
            reply.redirect('/welcome', {title: 'Welcome'});
        else
            reply.view('sessions/index', {title: 'Login'})
    }
}

module.exports.create = {
    description: 'Handles creation of session',
    handler: function(request, reply) {
        var loginCredentials = {
            email: request.payload.email,
            password: request.payload.password
        };


        var loginValidations = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().alphanum().required()
        });

        var onLoginCredentialsValidation = function(err, value) {
            if (err) {
                errorMessages = applicationHelper.populateErrors(err);
                reply.view('sessions/index', {
                    errorMessages: errorMessages,
                    title: 'Login'
                })
                return;
            }

            User.findByEmail(loginCredentials.email, function (err, user) {
                if (err) {
                    errorMessages = applicationHelper.populateErrors(err);
                    reply.view('sessions/index', {
                        errorMessages: errorMessages,
                        title: 'Login'
                    })
                } else {
                    request.log('debug', 'Session set for user ' + user.email);
                    request.auth.session.set(user);
                    reply.redirect('/welcome');
                }
            });
        }

        Joi.validate(loginCredentials, loginValidations, onLoginCredentialsValidation);

    }
}