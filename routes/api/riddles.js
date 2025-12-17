const express = require('express');
const router = express.Router();
const Riddle = require('../../models/riddle');

/*
GET /api/riddles
Get all riddles
*/
router.get('/', async (req, res) => {
  try {
    const { difficulty } = req.query;

    const filter = difficulty ? { difficulty } : {};
    const riddles = await Riddle.find(filter).select('-suggestedAnswers');

    res.json(riddles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch riddles' });
  }
});

/*
POST /api/riddles
Create a new riddle
*/
router.post('/', async (req, res) => {
  try {
    const { question, difficulty, suggestedAnswers } = req.body;

    if (!question || !difficulty) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newRiddle = new Riddle({
      question,
      difficulty,
      suggestedAnswers: suggestedAnswers || []
    });

    await newRiddle.save();
    res.status(201).json(newRiddle);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create riddle' });
  }
});

/*
POST /api/riddles/:id/respond 
Submit an anonymous response
*/
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

    riddle.responses.push({ answerText });
    await riddle.save();

    res.json({
      suggestedAnswers: riddle.suggestedAnswers
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit response' });
  }
});

module.exports = router;
