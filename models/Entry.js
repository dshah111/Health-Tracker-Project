const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  date: { type: Date, required: true, index: true },
  sleep: Number,       // hours
  calories: Number,    // kcal
  steps: Number,       // number of steps
  mood: { type: String, enum: ['happy','neutral','sad','angry'] },
}, { timestamps: true });

module.exports = mongoose.model('Entry', entrySchema);
