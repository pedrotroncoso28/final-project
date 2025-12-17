const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  answerText: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const RiddleSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  suggestedAnswers: {
    type: [String],
    default: []
  },
  responses: [ResponseSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Riddle', RiddleSchema);
