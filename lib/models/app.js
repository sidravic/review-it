var db = require('./../../database').db;
var mongoose = require('./../../database').Mongoose;

var applicationSchema = mongoose.Schema({
    name: {type: String, required: true},
    appId: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now}
});

var Application = mongoose.model('Application', applicationSchema);

exports.Application = Application;