const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type:String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type:String,
        required: [true, 'Please provide your email'],
        unique: true
    },
    password: {
        type:String,
        required: [true, 'Please provide a password'],
        minlength: 8
    },
})
const userModel = model('User', userSchema);
module.exports = userModel;