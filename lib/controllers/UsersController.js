var Joi = require('joi');
var User = require('./../models/user').User;
var applicationHelper = require('./../helpers/application_helper');

module.exports.create = {
    description: 'Creates a new user',
    handler: function(request, reply){
        var user = {
            email: request.payload.email,
            password: request.payload.password,
            password_confirmation: request.payload.password_confirmation,
            name: request.payload.name
        };

        var userValidations = Joi.object().keys({
            email: Joi.string().email(),
            password: Joi.string().alphanum().min(3).max(30).required(),
            password_confirmation: Joi.alternatives().when('password', {is: user.password,
                                                                        then: Joi.valid(user.password),
                                                                        otherwise: Joi.valid(user.password)}).
                                        label('Password Confirmation'),
            name: Joi.string().required()
        }).with('email', 'password', 'password_confirmation', 'name');

        var signupValidationConfirmation = function(err, value){
            if(err) {
                errorMessages = applicationHelper.populateErrors(err);
                reply.view('welcome/signup', {errorMessages: errorMessages,
                                              title: 'Signup'})
                return;
            }else {
                User.buildAndSave(value.name, value.email, value.password, function(err, user){
                        if (err) {
                            var errorMessages = applicationHelper.populateErrors(err);
                            reply.view('welcome/signup', {errorMessages: errorMessages,
                                                          title: 'Signup'})
                        }
                        else {
                            request.auth.session.set(user)
                            reply.redirect('/welcome')
                        }

                    });
            }
        };


        Joi.validate(user, userValidations, signupValidationConfirmation);
    }
}