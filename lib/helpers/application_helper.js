var _ = require('lodash')

module.exports = {
    populateErrors: function(err){
        var errorMessages = [];

        if((err) && (err.details)){
            _.forEach(err.details, function(error) {
                if(error.path == 'password_confirmation') {
                    errorMessages.push('Password Confirmation does not match the password.');
                } else {
                    errorMessages.push(error.message);
                }
            });
        };

        if(err.err.indexOf('dup key') && (err.err.indexOf('$email'))){
            errorMessages.push('Email id is already in use');
        }

        return errorMessages;
    }
}