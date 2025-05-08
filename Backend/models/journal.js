const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema for the journal
const journalSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [5, 'Title must be at least 5 characters'],
    maxlength: [60, 'Title must be at most 60 characters'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description must be at least 10 characters'],
    maxlength: [500, 'Description must be at most 500 characters'],
  },
  user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  create_date: { type: Date, default: Date.now },
  update_date: { type: Date, default: Date.now },
  status: { type: String, required: true },
});

module.exports = mongoose.model('Journal', journalSchema);
