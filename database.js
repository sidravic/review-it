var internals = {
    defaults: {
        host: '127.0.0.1',
        port: 27017
    }
}


var mongoose = require('mongoose');
mongoose.connect('mongodb://' + internals.defaults.host +
                ':' + internals.defaults.port  + '/review_development');

var _db = mongoose.connection



_db.on('error', function(err, db){
    throw err;
});

_db.once('open', function(err, db){
    console.log('Connected to mongo successfully');
});

exports.db = _db;
exports.Mongoose = mongoose;



