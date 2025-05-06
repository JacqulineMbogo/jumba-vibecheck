const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema for the journal
const journalSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date, default: Date.now },
    status: { type: String, required: true }
});

module.exports = mongoose.model('Journal', journalSchema);