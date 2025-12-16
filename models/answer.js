const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  riddleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Riddle',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Answer', answerSchema);
