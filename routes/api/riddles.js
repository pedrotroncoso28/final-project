const express = require('express');
const router = express.Router();
const Riddle = require('../../models/riddle');

/**
GET /api/riddles
Get all riddles (optional filter by difficulty) */
router.get('/', async (req, res) => {
  try {
    const { difficulty } = req.query;

    const filter = difficulty ? { difficulty } : {};
    const riddles = await Riddle.find(filter).select('-correctAnswer');

    res.json(riddles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch riddles' });
  }
});

/**
 POST /api/riddles
 Create a new riddle
 */
router.post('/', async (req, res) => {
  try {
    const { question, difficulty, correctAnswer } = req.body;

    if (!question || !difficulty || !correctAnswer) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newRiddle = new Riddle({
      question,
      difficulty,
      correctAnswer
    });

    await newRiddle.save();
    res.status(201).json(newRiddle);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create riddle' });
  }
});

/**
 POST /api/riddles/:id/respond
 Submit an anonymous response */
router.post('/:id/respond', async (req, res) => {
  try {
    const { answerText } = req.body;

    if (!answerText) {
      return res.status(400).json({ error: 'Answer is required' });
    }

    const riddle = await Riddle.findById(req.params.id);

    if (!riddle) {
      return res.status(404).json({ error: 'Riddle not found' });
    }

    const isCorrect =
      answerText.trim().toLowerCase() ===
      riddle.correctAnswer.trim().toLowerCase();

    riddle.responses.push({ answerText, isCorrect });
    await riddle.save();

    res.json({
      isCorrect,
      correctAnswer: riddle.correctAnswer
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit response' });
  }
});

module.exports = router;
