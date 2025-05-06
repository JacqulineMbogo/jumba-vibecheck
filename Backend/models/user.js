const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

// Create a schema for the user
const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    email: { type: String, required: true, unique: true },
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date, default: Date.now }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);