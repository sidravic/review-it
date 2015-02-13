var db = require('./../../database').db;
var mongoose = require('./../../database').Mongoose;
var validator = require('validator');
var bcrypt = require('bcrypt');

// validators
var emailFormatValidator = function(email){
    return validator.isEmail(email);
}

// Schema and model definition
var userSchema = mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: String, required: true},
    email: {type: String, required: true,
            validate: emailFormatValidator,
            unique: true},
    active: {type: Boolean, required: true, default: false},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date}
});

// Indexes
userSchema.path('email').index({unique: true})


// callbacks

var User = mongoose.model('User', userSchema);

User.buildAndSave = function(name, email, password, callback) {
    var user = new User({name: name,
                         email: email});
    var salt =  bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    user.password = hash;
    user.salt = salt;
    user.active = false;

    user.save(function(err, doc){
        if (err)
            callback(err);
        else
            callback(null, doc);
    })
};

User.findByEmail = function(email, callback) {
    var query = User.where({email: email})

    query.findOne(function(err, doc){
        if(err) {
            server.log('error')
            callback(err, null);
        } else {
            callback(null, doc);
        }
    })
}



exports.User = User;