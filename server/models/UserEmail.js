var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        username: {type: String, required: true, max: 100},
        password: {type: String, required: true, max: 100},
        todo: [{type: String}],
    }
);

//Export model
module.exports = mongoose.model('user2', UserSchema);