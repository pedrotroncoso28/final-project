const express = require('express');
const router = express.Router();
const Answer = require('../../models/answer');

/*
 POST /api/answers
 Submit a new answer to a riddle
 */
router.post('/', async (req, res) => {
  try {
    const { riddleId, text } = req.body;

    if (!riddleId || !text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newAnswer = new Answer({
      riddleId,
      text
    });

    await newAnswer.save();
    res.status(201).json(newAnswer);
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit answer' });
  }
});

/**
 GET /api/answers/:riddleId
 Get all answers for a specific riddle
 */
router.get('/:riddleId', async (req, res) => {
  try {
    const answers = await Answer.find({
      riddleId: req.params.riddleId
    }).sort({ createdAt: -1 });

    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch answers' });
  }
});

module.exports = router;
