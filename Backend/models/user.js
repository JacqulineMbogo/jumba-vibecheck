const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema for the user
const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date, default: Date.now }
});